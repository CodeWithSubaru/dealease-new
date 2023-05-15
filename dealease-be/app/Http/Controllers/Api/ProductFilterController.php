<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProductFilterController extends Controller
{

    public function thisDay($id)
    {
        return Product::with('seller', 'seller.user_details')->whereDate('created_at', Carbon::now())->where('user_id', '!=', $id)->latest('created_at')->get();
    }

    public function availableProducts($id)
    {
        return Product::with('seller', 'seller.user_details')->where('user_id', '!=', $id)->where('stocks_per_kg', '>', '0')->latest('created_at')->get();
    }

    public function searchProduct($product)
    {
        $startWeek = Carbon::now()->startOfWeek();
        $endWeek   = Carbon::now()->endOfWeek();

        return Product::query()->with('seller', 'seller.user_details')
            ->where('title', 'like', '%' . $product . '%')
            ->orWhere('description', 'like', '%' . $product . '%')
            ->orWhere('price_per_kg', 'like', '%' . $product . '%')
            ->where('stocks_per_kg', '>', '0')
            ->whereBetween('created_at', [$startWeek, $endWeek])
            ->where('user_id', '!=', auth()->user()->user_id)
            ->latest('created_at')->get();
    }
}
