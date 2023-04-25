<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Order::with('product')->where('order_by', auth()->id())->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // generates order number
        $lastOrderItem = Order::all()->last();


        $product = Product::find($request->id);

        // find and validate of product already exists
        $order = Order::where('order_by', auth()->id())->where('product_id', $request->id)->first();

        if ($order) {
            return response()->json(['status' => 'Item already added to cart'], 422);
        }

        $generatedIdSample = $lastOrderItem ? $lastOrderItem->order_number + 1 : 1;
        Order::create([
            'order_number' => $generatedIdSample,
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::find($id);
        $order->delete();
    }
}
