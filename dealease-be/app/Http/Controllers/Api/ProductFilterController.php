<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Product;
use App\Http\Controllers\Controller;

class ProductFilterController extends Controller
{

    public function thisDay()
    {
        return Product::whereDate('created_at', Carbon::now())->get();
    }

    public function availableProducts()
    {
        return Product::where('stocks_per_kg', '>', '0')->get();
    }

    public function searchProduct($product)
    {
        $startWeek = Carbon::now()->startOfWeek();
        $endWeek   = Carbon::now()->endOfWeek();

        $query = Product::query()
            ->where('title', 'like', '%' . $product . '%')
            ->orWhere('description', 'like', '%' . $product . '%')
            ->orWhere('price_per_kg', 'like', '%' . $product . '%');

        return $query->where('stocks_per_kg', '>', '0')
            ->whereBetween('created_at', [$startWeek, $endWeek])->get();
    }
}
