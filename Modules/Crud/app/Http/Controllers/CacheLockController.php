<?php

namespace App\Http\Controllers;

use App\Models\CacheLock;

class CacheLockController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => CacheLock::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => CacheLock::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...CacheLock::rules());
        CacheLock::create($validated);

        return response()->noContent();
    }

    public function update(CacheLock $resource)
    {
        $validated = request()->validate(...CacheLock::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(CacheLock $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
