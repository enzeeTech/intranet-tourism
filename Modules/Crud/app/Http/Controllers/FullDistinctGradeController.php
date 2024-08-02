<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Crud\Models\EmploymentPost;

class FullDistinctGradeController extends Controller
{
    public function getDistinctGrades()
    {
        $distinctGrades = EmploymentPost::whereNotNull('schema_grade')
            ->distinct()
            ->pluck('schema_grade');

        return response()->json([
            'schema_grades' => $distinctGrades,
        ]);
    }
}
