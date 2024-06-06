<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class Commmmunity extends Controller
{
    public function index()
    {
        return Inertia::render('Community');
    }
}
