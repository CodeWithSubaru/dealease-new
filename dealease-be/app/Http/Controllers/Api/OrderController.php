<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use App\Models\OrderTransaction;
use App\Http\Controllers\Controller;
use App\Models\DeliveryAddress;
use App\Models\DeliveryStatus;
use App\Models\UsersWallet;

class OrderController extends Controller
{

    public function numberOfOrdersByStatusBuyer($order_status)
    {
        return $this->fetchOrdersBuyer($order_status)->count();
    }

    public function numberOfOrdersByStatusSeller($order_status)
    {
        return $this->fetchOrdersSeller($order_status)->count();
    }

    public function fetchOrdersBuyer($order_status)
    {
        return OrderTransaction::with('seller', 'seller.user_details')
            ->where('order_trans_status', $order_status)
            ->where('buyer_id', auth()->id())
            ->latest('order_number')
            ->get();
    }

    public function fetchOrdersSeller($order_status)
    {
        return OrderTransaction::with('buyer', 'buyer.user_details',)
            ->where('order_trans_status', $order_status)
            ->where('seller_id', auth()->id())
            ->latest('order_number')
            ->get();
    }

    public function fetchCountOfOrders()
    {
        $countAddedToCart = $this->index()->count();
        return $countAddedToCart;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Cart::with('product', 'product.user', 'product.user.user_details')->where('order_by', auth()->id())->get();
    }

    public function fetchCartGroupById()
    {
        $cart = $this->index();
        return $cart->groupBy('product.user_id');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // generates order number
        $lastOrderItem = Cart::all()->last();

        $product = Product::find($request->id);

        // find and validate of product already exists
        $order = Cart::where('order_by', auth()->id())->where('product_id', $request->id)->first();

        if ($order) {
            return response()->json(['status' => 'Item already added to cart'], 422);
        }

        Cart::create([
            'product_id' => $product->id,
            'order_by' => auth()->id(),
            'weight' => 1,
            'total_price' => $product->price_per_kg,
            // calculation of total_price in orders_table $product->price_per_kg * ($product->stocks_per_kg ? $product->stocks_per_kg : 1)
        ]);

        return response()->json(['status' => 'Item added to cart'], 200);
    }

    private function generateOrderNumber()
    {
        $orderNumber = Order::all()->last();

        if ($orderNumber) {
            $lastOrderNumber = $orderNumber->order_number;
            $getNumbers = str_replace("ORD", "", $lastOrderNumber);
            $idIncrease = $getNumbers + 1;
            $getString = str_pad($idIncrease, 7, 0, STR_PAD_LEFT);
            $newOrderNumber = "ORD" . $getString;
        } else {
            $newOrderNumber = 'ORD0000001';
        }

        return $newOrderNumber;
    }

