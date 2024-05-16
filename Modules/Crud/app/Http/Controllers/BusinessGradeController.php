<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\BusinessGrade;

class BusinessGradeController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => BusinessGrade::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => BusinessGrade::where('id', request('id'))->queryable()->firstOrFail(),
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

    public function delete(BusinessGrade $business_grade)
    {
        $business_grade->delete();

        return response()->noContent();
    }
}
