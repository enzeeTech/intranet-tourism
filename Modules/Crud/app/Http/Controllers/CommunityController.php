<?php

namespace App\Http\Controllers;

use App\Models\Community;

// use App\Models\Community;

class CommunityController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Community::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Community::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Community::rules());
        Community::create($validated);

        return response()->noContent();
    }

    public function update(Community $resource)
    {
        $validated = request()->validate(...Community::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(Community $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
