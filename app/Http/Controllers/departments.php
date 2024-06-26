<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class departments extends Controller
{
    public function index()
    {
        return Inertia::render('Departments', ['id' => auth()->id()]);
    }
    public function output()
    {
        return Inertia::render('OutputBoxDepart', ['id' => auth()->id()]);
    }
   
   
}
