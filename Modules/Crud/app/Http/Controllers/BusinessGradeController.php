<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\BusinessGrade;

class BusinessGradeController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => $this->shouldPaginate(BusinessGrade::queryable()),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => BusinessGrade::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...BusinessGrade::rules());
        BusinessGrade::create($validated);

        return response()->noContent();
    }

    public function update(BusinessGrade $business_grade)
    {
        $validated = request()->validate(...BusinessGrade::rules('update'));
        $business_grade->update($validated);

        return response()->noContent();
    }

    public function destroy(BusinessGrade $business_grade)
    {
        $business_grade->delete();

        return response()->noContent();
    }
}
