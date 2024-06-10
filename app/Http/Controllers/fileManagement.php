<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class fileManagement extends Controller
{
    public function index()
    {
        return Inertia::render('fileManagement', ['id' => auth()->id()]);
    }
}
