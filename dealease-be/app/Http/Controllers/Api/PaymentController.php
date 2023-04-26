<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Paymongo\Paymongo;
use App\Models\BuyerWallet;
use App\Models\SellerWallet;
use Illuminate\Http\Request;
use App\Models\PaymentTransaction;
use App\Http\Controllers\Controller;


class PaymentController extends Controller
{
    public function withdraw(Request $request)
    {
        $typeOfWallet = !$request->wallet ?
            BuyerWallet::class :
            SellerWallet::class;

        $wallet = $typeOfWallet::where('user_id', auth()->id());

        $request->validate([
            'shell_coin_amount' => [
                'required', 'numeric', 'min:100', 'max:' . $wallet->get()[0]->shell_coin_amount . '',
            ],
        ]);

        // $shellCoinAmount = $wallet->get()[0]->shell_coin_amount - (int) $request->shell_coin_amount;

        // $wallet->update(['shell_coin_amount' => $shellCoinAmount]);

        PaymentTransaction::create([
            'user_id' => auth()->id(),
            'payment_status' => 1,
            'payment_description' => auth()->user()->first_name . " request to withdraw for " . $request->shell_coin_amount . ' Shells',
            'payment_total_amount' => $request->shell_coin_amount / 1.5,
        ]);

        return response()->json(['status' => 'Request Created Successfully'], 200);

        // Patrick
        // $authUser = User::with('user_details')->where('user_id', auth()->id())->get()[0];
        // return $this->payment($authUser->first_name, $authUser->email, $request->shell_coin_amount, $authUser->user_details->contact_number);
    }

    public function recharge(Request $request) {
        $typeOfWallet = !$request->wallet ?
        BuyerWallet::class :
        SellerWallet::class;

        $wallet = $typeOfWallet::where('user_id', auth()->id());

        $request->validate([
            'amount_coin_shell' => [
                'required', 'numeric', 'max:' . $wallet->get()[0]->amount_coin_shell . '',
            ],
        ]);

        // return $request->all();
        PaymentTransaction::create([
            'user_id' => auth()->id(),
            'payment_status' => 1,
            'payment_description' => auth()->user()->first_name . " request to Recharge for " . $request->amount_coin_shell . ' Shells',
            'payment_total_amount' => $request->amount_coin_shell,
        ]);

    }
    
    public function payment($firstName, $email, $amount, $contactNumber)
    {
        $client = new \GuzzleHttp\Client();

        $data = [
            'data' => [
                "attributes" => [
                    "billing" =>
                    [
                        "address" => ["city" => "Obando", "line1" => "Line1", "state" => "Bulacan", "postal_code" => "3021", "country" => "PH"],
                        "name" => "$firstName",
                        "email" => "$email",
                        "phone" => "$contactNumber"
                    ],
                    "line_items" => [
                        [
                            "currency" => "PHP",
                            "amount" => 10000,
                            "description" => "withdraw",
                            "name" => "Withdraw",
                            "quantity" => 1
                        ],
                    ],
                    "payment_method_types" => ["gcash"],
                    "send_email_receipt" => true,
                    "show_description" => true,
                    "show_line_items" => true,
                    "description" => "withdrawal",
                    "reference_number" => "invoice-200"
                ]
            ]
        ];

        $data = json_encode($data);

        $response = $client->request('POST', 'https://api.paymongo.com/v1/checkout_sessions', [
            'body' => $data,
            'headers' => [
                'Content-Type' => 'application/json',
                'accept' => 'application/json',
                'authorization' => 'Basic c2tfdGVzdF9kSnY3bzVwTjdkdFBOTDNDQTliNWkzVFI6',
            ],
        ]);

        $responseData = json_decode($response->getBody(), true);;

        return response()->json($responseData, 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PaymentTransaction::with('user', 'user.user_details')->where('user_id', auth()->id())->latest()->get();
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
        PaymentTransaction::where('payment_number', $id)->update([
            'user_id' => $request->user_id,
            'payment_status' => $request->payment_status,
            'payment_description' => $request->payment_description,
            'payment_total_amount' => $request->payment_total_amount,
        ]);
        return response()->json(['status' => 'success'], 200);
    }

    public function accept($id)
    {
        // update status

        PaymentTransaction::find($id)->update([
            'status' => 2,
        ]);

        return response()->json(['status' => 'Accepted Successfully'], 200);
    }

    public function cancel()
    {
        // update
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return response()->json(['status' => 'success'], 200);
    }
}
