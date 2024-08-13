<?php

namespace Modules\Permission\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Modules\Permission\Models\ModelHasRole;
use Spatie\Permission\Models\Role;

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

        $user = User::with('roles')->findOrFail(request('model_id'));

        $validated = request()->validate(...ModelHasRole::rules('create'));

        $roleIds = $validated['role_id'];
        $user->syncRoles([]);

        foreach ($roleIds as $roleId) {

            $role = Role::findOrFail($roleId);
            $user->assignRole($role);
        }

        $assignedRoles = $user->roles()->get();
        return response()->json([
            'data' => [
                'user' => $user,
                'role' => $assignedRoles,
            ],
            'message' => 'User has been assigned for the role.',
        ]);
    }

    public function update($id)
    {
        $user = User::with('roles')->findOrFail($id);

        $validated = request()->validate(...ModelHasRole::rules('create'));

        $roleIds = $validated['role_id'];
        $user->syncRoles([]);

        foreach ($roleIds as $roleId) {

            $role = Role::findOrFail($roleId);
            $user->assignRole($role);
        }

        $assignedRoles = $user->roles()->get();
        return response()->json([
            'data' => [
                'user' => $user,
                'role' => $assignedRoles,
            ],
            'message' => 'User has been assigned for the role.',
        ]);
    }


    public function destroy(ModelHasRole $modelHasRole)
    {
        $modelHasRole->delete();

        return response()->noContent();
    }
}
