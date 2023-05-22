<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Paymongo\Paymongo;
use Illuminate\Http\Request;
use App\Models\ShellTransaction;
use App\Http\Controllers\Controller;
use App\Models\UsersWallet;

class PaymentController extends Controller
{

    public function withdraw(Request $request)
    {
        $shells = UsersWallet::where('user_id', auth()->user()->user_id)->get()[0];

        $request->validate([
            'shell_coin_amount' => [
                'required', 'numeric', 'min:100', 'max:' . $shells->shell_coin_amount . '',
            ],
        ]);

        $paymentNumber = $this->generatePaymentNumber();

        ShellTransaction::create([
            'user_id' => auth()->user()->user_id,
            'payment_number' => $paymentNumber,
            'payment_status' => 1,
            'payment_description' => 'Withdraw',
            'payment_total_amount' => $request->amountToWithdraw,
            'shells' => $request->shell_coin_amount,
        ]);

        $shells = UsersWallet::where('user_id', auth()->user()->user_id);
        $total = (float) $shells->get()[0]->shell_coin_amount - (float) $request->shell_coin_amount;
        $shells->update(['shell_coin_amount' => $total]);

        return response()->json(['status' => 'Request Created Successfully'], 200);
    }

    public function recharge(Request $request)
    {

        $request->validate([
            'amount' => [
                'required', 'numeric', 'min:100', 'max:100000'
            ],
        ]);

        $paymentNumber = $this->generatePaymentNumber();

        $paymentTransaction = ShellTransaction::create([
            'user_id' => auth()->user()->user_id,
            'payment_number' => $paymentNumber,
            'payment_status' => 1,
            'payment_description' => 'Recharge',
            'payment_total_amount' => $request->amount,
            'checkout_session_id' => null,
            'shells' => $request->shells,
        ]);

        $authUser = User::with('user_details')->where('user_id', auth()->user()->user_id)->get()[0];
        $amount = $request->amount . '00';
        $pay = $this->payment($paymentTransaction->payment_number, $authUser->first_name, $authUser->email, $amount, $authUser->user_details->contact_number);

        return response()->json(['status' => 'Request Created Successfully', $pay], 200);
    }

    private function generatePaymentNumber()
    {
        $shellTransactionNumber = ShellTransaction::all()->last();

        if ($shellTransactionNumber) {
            $lastShellTransactionNumber = $shellTransactionNumber->payment_number;
            $getNumbers = str_replace("REF", "", $lastShellTransactionNumber);
            $idIncrease = $getNumbers + 1;
            $getString = str_pad($idIncrease, 7, 0, STR_PAD_LEFT);
            $newShellTransactionNumber = "REF" . $getString;
        } else {
            $newShellTransactionNumber = 'REF0000001';
        }

        return $newShellTransactionNumber;
    }

    public function payment($id, $firstName, $email, $amount, $contactNumber)
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
                            "amount" => (float) $amount,
                            "description" => "withdraw",
                            "name" => "Shells",
                            "quantity" => 1
                        ],
                    ],
                    "payment_method_types" => ["gcash"],
                    "send_email_receipt" => true,
                    "show_description" => true,
                    "show_line_items" => true,
                    "description" => "Recharge",
                    "reference_number" => "$id"
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

        $responseData = json_decode($response->getBody(), true);
        ShellTransaction::where('payment_number', $id)
            ->update([
                'checkout_session_id' => $responseData['data']['id']
            ]);

        return response()->json($responseData, 200);
    }

    public function numberOfUnderReviewTransaction()
    {
        return ShellTransaction::with('user')->where('payment_status', '1')->where('user_id', auth()->user()->user_id)->count();
    }

    public function numberOfApprovedTransaction()
    {
        return ShellTransaction::with('user')->where('payment_status', '2')->where('user_id', auth()->user()->user_id)->count();
    }

    public function numberOfCancelledTransaction()
    {
        return ShellTransaction::with('user')->where('payment_status', '0')->where('user_id', auth()->user()->user_id)->count();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ShellTransaction::with('user', 'user.user_details')->where('user_id', auth()->user()->user_id)->latest()->get();
    }

    /**
     * Display the specified resource.
     */
    public function show($transaction)
    {
        $status = $transaction;

        return ShellTransaction::with('user', 'user.user_details')->where('payment_status', $status)->where('user_id', auth()->user()->user_id)->latest()->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        ShellTransaction::where('payment_number', $id)->update([
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

        ShellTransaction::find($id)->update([
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
