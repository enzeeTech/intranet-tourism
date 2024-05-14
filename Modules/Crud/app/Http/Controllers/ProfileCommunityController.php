<?php

namespace App\Http\Controllers;

use App\Models\ProfileCommunity;

class ProfileCommunityController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => ProfileCommunity::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => ProfileCommunity::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...ProfileCommunity::rules());
        ProfileCommunity::create($validated);

        return response()->noContent();
    }

    public function update(ProfileCommunity $resource)
    {
        $validated = request()->validate(...ProfileCommunity::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(ProfileCommunity $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
