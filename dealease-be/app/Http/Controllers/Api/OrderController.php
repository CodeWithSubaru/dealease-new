<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{

    public function fetchOrdersBuyer()
    {
        return Order::with('order_by', 'order_by.user_details')
            ->where('order_by', auth()->id())
            ->where('order_status', 1)
            ->latest('created_at')->get();
    }

    public function fetchOrdersSeller()
    {
        return Order::with('order_by', 'order_by.user_details')
            ->join('products', 'product_id', 'id')
            ->where('products.user_id', auth()->id())
            ->where('orders.order_by', '!=', auth()->id())
            ->where('orders.order_status', 1)
            ->latest('orders.created_at')->get();
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

        $generatedIdSample = $lastOrderItem ? $lastOrderItem->order_number + 1 : 1;

        Cart::create([
            // 'order_number' => $generatedIdSample,
            'product_id' => $product->id,
            'order_by' => auth()->id(),
            'weight' => 1,
            'total_price' => $product->price_per_kg,
            // calculation of total_price in orders_table $product->price_per_kg * ($product->stocks_per_kg ? $product->stocks_per_kg : 1)
        ]);

        return response()->json(['status' => 'Item added to cart'], 200);
    }

    public function placeOrder(Request $request)
    {
        for ($i = 0; $i < count($request->all()); $i++) {
            $order = Order::create([
                'order_number' => $i,
                'product_id' => $request->all()[$i]['product_id'],
                'order_by' => $request->all()[$i]['order_by'],
                'weight' => $request->all()[$i]['weight'],
                'total_price' => $request->all()[$i]['total_price'],
                'order_status' => 1,
            ]);

            Cart::where('order_by', $order->order_by)->delete();
        }

        return response()->json(['status' => 'Order placed Successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $order)
    {
        return Order::where('order_id', $order)->update(['order_status' => $request->status]);
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
