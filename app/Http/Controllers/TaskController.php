<?php

namespace App\Http\Controllers;

use App\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Task::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Task::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Task::rules());
        Task::create($validated);

        return response()->noContent();
    }

    public function update(Task $task)
    {
        $validated = request()->validate(...Task::rules('update'));
        $task->update($validated);

        return response()->noContent();
    }

    public function delete(Task $task)
    {
        $task->delete();

        return response()->noContent();
    }
}
