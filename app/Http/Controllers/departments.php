<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class departments extends Controller
{
    public function index()
    {
        return Inertia::render('Departments');
    }
   
}
