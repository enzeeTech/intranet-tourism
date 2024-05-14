<?php

namespace App\Http\Controllers;

use App\Models\FailedJob;

class FailedJobController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => FailedJob::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => FailedJob::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...FailedJob::rules());
        FailedJob::create($validated);

        return response()->noContent();
    }

    public function update(FailedJob $resource)
    {
        $validated = request()->validate(...FailedJob::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(FailedJob $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
