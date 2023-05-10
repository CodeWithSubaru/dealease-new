<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\ShellTransaction;

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

    public function getNumberOfPendingTransactions()
    {
        $shellTransaction = ShellTransaction::select(DB::raw('YEAR(created_at) year, MONTH(created_at) month, COUNT(*) count'))
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->where('payment_status', '2')
            ->get();
        return $shellTransaction;
    }
}
