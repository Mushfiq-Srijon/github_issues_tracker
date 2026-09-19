<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth('api')->id();

        $query = Issue::with('user')->where('user_id', $userId);

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where('title', 'like', '%' . $search . '%');
        }

        if ($request->filled('status')) {
            $statuses = is_array($request->status)
                ? $request->status
                : [$request->status];

            $query->whereIn('status', $statuses);
        }

        if ($request->filled('priority')) {
            $priorities = is_array($request->priority)
                ? $request->priority
                : [$request->priority];

            $query->whereIn('priority', $priorities);
        }

        $issues = $query
            ->latest('updated_at')
            ->get();

        return response()->json([
            'issues' => $issues,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:Low,Medium,High,Critical',
            'status' => 'required|in:Open,In Progress,Closed',
            'label' => 'required|in:Bug,Feature,Documentation,UI/UX,Backend,Frontend',
        ]);

        $issue = Issue::create([
            'user_id' => auth('api')->id(),
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'priority' => $validated['priority'],
            'status' => $validated['status'],
            'label' => $validated['label'],
        ]);

        return response()->json([
            'message' => 'Issue created successfully.',
            'issue' => $issue->load('user'),
        ], 201);
    }

    public function show(Issue $issue)
    {
        $this->authorizeIssue($issue);

        return response()->json([
            'issue' => $issue->load('user'),
        ]);
    }

    public function update(Request $request, Issue $issue)
    {
        $this->authorizeIssue($issue);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:Low,Medium,High,Critical',
            'status' => 'required|in:Open,In Progress,Closed',
            'label' => 'required|in:Bug,Feature,Documentation,UI/UX,Backend,Frontend',
        ]);

        $issue->update($validated);

        return response()->json([
            'message' => 'Issue updated successfully.',
            'issue' => $issue->fresh(),
        ]);
    }

    public function destroy(Issue $issue)
    {
        $this->authorizeIssue($issue);

        $issue->delete();

        return response()->json([
            'message' => 'Issue deleted successfully.',
        ]);
    }

    private function authorizeIssue(Issue $issue)
    {
        abort_unless(
            $issue->user_id === auth('api')->id(),
            403,
            'You are not allowed to access this issue.'
        );
    }
}