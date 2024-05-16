<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\DepartmentPreference;

class DepartmentPreferenceController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => DepartmentPreference::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => DepartmentPreference::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...DepartmentPreference::rules());
        DepartmentPreference::create($validated);

        return response()->noContent();
    }

    public function update(DepartmentPreference $department_preference)
    {
        $validated = request()->validate(...DepartmentPreference::rules('update'));
        $department_preference->update($validated);

        return response()->noContent();
    }

    public function destroy(DepartmentPreference $department_preference)
    {
        $department_preference->delete();

        return response()->noContent();
    }
}
