<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Role::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Role::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Role::rules());
        Role::create($validated);

        return response()->noContent();
    }

    public function update(Role $role)
    {
        $validated = request()->validate(...Role::rules('update'));
        $role->update($validated);

        return response()->noContent();
    }

    public function destroy(Role $role)
    {
        $role->delete();

        return response()->noContent();
    }
}
