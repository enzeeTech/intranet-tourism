<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\CacheLock;

class CacheLockController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => CacheLock::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => CacheLock::where('id', $id)->queryable()->firstOrFail(),
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

    public function destroy(CacheLock $cache_lock)
    {
        $cache_lock->delete();

        return response()->noContent();
    }
}
