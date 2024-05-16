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

    public function update(CacheLock $cache_lock)
    {
        $validated = request()->validate(...CacheLock::rules('update'));
        $cache_lock->update($validated);

        return response()->noContent();
    }

    public function delete(CacheLock $cache_lock)
    {
        $cache_lock->delete();

        return response()->noContent();
    }
}
