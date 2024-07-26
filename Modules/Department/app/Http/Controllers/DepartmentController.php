<?php

namespace Modules\Department\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Department\Models\Department;
use Illuminate\Support\Facades\DB;


class DepartmentController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Department::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Department::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {

        $validated = request()->validate(...Department::rules());

        DB::beginTransaction();
        try {

            $department = new Department();
            $department->fill($validated);

            $department->save();

            $department->storeBanner();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        }

        return response()->noContent();
    }

    public function update(Department $department)
    {

        $validated = request()->validate(...Department::rules('update'));
        DB::beginTransaction();
        try {

            $department->update($validated);

            $department->storeBanner();

            DB::commit();
        } catch (\Throwable $th) {

            DB::rollback();
            throw $th;
        }


        return response()->noContent();
    }


    public function destroy(Department $department)
    {
        $department->delete();

        return response()->noContent();
    }
}
