<?php

namespace App\Http\Controllers\Api\Admin;

use Illuminate\Http\Request;
use App\Models\PaymentTransaction;
use App\Http\Controllers\Controller;

class AdminPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($payment_status)
    {
        return PaymentTransaction::with('user')->where('payment_status', $payment_status)->latest('created_at')->get();
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
    // Accept withdraw Shell to Peso
    public function accept($id)
    {
        PaymentTransaction::find($id)->update(['payment_status' => 2]);
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
