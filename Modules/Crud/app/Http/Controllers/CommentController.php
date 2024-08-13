<?php

namespace Modules\Crud\Http\Controllers;

use App\Models\Comment;

class CommentController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Comment::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Comment::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Comment::rules());
        Comment::create($validated);

        return response()->noContent();
    }

    public function update(Comment $resource)
    {
        $validated = request()->validate(...Comment::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(Comment $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
