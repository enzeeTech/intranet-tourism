<?php

namespace Modules\Events\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Events\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Task::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Task::where('id', $id)->queryable()->firstOrFail(),
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

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->noContent();
    }
}
