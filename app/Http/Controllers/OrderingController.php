<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderingController extends Controller
{
    public function index(Request $request)
    {
        $staffMembers = $request->query('staffMembers', '[]');
        return Inertia::render('Ordering', [
            'id' => auth()->id(),
            'staffMembers' => $staffMembers,
        ]);
    }
}
