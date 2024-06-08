<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class departments extends Controller
{
    public function index()
    {
        return Inertia::render('Departments');
    }
}
