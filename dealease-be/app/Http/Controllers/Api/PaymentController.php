<?php

namespace App\Http\Controllers\Api;

use Paymongo\Paymongo;
use App\Models\BuyerWallet;
use App\Models\SellerWallet;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class PaymentController extends Controller
{
    public function widthdraw(Request $request)
    {
        $typeOfWallet = !$request->wallet ?
            BuyerWallet::class :
            SellerWallet::class;

        $wallet = $typeOfWallet::where('user_id', auth()->id());

        $request->validate([
            'shell_coin_amount' => [
                'required', 'numeric', 'max:' . $wallet->get()[0]->shell_coin_amount . '',
            ],
        ]);

        $shellCoinAmount = $wallet->get()[0]->shell_coin_amount - (int) $request->shell_coin_amount;

        // $wallet->update(['shell_coin_amount' => $shellCoinAmount]);

        return response('e');
    }

    public function payment(Request $request)
    {
        $client = new \GuzzleHttp\Client();

        $response = $client->request('POST', 'https://api.paymongo.com/v1/checkout_sessions', [
            'body' => '{
                "data":
                    {"attributes":
                        {"billing":
                            {"address": {"city":"Obando","line1":"Line1","state":"Bulacan","postal_code":"3021","country":"PH"},
                                "name":"' . $request->first_name . '",
                                "email":"' . $request->email . '",
                                "phone":"' . $request->phone . '"},
                                "line_items":[
                                    {"currency":"PHP",
                                        "amount":' . $request->amount . '},
                                        "description":"top up",
                                        "name":"Billing",
                                        "quantity":2}],
                                        "payment_method_types":["gcash"],
                                        "send_email_receipt":true,
                                        "show_description":true,
                                        "show_line_items":true,
                                        "description":"payment for top up",
                                        "reference_number":
                                        "invoice-200"
                                    }
                                }
                            }',
            'headers' => [
                'Content-Type' => 'application/json',
                'accept' => 'application/json',
                'authorization' => 'Basic c2tfdGVzdF9kSnY3bzVwTjdkdFBOTDNDQTliNWkzVFI6',
            ],
        ]);

        echo $response->getBody();
    }
}
