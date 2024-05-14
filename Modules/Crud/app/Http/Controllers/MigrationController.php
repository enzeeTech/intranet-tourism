<?php

namespace App\Http\Controllers;

use App\Models\Migration;

class MigrationController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Migration::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Migration::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Migration::rules());
        Migration::create($validated);

        return response()->noContent();
    }

    public function update(Migration $resource)
    {
        $validated = request()->validate(...Migration::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(Migration $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
