<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderingController extends Controller
{
    public function index(Request $request)
    {
        $staffMembers = $request->query('staffMembers', '[]'); // Get staffMembers from the query, default to an empty array if not present
        return Inertia::render('Ordering', [
            'id' => auth()->id(),
            'staffMembers' => $staffMembers,
        ]);
    }
}
