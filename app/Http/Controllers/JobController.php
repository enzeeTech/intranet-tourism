<?php

namespace App\Http\Controllers;

use App\Models\Job;

class JobController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Job::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Job::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Job::rules());
        Job::create($validated);

        return response()->noContent();
    }

    public function update(Job $job)
    {
        $validated = request()->validate(...Job::rules('update'));
        $job->update($validated);

        return response()->noContent();
    }

    public function delete(Job $job)
    {
        $job->delete();

        return response()->noContent();
    }
}
