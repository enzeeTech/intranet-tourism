<?php

namespace App\Http\Controllers;

use App\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Role::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Role::queryable()->firstOrFail(request('id')),
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

    public function delete(Role $role)
    {
        $role->delete();

        return response()->noContent();
    }
}
