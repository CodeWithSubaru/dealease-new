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

        return OrderTransaction::where('order_trans_status', '=', '3')->whereDate('created_at', Carbon::now())->get();
    }

    // call when rider accept an order
    public function acceptOrder(Request $request)
    {
        $rider = Auth::id(); //getting authenticated user id

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
        $rider = Auth::id(); //getting authenticated user id
        return Deliveries::where('rider_id', '=', $rider)->where('delivery_status', '=', '1')->whereDate('created_at', Carbon::now())->get();
    }

    //to deliver button can trigger this post method.
    public function toDeliver(string $id)
    {
        // update status of delivery table
        $changeStatus = Deliveries::where('id', $id)->update([
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
}
