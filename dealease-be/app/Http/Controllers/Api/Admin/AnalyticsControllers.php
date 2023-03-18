<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
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

    public function getNumOfMessages()
    {
        $messageCountByMonth = Message::select(DB::raw('YEAR(created_at) year, MONTH(created_at) month, COUNT(*) count'))
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();
        return $messageCountByMonth;
    }
}
