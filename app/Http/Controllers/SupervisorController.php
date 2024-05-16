<?php

namespace App\Http\Controllers;

use App\Models\Supervisor;

class SupervisorController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Supervisor::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Supervisor::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Supervisor::rules());
        Supervisor::create($validated);

        return response()->noContent();
    }

    public function update(Supervisor $supervisor)
    {
        $validated = request()->validate(...Supervisor::rules('update'));
        $supervisor->update($validated);

        return response()->noContent();
    }

    public function delete(Supervisor $supervisor)
    {
        $supervisor->delete();

        return response()->noContent();
    }
}
