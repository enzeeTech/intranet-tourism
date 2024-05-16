<?php

namespace App\Http\Controllers;

use App\Models\ModelHasRole;

class ModelHasRoleController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => ModelHasRole::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => ModelHasRole::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...ModelHasRole::rules());
        ModelHasRole::create($validated);

        return response()->noContent();
    }

    public function update(ModelHasRole $model_has_role)
    {
        $validated = request()->validate(...ModelHasRole::rules('update'));
        $model_has_role->update($validated);

        return response()->noContent();
    }

    public function delete(ModelHasRole $model_has_role)
    {
        $model_has_role->delete();

        return response()->noContent();
    }
}
