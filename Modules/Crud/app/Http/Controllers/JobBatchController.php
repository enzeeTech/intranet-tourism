<?php

namespace App\Http\Controllers;

use App\Models\JobBatch;

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
            'data' => JobBatch::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...JobBatch::rules());
        JobBatch::create($validated);

        return response()->noContent();
    }

    public function update(JobBatch $resource)
    {
        $validated = request()->validate(...JobBatch::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(JobBatch $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
