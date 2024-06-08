<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function index()
    {
        return Inertia::render('Media', ['id' => auth()->id()]);
    }
}
