<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\ModelHasPermission;

class ModelHasPermissionController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => ModelHasPermission::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => ModelHasPermission::where('id', request('id'))->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...ModelHasPermission::rules());
        ModelHasPermission::create($validated);

        return response()->noContent();
    }

    public function update(ModelHasPermission $model_has_permission)
    {
        $validated = request()->validate(...ModelHasPermission::rules('update'));
        $model_has_permission->update($validated);

        return response()->noContent();
    }

    public function delete(ModelHasPermission $model_has_permission)
    {
        $model_has_permission->delete();

        return response()->noContent();
    }
}
