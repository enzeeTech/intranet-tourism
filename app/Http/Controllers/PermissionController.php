<?php

namespace App\Http\Controllers;

use App\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Permission::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Permission::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Permission::rules());
        Permission::create($validated);

        return response()->noContent();
    }

    public function update(Permission $permission)
    {
        $validated = request()->validate(...Permission::rules('update'));
        $permission->update($validated);

        return response()->noContent();
    }

    public function delete(Permission $permission)
    {
        $permission->delete();

        return response()->noContent();
    }
}
