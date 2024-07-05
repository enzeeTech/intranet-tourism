<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\ModelHasRole;

class ModelHasRoleController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => ModelHasRole::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => ModelHasRole::where('model_id', $id)->queryable()->firstOrFail(),
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

    public function destroy(ModelHasRole $model_has_role)
    {
        $model_has_role->delete();

        return response()->noContent();
    }
}
