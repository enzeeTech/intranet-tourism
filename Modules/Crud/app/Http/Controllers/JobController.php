<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\Job;

class JobController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Job::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Job::where('id', $id)->queryable()->firstOrFail(),
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

    public function destroy(Job $job)
    {
        $job->delete();

        return response()->noContent();
    }
}
