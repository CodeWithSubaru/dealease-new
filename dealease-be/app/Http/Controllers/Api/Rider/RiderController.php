<?php

namespace App\Http\Controllers\Api\Rider;

use App\Http\Controllers\Controller;
use App\Models\Deliveries;
use App\Models\OrderTransaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RiderController extends Controller
{

    public function availableOrdersToDeliver() {

        return OrderTransaction::where('order_trans_status', '=', '3')->whereDate('created_at', Carbon::now())->get();
    }

    public function acceptOrder(Request $request) {
        $rider = Auth::id(); //getting authenticated user id

        $acceptOrder = Deliveries::create([
            'order_trans_id' => $request->order_trans_id,
            'rider_id' => $rider,
            'delivery_status' => '1',
        ]);

        if ($acceptOrder) {
            return response()->json(['message' => 'Order Accepted Successfully'], 200);
        } else {
            return response()->json(['message' => 'Failed to Accept Order'], 400);
        }
    }

}
