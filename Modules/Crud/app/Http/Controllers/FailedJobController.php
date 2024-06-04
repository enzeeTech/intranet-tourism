<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\FailedJob;

class FailedJobController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => FailedJob::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => FailedJob::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...FailedJob::rules());
        FailedJob::create($validated);

        return response()->noContent();
    }

    public function update(FailedJob $failed_job)
    {
        $validated = request()->validate(...FailedJob::rules('update'));
        $failed_job->update($validated);

        return response()->noContent();
    }

    public function destroy(FailedJob $failed_job)
    {
        $failed_job->delete();

        return response()->noContent();
    }
}
