<?php

namespace App\Http\Controllers;

use App\Models\BusinessScheme;

class BusinessSchemeController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => BusinessScheme::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => BusinessScheme::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...BusinessScheme::rules());
        BusinessScheme::create($validated);

        return response()->noContent();
    }

    public function update(BusinessScheme $business_scheme)
    {
        $validated = request()->validate(...BusinessScheme::rules('update'));
        $business_scheme->update($validated);

        return response()->noContent();
    }

    public function delete(BusinessScheme $business_scheme)
    {
        $business_scheme->delete();

        return response()->noContent();
    }
}
