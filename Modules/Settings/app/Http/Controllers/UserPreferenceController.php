<?php

namespace Modules\Settings\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Settings\Models\UserPreference;

class UserPreferenceController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => UserPreference::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => UserPreference::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...UserPreference::rules());
        UserPreference::create($validated);

        return response()->noContent();
    }

    public function update(UserPreference $user_preference)
    {
        $validated = request()->validate(...UserPreference::rules('update'));
        $user_preference->update($validated);

        return response()->noContent();
    }

    public function destroy(UserPreference $user_preference)
    {
        $user_preference->delete();

        return response()->noContent();
    }
}
