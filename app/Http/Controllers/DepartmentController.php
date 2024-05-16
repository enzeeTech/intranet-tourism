<?php

namespace App\Http\Controllers;

use App\Models\Department;

class DepartmentController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Department::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Department::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Department::rules());
        Department::create($validated);

        return response()->noContent();
    }

    public function update(Department $department)
    {
        $validated = request()->validate(...Department::rules('update'));
        $department->update($validated);

        return response()->noContent();
    }

    public function delete(Department $department)
    {
        $department->delete();

        return response()->noContent();
    }
}
