<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ManageLinksController extends Controller
{
    public function index()
    {
        return Inertia::render('ManageLinks', ['id' => auth()->id()]);
    }
}
