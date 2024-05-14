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

    public function update(Cache $resource)
    {
        $validated = request()->validate(...Cache::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(Cache $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
