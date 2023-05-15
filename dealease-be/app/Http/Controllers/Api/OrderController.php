<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use App\Models\OrderTransaction;
use App\Http\Controllers\Controller;
use App\Models\Deliveries;
use App\Models\DeliveryAddress;
use App\Models\DeliveryStatus;
use App\Models\UsersWallet;

use function PHPSTORM_META\type;

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
        $orderStatus = explode(',', $order_status);
        return OrderTransaction::with('seller', 'seller.user_details')
            ->whereIn('order_trans_status', $orderStatus)
            ->where('buyer_id', auth()->user()->user_id)
            ->latest('order_number')
            ->get();
    }

    public function fetchOrdersSeller($order_status)
    {
        $orderStatus = explode(',', $order_status);
        return OrderTransaction::with('buyer', 'buyer.user_details', 'delivery', 'delivery.rider', 'delivery.rider.user_details')
            ->whereIn('order_trans_status', $orderStatus)
            ->where('seller_id', auth()->user()->user_id)
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
        return Cart::with('product', 'product.user', 'product.user.user_details')->where('order_by', auth()->user()->user_id)->get();
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
        $order = Cart::where('order_by', auth()->user()->user_id)->where('product_id', $request->id)->first();

        if ($order) {
            return response()->json(['status' => 'Item already added to cart'], 422);
        }

        Cart::create([
            'product_id' => $product->id,
            'order_by' => auth()->user()->user_id,
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
                'shippingFee.full_name' => 'required',
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

            $userDetails = UserDetail::where('user_details_id', auth()->user()->user_id)->get();
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
                'buyer_id' => auth()->user()->user_id,
                'delivery_address_id' => null,
            ]);

            // Deduction on customers wallet based on user's orders
            $userWallet = UsersWallet::where('user_id', auth()->user()->user_id);
            $customerShells =  $userWallet->first()->shell_coin_amount - ($rate + $totalPrice);

            $userWallet->update(['shell_coin_amount' => $customerShells]);

            // seller coins will be added after the deduction to customers wallet
            // $sellerWallet = UsersWallet::where('user_id', $sellerId);
            // $sellerShells = $sellerWallet->first()->shell_coin_amount + ($rate + $totalPrice);
            // $sellerWallet->update(['shell_coin_amount' => $sellerShells]);

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

        return Order::with('product', 'product.user', 'product.user.user_details', 'order_by', 'order_by.user_details', 'deliveryAddress')
            ->join('order_transactions', 'order_transactions.order_number', 'orders.order_number')
            ->leftJoin('delivery_addresses', 'delivery_addresses.delivery_address_id', 'order_transactions.delivery_address_id')
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
        $orderTransaction = Order::with('order_transaction')->where('order_number', $order);

        // add amount ordered to customers wallet
        $customerWallet = UsersWallet::where('user_id', auth()->user()->user_id);
        $refund = $customerWallet->first()->shell_coin_amount + $request->grandTotal;
        $customerWallet->update(['shell_coin_amount' => $refund]);

        // return stock number
        for ($i = 0; $i < count($orderTransaction->get()); $i++) {
            $orderQuery = $orderTransaction->get()[$i];

            $orderQuery->order_transaction[0]->update(['order_trans_status' => $request->status]);
            $productStocks = Product::find($orderQuery->product_id);
            $stocks = $productStocks->stocks_per_kg + $orderQuery->weight;
            $productStocks->update(['stocks_per_kg' => $stocks]);
            $totalPriceAndDeliveryFee = (float) $orderQuery->order_transaction[0]->total_amount + (float) $orderQuery->order_transaction[0]->delivery_fee;
            $sellerId = $orderQuery->order_transaction[0]->seller_id;
        }

        // Implement this when delivered line 285 - 287
        // deduct ordered amount of customer to sellers wallet
        // $sellerWallet = UsersWallet::where('user_id', $sellerId);
        // $deduction = $sellerWallet->first()->shell_coin_amount - $totalPriceAndDeliveryFee;
        // $sellerWallet->update(['shell_coin_amount' => $deduction]);

        return response()->json(['status' => 'Order Cancelled Successfully'], 200);
    }

    public function cancelOrderSeller(Request $request, $order)
    {
        // cancel order by customer / buyer
        $orderTransaction = Order::with('order_transaction')->where('order_number', $order);

        // return stock number
        for ($i = 0; $i < count($orderTransaction->get()); $i++) {
            $orderQuery = $orderTransaction->get()[$i];

            $orderQuery->order_transaction[0]->update(['order_trans_status' => $request->status]);
            $productStocks = Product::find($orderQuery->product_id);
            $stocks = $productStocks->stocks_per_kg + $orderQuery->weight;
            $productStocks->update(['stocks_per_kg' => $stocks]);

            // Get Records seller id total delivery fee and price
            $totalPriceAndDeliveryFee = (float) $orderQuery->order_transaction[0]->total_amount + (float) $orderQuery->order_transaction[0]->delivery_fee;
            $sellerId = $orderQuery->order_transaction[0]->seller_id;
            $buyerId = $orderQuery->order_transaction[0]->buyer_id;
        }

        // add amount ordered to customers wallet
        $customerWallet = UsersWallet::where('user_id', $buyerId);
        $refund = $customerWallet->first()->shell_coin_amount + $totalPriceAndDeliveryFee;
        $customerWallet->update(['shell_coin_amount' => $refund]);

        // Implement this when delivered line 285 - 287
        // deduct ordered amount of customer to sellers wallet
        // $sellerWallet = UsersWallet::where('user_id', $sellerId);
        // $deduction = $sellerWallet->first()->shell_coin_amount - $totalPriceAndDeliveryFee;
        // $sellerWallet->update(['shell_coin_amount' => $deduction]);

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

    // order received
    public function orderReceived(string $id)
    {

        // first buyer will update the status of order transaction into success.
        $orderUpdateStatus = OrderTransaction::where('order_trans_id', $id)->update([
            'order_trans_status' => '7',
        ]);

        if ($orderUpdateStatus) {
            // fetching the deliveries_id from deliveries table
            $deliveries = OrderTransaction::find($id);
            // buyer will update deliveries status into received
            $deliveriesChangeStatus = Deliveries::where('deliveries_id', $deliveries->deliveries_id)->update([
                'delivery_status' => '4',
            ]);

            // if the update is succeeded
            if ($deliveriesChangeStatus) {
                // fetch for delivery details
                $delivery = Deliveries::find($deliveriesChangeStatus->deliveries_id);
                $rider_id = $delivery->rider_id;

                // fetch for order details
                $order = OrderTransaction::find($id);
                $seller_id = $order->seller_id;

                // seller amount to add
                $seller_revenue = $order->total_amount;

                // rider fees to add
                $rider_fee = $order->delivery_fee;

                // fetching for rider's wallet
                $riderWallet = UsersWallet::find($rider_id);
                $riderCurrentWallet = $riderWallet->shell_coin_amount;

                // current wallet amount + delivery fee
                $updatedRiderWallet = $riderCurrentWallet + $rider_fee;
                $updateRiderWallet = UsersWallet::where('wallet_id', $rider_id)->update([
                    'shell_coin_amount' => $updatedRiderWallet,
                ]);

                // if succeeded in updating the wallet of rider will trigger this.
                if ($updateRiderWallet) {
                    // fetching for seller's wallet
                    $sellerWallet = UsersWallet::find($seller_id);
                    $sellerCurrentWallet = $sellerWallet->shell_coin_amount;
                    // current wallet amount + amount revenue
                    $updatedSellerWallet = $sellerCurrentWallet + ($seller_revenue * 0.04);
                    UsersWallet::where('wallet_id', $seller_id)->update([
                        'shell_coin_amount' => $updatedSellerWallet,
                    ]);
                }
            }
        }
    }
}
