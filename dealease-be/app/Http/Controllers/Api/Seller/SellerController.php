<?php

namespace App\Http\Controllers\Api\Seller;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Deliveries;
use App\Models\OrderTransaction;
use App\Models\UsersWallet;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class SellerController extends Controller
{
    // Display yung mga available na order na pwedeng iaccept ni rider
    // public function availableOrdersToPickUp()
    // {
    //     $yesterday = Carbon::yesterday();
    //     $now = Carbon::now();

    //     return OrderTransaction::with('buyer', 'buyer.user_details', 'order', 'order.product')
    //         ->whereBetween('created_at', [$yesterday, $now])
    //         ->where('order_trans_status', '=', '3')
    //         ->latest('order_number')
    //         ->get();
    // }

    // call when rider accept an order
    // public function acceptOrder(Request $request)
    // {
    //     $rider = auth()->user()->user_id; //getting authenticated user id

    //     // inserting in Deliveries table
    //     $acceptOrder = Deliveries::create([
    //         'order_trans_id' => $request->order_trans_id,
    //         'rider_id' => $rider,
    //         'delivery_status' => '1',
    //     ]);

    //     if ($acceptOrder) {
    //         OrderTransaction::where('order_trans_id', $request->order_trans_id)->update([
    //             'order_trans_status' => '4',
    //         ]);

    //         return response()->json(['message' => 'Order Accepted Successfully'], 200);
    //     } else {
    //         return response()->json(['message' => 'Failed to Accept Order'], 400);
    //     }
    // }

    // display the accepted order, it turns to pick up order status which 1
    // public function itemToPickUp()
    // {
    //     $rider = auth()->user()->user_id; //getting authenticated user id
    //     return Deliveries::with('orderToDeliver', 'orderToDeliver.buyer', 'orderToDeliver.buyer.user_details', 'orderToDeliver.order.product')
    //         ->where('rider_id', '=', $rider)
    //         ->where('delivery_status', '=', '1')
    //         ->whereDate('created_at', Carbon::now())->get();
    // }

    //to deliver button can trigger this post method.
    public function toDeliver(string $id)
    {
        // update status of delivery table
        // $changeStatus = Deliveries::where('deliveries_id', $id)->update([
        //     'delivery_status' => '1',
        // ]);

        $rider = auth()->user()->user_id; //getting authenticated user id

        //     // inserting in Deliveries table
        $acceptOrder = Deliveries::create([
            'order_trans_id' => $id,
            // 'rider_id' => $rider,
            'delivery_status' => '1',
        ]);

        if ($acceptOrder) {
            // will update status of order transaction table at the same time.
            // $product = Deliveries::where('order_trans_id', $id);
            OrderTransaction::where('order_trans_id', $id)->update([
                'order_trans_status' => '3',
            ]);
        }
    }

    public function onGoingOrders()
    {
        $rider = auth()->user()->user_id; //getting authenticated user id
        return Deliveries::with('orderToDeliver', 'orderToDeliver.buyer', 'orderToDeliver.buyer.user_details', 'orderToDeliver.order.product')
            ->whereIn('delivery_status', ['1', '2'])
            // ->where('rider_id', '=', $rider)
            ->whereDate('created_at', Carbon::now())->get();
    }

    public function delivered(string $id)
    {
        $changeStatus = Deliveries::where('order_trans_id', $id)->update([
            'delivery_status' => '2',
        ]);

        if ($changeStatus) {
            // will update status of order transaction table at the same time.
            $product = Deliveries::where('order_trans_id', $id)->first();
            OrderTransaction::where('order_trans_id', $product->order_trans_id)->update([
                'order_trans_status' => '4',
            ]);
        }
    }

    public function itemDelivered()
    {
        $rider = auth()->user()->user_id; //getting authenticated user id
        return Deliveries::with('orderToDeliver', 'orderToDeliver.buyer', 'orderToDeliver.buyer.user_details', 'orderToDeliver.order.product')
            // ->where('rider_id', '=', $rider)
            ->where('delivery_status', '=', '3')
            ->whereDate('created_at', Carbon::now())->latest('created_at')->get();
    }

    public function returnItem(string $id)
    {
        $changeStatus = Deliveries::where('order_trans_id', $id)->update([
            'delivery_status' => '4',
        ]);

        if ($changeStatus) {
            // will update status of order transaction table at the same time.
            $delivery = Deliveries::with('orderToDeliver')->find($id)->first();
            OrderTransaction::where('order_trans_id', $id)->update([
                'order_trans_status' => '6',
            ]);

            // Add the delivery fee to rider's wallet account 
            $totalShellAmount = 0;
            $riderWallet = UsersWallet::where('user_id', $delivery->rider_id);
            $totalShellAmount = $riderWallet->first()->shell_coin_amount + 0; // $delivery->orderToDeliver->delivery_fee

            $riderWallet->update([
                'shell_coin_amount' => $totalShellAmount,
            ]);

            // Add the total amount to buyers's wallet account 
            $totalBuyerShellAmount = 0;
            $buyerWallet = UsersWallet::where('user_id', $delivery->orderToDeliver->buyer_id);
            $totalBuyerShellAmount = $buyerWallet->first()->shell_coin_amount + $delivery->orderToDeliver->total_amount;

            $buyerWallet->update([
                'shell_coin_amount' => $totalBuyerShellAmount,
            ]);
        }
    }

    public function failedDelivery()
    {
        $rider = auth()->user()->user_id; //getting authenticated user id
        return Deliveries::with('orderToDeliver', 'orderToDeliver.buyer', 'orderToDeliver.buyer.user_details', 'orderToDeliver.order.product')
            ->where('rider_id', '=', $rider)
            ->where('delivery_status', '=', '5')
            ->whereDate('created_at', Carbon::now())->latest('created_at')->get();
    }

    public function successDelivery()
    {
        $rider = auth()->user()->user_id; //getting authenticated user id
        return Deliveries::with('orderToDeliver', 'orderToDeliver.buyer', 'orderToDeliver.buyer.user_details', 'orderToDeliver.order.product')
            ->where('rider_id', '=', $rider)
            ->where('delivery_status', '=', '4')
            ->whereDate('created_at', Carbon::now())->latest('created_at')->get();
    }
}
