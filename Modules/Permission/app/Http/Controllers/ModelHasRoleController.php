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
        $filters = request()->query('filter');

        $query = ModelHasRole::query();

        // Apply filters if they exist
        if ($filters) {
            $roleIds = array_map('intval', explode(',', $filters[0]));

            $query->whereIn('role_id', $roleIds);
        }

        $roles = $query->paginate();

        return response()->json([
            'data' => $roles,
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => ModelHasRole::where('model_id', $id)->firstOrFail(),
        ]);
    }

    public function store()
    {

        $user = User::with('roles')->findOrFail(request('model_id'));
        $validated = request()->validate(...ModelHasRole::rules('create'));

        $roleIds = $validated['role_id'];
        $departmentId = $validated['department_id'] ?? null;
        $communityId = $validated['community_id'] ?? null;

        // Remove all existing roles first
        $user->syncRoles([]);

        foreach ($roleIds as $roleId) {
            $role = Role::findOrFail($roleId);
            $user->assignRole($role);

            // Attach department_id and community_id to the pivot table
            $user->roles()->updateExistingPivot($roleId, [
                'department_id' => $departmentId,
                'community_id' => $communityId,
            ]);
        }

        $assignedRoles = $user->roles()->get();

        return response()->json([
            'data' => [
                'user' => $user,
                'roles' => $assignedRoles,
                'department_id' => $departmentId,
                'community_id' => $communityId,
            ],
            'message' => 'User has been assigned to the role.',
        ]);
    }

    public function update($id)
    {
        $user = User::with('roles')->findOrFail($id);

        $validated = request()->validate(...ModelHasRole::rules('create'));

        $roleIds = $validated['role_id'];
        $departmentId = $validated['department_id'] ?? null;
        $communityId = $validated['community_id'] ?? null;

        // Remove all existing roles first
        $user->syncRoles([]);

        foreach ($roleIds as $roleId) {
            $role = Role::findOrFail($roleId);
            $user->assignRole($role);

            // Attach department_id and community_id to the pivot table
            $user->roles()->updateExistingPivot($roleId, [
                'department_id' => $departmentId,
                'community_id' => $communityId,
            ]);
        }

        $assignedRoles = $user->roles()->get();

        return response()->json([
            'data' => [
                'user' => $user,
                'roles' => $assignedRoles,
            ],
            'message' => 'User roles have been updated.',
        ]);
    }

    public function destroy(ModelHasRole $modelHasRole)
    {
        $modelHasRole->delete();

        return response()->noContent();
    }
}
