<?php

namespace App\Http\Controllers;

use App\Models\PreferenceSchema;

class PreferenceSchemaController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => PreferenceSchema::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => PreferenceSchema::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...PreferenceSchema::rules());
        PreferenceSchema::create($validated);

        return response()->noContent();
    }

    public function update(PreferenceSchema $preference_schema)
    {
        $validated = request()->validate(...PreferenceSchema::rules('update'));
        $preference_schema->update($validated);

        return response()->noContent();
    }

    public function delete(PreferenceSchema $preference_schema)
    {
        $preference_schema->delete();

        return response()->noContent();
    }
}
