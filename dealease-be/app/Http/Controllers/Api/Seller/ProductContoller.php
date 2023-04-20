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
    public function getProductsForPublic()
    {
        $product = Product::all();
        return $product;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $id = Auth::id(); //getting authenticated user id
        $product = Product::where('user_id', $id)->get();
        return $product;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $id = Auth::id(); //getting authenticated user id

        $request->validate([
            'description' => 'required', 'string', 'max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imageName = time() . '.' . $request->image->extension();

        $request->image->move(public_path('images'), $imageName);

        $post = Product::create([
            'description' => $request->description,
            'image' => $imageName,
            'user_id' => $id, //for test only
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
        //
    }
}
