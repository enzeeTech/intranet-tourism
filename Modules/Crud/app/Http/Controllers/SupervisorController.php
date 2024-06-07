<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\Supervisor;

class SupervisorController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Supervisor::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Supervisor::where('id', $id)->queryable()->firstOrFail(),
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

    public function destroy(Supervisor $supervisor)
    {
        $supervisor->delete();

        return response()->noContent();
    }
}
