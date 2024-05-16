<?php

namespace App\Http\Controllers;

use App\Models\RoleHasPermission;

class RoleHasPermissionController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => RoleHasPermission::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => RoleHasPermission::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...RoleHasPermission::rules());
        RoleHasPermission::create($validated);

        return response()->noContent();
    }

    public function update(RoleHasPermission $role_has_permission)
    {
        $validated = request()->validate(...RoleHasPermission::rules('update'));
        $role_has_permission->update($validated);

        return response()->noContent();
    }

    public function delete(RoleHasPermission $role_has_permission)
    {
        $role_has_permission->delete();

        return response()->noContent();
    }
}
