<?php

namespace App\Http\Controllers;

use App\Models\Cache;

class CacheController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Cache::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Cache::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Cache::rules());
        Cache::create($validated);

        return response()->noContent();
    }

    public function update(Cache $cache)
    {
        $validated = request()->validate(...Cache::rules('update'));
        $cache->update($validated);

        return response()->noContent();
    }

    public function delete(Cache $cache)
    {
        $cache->delete();

        return response()->noContent();
    }
}
