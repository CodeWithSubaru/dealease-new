<?php

namespace App\Http\Controllers\Api\Admin;

use Illuminate\Http\Request;
use App\Models\ShellTransaction;
use App\Http\Controllers\Controller;
use App\Models\UsersWallet;

class AdminPaymentController extends Controller
{

    public function numberOfUnderReviewTransaction()
    {
        return ShellTransaction::with('user')->where('payment_status', '1')->count();
    }

    public function numberOfApprovedTransaction()
    {
        return ShellTransaction::with('user')->where('payment_status', '2')->count();
    }

    public function numberOfCancelledTransaction()
    {
        return ShellTransaction::with('user')->where('payment_status', '0')->count();
    }
    /**
     * Display a listing of the resource.
     */
    public function index($payment_status)
    {
        return ShellTransaction::with('user', 'user.user_details')
            ->where('payment_status', $payment_status)
            ->latest('created_at')
            ->get();
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    // Confirm withdraw Shell to Peso
    public function confirmRecharge($id)
    {
        $shellTransaction = ShellTransaction::where('payment_number', $id);
        $shellTransaction->update(['payment_status' => 2]);
        $usersWallet = UsersWallet::find($shellTransaction->first()->user_id);
        $amount = $usersWallet->shell_coin_amount + $shellTransaction->first()->payment_total_amount;
        $usersWallet->update(['shell_coin_amount' =>  $amount]);

        return response()->json(['status' => 'Transaction successfully'], 200);
    }

    public function decline($id)
    {
        $shellTransaction = ShellTransaction::where('payment_number', $id);
        $shellTransaction->update(['payment_status' => 0]);
        $usersWallet = UsersWallet::find($shellTransaction->first()->user_id);
        $amount = $usersWallet->shell_coin_amount + $shellTransaction->first()->payment_total_amount;
        $usersWallet->update(['shell_coin_amount' =>  $amount]);

        return response()->json(['status' => 'Transaction successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
