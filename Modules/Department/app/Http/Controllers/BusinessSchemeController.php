<?php

namespace Modules\Department\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Department\Models\BusinessScheme;

class BusinessSchemeController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => BusinessScheme::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => BusinessScheme::where('id', $id)->queryable()->firstOrFail(),
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

    public function destroy(BusinessScheme $business_scheme)
    {
        $business_scheme->delete();

        return response()->noContent();
    }
}
