<?php

namespace Modules\Settings\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Settings\Models\CommunityPreference;

class CommunityPreferenceController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => CommunityPreference::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => CommunityPreference::where('id', $id)->queryable()->firstOrFail(),
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

    public function destroy(CommunityPreference $community_preference)
    {
        $community_preference->delete();

        return response()->noContent();
    }
}
