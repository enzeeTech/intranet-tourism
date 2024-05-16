<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\JobBatch;

class JobBatchController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => JobBatch::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => JobBatch::where('id', request('id'))->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...JobBatch::rules());
        JobBatch::create($validated);

        return response()->noContent();
    }

    public function update(JobBatch $job_batch)
    {
        $validated = request()->validate(...JobBatch::rules('update'));
        $job_batch->update($validated);

        return response()->noContent();
    }

    public function delete(JobBatch $job_batch)
    {
        $job_batch->delete();

        return response()->noContent();
    }
}
