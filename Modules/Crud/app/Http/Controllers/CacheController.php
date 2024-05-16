<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\Cache;

class CacheController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Cache::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Cache::where('id', $id)->queryable()->firstOrFail(),
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

    public function destroy(Cache $cache)
    {
        $cache->delete();

        return response()->noContent();
    }
}
