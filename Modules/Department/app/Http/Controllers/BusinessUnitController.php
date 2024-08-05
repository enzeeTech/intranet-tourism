<?php

namespace Modules\Department\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Department\Models\BusinessUnit;
use Illuminate\Http\Request;

class BusinessUnitController extends Controller
{
    public function index(Request $request)
    {
        $query = BusinessUnit::query();

        if ($request->has('department_id')) {
            $departmentId = $request->query('department_id');
            $query->where('department_id', $departmentId);
        }

        return response()->json($query->paginate());
    }

    public function show($id)
    {
        return response()->json([
            'data' => BusinessUnit::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...BusinessUnit::rules());
        BusinessUnit::create($validated);

        return response()->noContent();
    }

    public function update(BusinessUnit $business_unit)
    {
        $validated = request()->validate(...BusinessUnit::rules('update'));
        $business_unit->update($validated);

        return response()->noContent();
    }

    public function destroy(BusinessUnit $business_unit)
    {
        $business_unit->delete();

        return response()->noContent();
    }
}
