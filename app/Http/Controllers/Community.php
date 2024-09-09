<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class Community extends Controller
{
    public function index()
    {
        return Inertia::render('Community', ['id' => auth()->id()]);
    }
    public function output()
    {
        return Inertia::render('OutputBoxCommunities', ['id' => auth()->id()]);
    }
    public function renderinner()
    {
        return Inertia::render('CommunityInner', ['id' => auth()->id()]);
    }
}
