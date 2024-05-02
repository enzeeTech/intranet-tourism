<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

class StaffDirectoryController extends Controller
{
    public function index()
    {
        return Inertia::render('StaffDirectory');
    }
}
