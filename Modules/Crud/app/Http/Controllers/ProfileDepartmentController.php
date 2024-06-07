<?php

namespace App\Http\Controllers;

use App\Models\ProfileDepartment;

class ProfileDepartmentController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => ProfileDepartment::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => ProfileDepartment::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...ProfileDepartment::rules());
        ProfileDepartment::create($validated);

        return response()->noContent();
    }

    public function update(ProfileDepartment $resource)
    {
        $validated = request()->validate(...ProfileDepartment::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(ProfileDepartment $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
