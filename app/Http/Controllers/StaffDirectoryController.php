<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class StaffDirectoryController extends Controller
{
    public function index()
    {
        $departmentId = request('departmentId');
        return Inertia::render('StaffDirectory', [
            'id' => auth()->id(),
            'departmentId' => $departmentId
        ]);
    }
}
