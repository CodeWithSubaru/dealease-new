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
    // Display yung mga available na order na pwedeng iaccept ni rider
    public function availableOrdersToPickUp()
    {
        $yesterday = Carbon::yesterday();
        $now = Carbon::now();

        return OrderTransaction::with('buyer', 'buyer.user_details', 'order', 'order.product')
            ->whereBetween('created_at', [$yesterday, $now])
            ->where('order_trans_status', '=', '3')
            ->latest('order_number')
            ->get();
    }

    // call when rider accept an order
    public function acceptOrder(Request $request)
    {
        $rider = auth()->user()->user_id; //getting authenticated user id

        // inserting in Deliveries table
        $acceptOrder = Deliveries::create([
            'order_trans_id' => $request->order_trans_id,
            'rider_id' => $rider,
            'delivery_status' => '1',
        ]);

        if ($acceptOrder) {
            OrderTransaction::where('order_trans_id', $request->order_trans_id)->update([
                'order_trans_status' => '4',
            ]);

            return response()->json(['message' => 'Order Accepted Successfully'], 200);
        } else {
            return response()->json(['message' => 'Failed to Accept Order'], 400);
        }
    }

    // display the accepted order, it turns to pick up order status which 1
    public function itemToPickUp()
    {
        $rider = auth()->user()->user_id; //getting authenticated user id
        return Deliveries::with('orderToDeliver', 'orderToDeliver.buyer', 'orderToDeliver.buyer.user_details', 'orderToDeliver.order.product')
            ->where('rider_id', '=', $rider)
            ->where('delivery_status', '=', '1')
            ->whereDate('created_at', Carbon::now())->get();
    }

    //to deliver button can trigger this post method.
    public function toDeliver(string $id)
    {
        // update status of delivery table
        $changeStatus = Deliveries::where('deliveries_id', $id)->update([
            'delivery_status' => '2',
        ]);

        if ($changeStatus) {
            // will update status of order transaction table at the same time.
            $product = Deliveries::find($id);
            OrderTransaction::where('order_trans_id', $product->order_trans_id)->update([
                'order_trans_status' => '5',
            ]);
        }
    }

    public function delivered(string $id) {
        $changeStatus = Deliveries::where('deliveries_id', $id)->update([
            'delivery_status' => '3',
        ]);

        if ($changeStatus) {
            // will update status of order transaction table at the same time.
            $product = Deliveries::find($id);
            OrderTransaction::where('order_trans_id', $product->order_trans_id)->update([
                'order_trans_status' => '6',
            ]);
        }
    }


}
