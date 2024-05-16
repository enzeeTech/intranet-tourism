<?php

namespace App\Http\Controllers;

use App\Models\BusinessUnit;

class BusinessUnitController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => BusinessUnit::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => BusinessUnit::queryable()->firstOrFail(request('id')),
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

    public function delete(BusinessUnit $business_unit)
    {
        $business_unit->delete();

        return response()->noContent();
    }
}
