<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\PreferenceSchema;

class PreferenceSchemaController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => PreferenceSchema::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => PreferenceSchema::where('id', $id)->queryable()->firstOrFail(),
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

    public function destroy(PreferenceSchema $preference_schema)
    {
        $preference_schema->delete();

        return response()->noContent();
    }
}
