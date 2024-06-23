<?php

namespace Modules\Events\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Events\Models\TaskItem;

class TaskItemController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => TaskItem::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => TaskItem::where('id', $id)->queryable()->firstOrFail(),
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

    public function destroy(TaskItem $task_item)
    {
        $task_item->delete();

        return response()->noContent();
    }
}
