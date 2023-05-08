<?php

namespace App\Http\Controllers\Api\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\User;

class ProductContoller extends Controller
{
    // display publicly
    public function getProductsForPublic($id)
    {
        return Product::latest('created_at')
            ->get();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $id = Auth::id(); //getting authenticated user id
        $product = Product::where('user_id', $id)->get();
        return response()->json(['listOfProduct' => $product], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required', 'string', 'max:255',
            'description' => 'required', 'string', 'max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'stocks_per_kg' => 'required', 'numeric',
            'price_per_kg' => 'required', 'numeric'
        ]);

        $imageName = time() . '.' . $request->image->extension();

        $request->image->move(public_path('images'), $imageName);

        $post = Product::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imageName,
            'stocks_per_kg' => $request->stocks_per_kg,
            'price_per_kg' => $request->price_per_kg,
            'user_id' => Auth::id(), //for test only
        ]);

        if ($post) {
            return response()->json(['message' => 'Posted Successfully Upload'], 200);
        } else {
            return response()->json(['message' => 'Posting Failed'], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);
        return response()->json(['data' => $product], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required', 'string', 'max:255',
            'description' => 'required', 'string', 'max:255',
            'stocks_per_kg' => 'required', 'numeric',
            'price_per_kg' => 'required', 'numeric'
        ]);

        $imageName = Product::find($request->id)->image;

        if ($request->has('image') && $request->image !== $imageName) {
            // uploading image
            $imageName = time() . '.' . $request->image->extension();

            $request->image->move(public_path('images'), $imageName);
        }

        Product::where('id', $id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imageName,
            'stocks_per_kg' => $request->stocks_per_kg,
            'price_per_kg' => $request->price_per_kg,
        ]);

        return response()->json(['message' => 'Updated Successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id)->delete();
        return response()->json(['message' => 'Deleted Successfully'], 200);
    }
}
