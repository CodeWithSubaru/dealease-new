<?php

namespace App\Http\Controllers\Api\Admin;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Models\ShellTransaction;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AnalyticsControllers extends Controller
{
    public function getNumOfUsers()
    {
        $usersCountByMonth = User::select(DB::raw('YEAR(created_at) year, MONTH(created_at) month, COUNT(*) count'))
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();
        return $usersCountByMonth;
    }

    public function getNumOfUsersByMonth()
    {
        $result = [];
        $months = [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12'
        ];

        for ($i = 0; $i <= 11; $i++) {
            $usersByMonth = User::whereYear('created_at', '=', Carbon::now()->format('Y'))
                ->whereMonth('created_at', '=', $months[$i])
                ->count();

            array_push($result, $usersByMonth);
        }

        return $result;
    }

    public function getNumberOfCancelledTransactions()
    {
        $shellTransaction = ShellTransaction::select(DB::raw('YEAR(created_at) year, MONTH(created_at) month, COUNT(*) count'))
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->where('payment_status', '0')
            ->get();
        return $shellTransaction;
    }

    public function getNumberOfPendingTransactions()
    {
        $shellTransaction = ShellTransaction::select(DB::raw('YEAR(created_at) year, MONTH(created_at) month, COUNT(*) count'))
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->where('payment_status', '1')
            ->get();
        return $shellTransaction;
    }

    public function getNumberOfSuccessTransactions()
    {
        $shellTransaction = ShellTransaction::select(DB::raw('YEAR(created_at) year, MONTH(created_at) month, COUNT(*) count'))
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->where('payment_status', '2')
            ->get();
        return $shellTransaction;
    }

    public function totalAmountRecharge()
    {
        $totalAmount = 0;
        $totalAmountRecharge = ShellTransaction::where('payment_description', 'Withdraw')->where('payment_status', '2')->get();
        for ($i = 0; $i < count($totalAmountRecharge); $i++) {
            $totalAmount += (float) $totalAmountRecharge[$i]->payment_total_amount;
        }

        return $totalAmount;
    }

    public function totalAmountWithdraw()
    {
        $totalAmount = 0;
        $totalAmountRecharge = ShellTransaction::where('payment_description', 'Recharge')->where('payment_status', '2')->get();
        for ($i = 0; $i < count($totalAmountRecharge); $i++) {
            $totalAmount += (float) $totalAmountRecharge[$i]->payment_total_amount;
        }

        return $totalAmount;
    }

    public function totalAmount()
    {
        $totalAmount = 0;
        $totalAmountRecharge = ShellTransaction::where('payment_status', '2')->get();
        for ($i = 0; $i < count($totalAmountRecharge); $i++) {
            $totalAmount += (float) $totalAmountRecharge[$i]->payment_total_amount;
        }

        return $totalAmount;
    }
}