    public function placeOrder(Request $request)
    {
        if ($request->shippingFee) {
            $request->validate([
                'shippingFee.barangay' => 'required',
                'shippingFee.street' => 'required',
                'shippingFee.contact_number' => ['required', 'min:11', 'max:11'],
            ]);
        }

        $orderedItems = array_values($request->cartHistoryBySellerId);
        for ($i = 0; $i < count($orderedItems); $i++) {
            $orderNumber = $this->generateOrderNumber();
            $totalPrice = 0;
            for ($j = 0; $j < count($orderedItems[$i]); $j++) {
                $tempOrderNumber = $orderNumber;
                Order::create([
                    'order_number' => $tempOrderNumber,
                    'product_id' => $orderedItems[$i][$j]['product_id'],
                    'order_by' => $orderedItems[$i][$j]['order_by'],
                    'weight' => $orderedItems[$i][$j]['weight'],
                    'total_price' => $orderedItems[$i][$j]['total_price'],
                ]);

                $totalPrice += (float) $orderedItems[$i][$j]['total_price'];

                // delete carts
                Cart::where('product_id', $orderedItems[$i][$j]['product_id'])->where('order_by', $orderedItems[$i][$j]['order_by'])->delete();
                $sellerId = $orderedItems[$i][$j]['product']['user_id'];

                // deduction of quantity in Product stocks
                $productStocks = Product::find($orderedItems[$i][$j]['product_id']);
                $stocks = $productStocks->stocks_per_kg - $orderedItems[$i][$j]['weight'];
                $productStocks->update(['stocks_per_kg' => $stocks]);
            }

            $userDetails = UserDetail::where('user_details_id', auth()->id())->get();
            $barangay = $request->shippingFee ? $request->shippingFee['barangay'] : $userDetails[0]->barangay;
            if ($barangay === 'Paliwas' || $barangay === 'Salambao' || $barangay === 'Binuangan') {
                $rate = 20;
            } elseif ($barangay === 'Pag-asa' || $barangay === 'San Pascual') {
                $rate = 25;
            } elseif ($barangay === 'Catanghalan' || $barangay === 'Hulo') {
                $rate = 30;
            } elseif ($barangay === 'Panghulo' || $barangay === 'Lawa') {
                $rate = 35;
            } elseif ($barangay === 'Paco') {
                $rate = 40;
            } elseif ($barangay === 'Tawiran') {
                $rate = 45;
            }

            // insert orders
            $orderTransaction = OrderTransaction::create([
                'order_number' => $orderNumber,
                'total_amount' => $totalPrice,
                'order_trans_status' => 1,
                'delivery_fee' => $rate,
                'seller_id' => $sellerId,
                'buyer_id' => auth()->id(),
                'delivery_address_id' => null,
            ]);

            // Deduction on customers wallet based on user's orders
            $userWallet = UsersWallet::where('user_id', auth()->id());
            $customerShells =  $userWallet->first()->shell_coin_amount - ($rate + $totalPrice);

            $userWallet->update(['shell_coin_amount' => $customerShells]);

            // seller coins will be added after the deduction to customers wallet
            $sellerWallet = UsersWallet::where('user_id', $sellerId);
            $sellerShells = $sellerWallet->first()->shell_coin_amount + ($rate + $totalPrice);
            $sellerWallet->update(['shell_coin_amount' => $sellerShells]);

            if ($request->shippingFee) {
                // option for other shipping address
                $deliveryAddress = DeliveryAddress::create([
                    'order_trans_id' => $orderTransaction->order_trans_id,
                    'rider_id' => null,
                    'delivery_status' => 1,
                    'city' => 'Obando',
                    'barangay' => $request->shippingFee['barangay'],
                    'street' => $request->shippingFee['street'],
                ]);

                $orderTransaction->update([
                    'delivery_address_id' => $deliveryAddress->delivery_address_id
                ]);
            }
        }

        return response()->json(['status' => 'Order placed Successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($order)
    {

        return Order::with('product', 'product.user', 'product.user.user_details', 'order_by', 'order_by.user_details')
            ->join('order_transactions', 'order_transactions.order_number', 'orders.order_number')
            ->where('orders.order_number', $order)
            ->where('order_transactions.order_trans_status', '!=', 0)
            ->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $order)
    {
        return OrderTransaction::where('order_number', $order)->update(['order_trans_status' => $request->status]);
    }

    public function cancelOrder(Request $request, $order)
    {
        // cancel order by customer / buyer
        OrderTransaction::where('order_number', $order)->update(['order_trans_status' => $request->status]);
        $usersWallet = UsersWallet::where('user_id', auth()->id());
        $refund = $usersWallet->first()->shell_coin_amount + $request->grandTotal;
        $usersWallet->update(['shell_coin_amount' => $refund]);

        // deduction of quantity in Product stocks
        $productStocks = Product::find($request->product_id);
        $stocks = $productStocks->stocks_per_kg + $request->product_id;
        $productStocks->update(['stocks_per_kg' => $stocks]);

        return response()->json(['status' => 'Order Cancelled Successfully'], 200);
    }

    public function cancelOrderSeller(Request $request, $order)
    {
        // cancel order by seller
        // ** deduction to seller wallet after received the refund by customer
        OrderTransaction::where('order_number', $order)->update(['order_trans_status' => $request->status]);
        $usersWallet = UsersWallet::where('user_id', $request->customerId);
        $refund = $usersWallet->first()->shell_coin_amount + $request->grandTotal;
        $usersWallet->update(['shell_coin_amount' => $refund]);

        return response()->json(['status' => 'Order Cancelled Successfully'], 200);
    }


    public function increment($id)
    {

        $cart = Cart::with('product')->find($id);

        if ($cart->weight >= $cart->product->stocks_per_kg) {
            return;
        }

        $cart->update([
            'weight' => $cart->weight + 1,
        ]);

        $cart->update([
            'total_price' => ($cart->product->price_per_kg  * $cart->weight)
        ]);
    }

    public function decrement($id)
    {
        $cart = Cart::with('product')->find($id);
        if ($cart->weight == 1) {
            return;
        }
        $cart->update([
            'weight' => $cart->weight - 1,
        ]);

        $cart->update([
            'total_price' => ($cart->product->price_per_kg  * $cart->weight)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cart = Cart::find($id);
        $cart->weight = 0;
        $cart->delete();
    }
}
