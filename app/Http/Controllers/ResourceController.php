<?php

namespace App\Http\Controllers;

use App\Models\Resource;

class ResourceController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Resource::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Resource::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Resource::rules());
        Resource::create($validated);

        return response()->noContent();
    }

    public function update(Resource $resource)
    {
        $validated = request()->validate(...Resource::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(Resource $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
