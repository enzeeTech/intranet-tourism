<?php

namespace App\Http\Controllers;

use App\Models\CommunityPreference;

class CommunityPreferenceController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => CommunityPreference::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => CommunityPreference::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...CommunityPreference::rules());
        CommunityPreference::create($validated);

        return response()->noContent();
    }

    public function update(CommunityPreference $community_preference)
    {
        $validated = request()->validate(...CommunityPreference::rules('update'));
        $community_preference->update($validated);

        return response()->noContent();
    }

    public function delete(CommunityPreference $community_preference)
    {
        $community_preference->delete();

        return response()->noContent();
    }
}
