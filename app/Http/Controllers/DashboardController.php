<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', ['id' => auth()->id()]);
    }

    public function onlinelist()
    {
        return Inertia::render('onlinelist');
    }
}
