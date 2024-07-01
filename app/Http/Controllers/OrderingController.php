<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderingController extends Controller
{
    public function index()
    {
        return Inertia::render('Ordering', ['id' => auth()->id()]);
    }
}
