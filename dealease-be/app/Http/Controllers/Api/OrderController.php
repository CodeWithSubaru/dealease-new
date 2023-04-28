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
        return Cart::with('product', 'product.user', 'user.user_detail')->where('order_by', auth()->id())->get();
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
            'weight' => $product->weight ? 0 : 1,
            'total_price' => $product->price * ($product->weight ? $request->weight : 1),
        ]);

        return response()->json(['status' => 'Item added to cart'], 200);
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
    public function update(Request $request, string $id)
    {
        //
    }

    public function increment($id)
    {

        $cart = Cart::with('product')->find($id);

        if ($cart->quantity >= $cart->product->stocks_per_kg) {
            return;
        }

        $cart->update([
            'quantity' => $cart->quantity + 1,
        ]);

        $cart->update([
            'total_price' => ($cart->product->price_per_kg  * $cart->quantity)
        ]);
    }

    public function decrement($id)
    {
        $cart = Cart::with('product')->find($id);
        if ($cart->quantity == 1) {
            return;
        }
        $cart->update([
            'quantity' => $cart->quantity - 1,
        ]);

        $cart->update([
            'total_price' => ($cart->product->price_per_kg  * $cart->quantity)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cart = Cart::find($id);
        $cart->quantity = 0;
        $cart->delete();
    }
}
