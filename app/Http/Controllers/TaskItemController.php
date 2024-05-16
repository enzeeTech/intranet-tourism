<?php

namespace App\Http\Controllers;

use App\Models\TaskItem;

class TaskItemController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => TaskItem::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => TaskItem::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...TaskItem::rules());
        TaskItem::create($validated);

        return response()->noContent();
    }

    public function update(TaskItem $task_item)
    {
        $validated = request()->validate(...TaskItem::rules('update'));
        $task_item->update($validated);

        return response()->noContent();
    }

    public function delete(TaskItem $task_item)
    {
        $task_item->delete();

        return response()->noContent();
    }
}
