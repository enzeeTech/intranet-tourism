<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;

class DepartmentOrdering extends Controller
{
    public function index()
    {
        return Inertia::render('orderingDepartments', ['id' => auth()->id()]);
    }
}
