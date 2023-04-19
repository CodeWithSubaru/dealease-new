<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Paymongo\Paymongo;


class PaymentController extends Controller
{
    public function payment()
    {
        $client = new \GuzzleHttp\Client();

        $response = $client->request('POST', 'https://api.paymongo.com/v1/checkout_sessions', [
            'body' => '{"data":{"attributes":{"billing":{"address":{"city":"Obando","line1":"Line1","state":"Bulacan","postal_code":"3021","country":"PH"},"name":"Lord Vaider","email":"darwinstar1@gmail.com","phone":"09302938245"},"line_items":[{"currency":"PHP","amount":10000,"description":"top up","name":"Billing","quantity":2}],"payment_method_types":["gcash"],"send_email_receipt":true,"show_description":true,"show_line_items":true,"description":"payment for top up","reference_number":"invoice-200"}}}',
            'headers' => [
                'Content-Type' => 'application/json',
                'accept' => 'application/json',
                'authorization' => 'Basic c2tfdGVzdF9kSnY3bzVwTjdkdFBOTDNDQTliNWkzVFI6',
            ],
        ]);

        echo $response->getBody();
    }
}
