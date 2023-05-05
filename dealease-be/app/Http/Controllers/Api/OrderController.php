<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use App\Models\OrderTransaction;
use App\Http\Controllers\Controller;

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
        return OrderTransaction::with('user', 'user.user_details')
            ->join('orders', 'orders.order_number', 'order_transactions.order_number')
            ->join('products', 'products.id', 'orders.product_id')
            ->where('order_transactions.order_trans_status', $order_status)
            ->where('orders.order_by', auth()->id())
            ->get();
    }

    public function fetchOrdersSeller($order_status)
    {
        return OrderTransaction::with('user', 'user.user_details')
            ->join('orders', 'orders.order_number', 'order_transactions.order_number')
            ->join('products', 'products.id', 'orders.product_id')
            ->where('order_transactions.order_trans_status', $order_status)
            ->where('orders.order_by', '!=', auth()->id())
            ->where('products.user_id', auth()->id())
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
                Cart::where('product_id', $orderedItems[$i][$j]['product_id'])->where('order_by', $orderedItems[$i][$j]['order_by'])->delete();
                $sellerId = $orderedItems[$i][$j]['product']['user_id'];
            }

            $userDetails = UserDetail::find(auth()->id());
            if ($userDetails->barangay === 'Paliwas' || $userDetails->barangay === 'Salambao' || $userDetails->barangay === 'Binuangan') {
                $rate = 20;
            } elseif ($userDetails->barangay === 'Pag-asa' || $userDetails->barangay === 'San Pascual') {
                $rate = 25;
            } elseif ($userDetails->barangay === 'Catanghalan' || $userDetails->barangay === 'Hulo') {
                $rate = 30;
            } elseif ($userDetails->barangay === 'Panghulo' || $userDetails->barangay === 'Lawa') {
                $rate = 35;
            } elseif ($userDetails->barangay === 'Paco') {
                $rate = 40;
            } elseif ($userDetails->barangay === 'Tawiran') {
                $rate = 45;
            }

            OrderTransaction::create([
                'order_number' => $orderNumber,
                'total_amount' => $totalPrice,
                'order_trans_status' => 1,
                'delivery_fee' => 20 * $rate,
                'seller_id' => $sellerId,
                'buyer_id' => auth()->id(),
                'shipping_id' => 1,
                'delivery_address_id' => 0,
            ]);
        }

        return response()->json(['status' => 'Order placed Successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($order)
    {

        return Order::with('order_by', 'order_by.user_details', 'product')
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
