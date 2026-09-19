<?php

namespace App\Http\Controllers;

use App\Models\Issue;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = auth('api')->id();

        $issues = Issue::where('user_id', $userId);

        $total = (clone $issues)->count();
        $open = (clone $issues)->where('status', 'Open')->count();
        $inProgress = (clone $issues)->where('status', 'In Progress')->count();
        $closed = (clone $issues)->where('status', 'Closed')->count();

        $recentIssues = (clone $issues)
            ->with('user')
            ->latest('updated_at')
            ->take(5)
            ->get();

        return response()->json([
            'stats' => [
                'total' => $total,
                'open' => $open,
                'inProgress' => $inProgress,
                'closed' => $closed,
            ],
            'recentIssues' => $recentIssues,
            'statusDistribution' => [
                'open' => $open,
                'inProgress' => $inProgress,
                'closed' => $closed,
            ],
        ]);
    }
}