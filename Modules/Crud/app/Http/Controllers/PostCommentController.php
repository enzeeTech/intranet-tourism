<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\PostComment;

class PostCommentController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => PostComment::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => PostComment::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...PostComment::rules());
        PostComment::create($validated);

        return response()->noContent();
    }

    public function update(PostComment $post_comment)
    {
        $validated = request()->validate(...PostComment::rules('update'));
        $post_comment->update($validated);

        return response()->noContent();
    }

    public function destroy(PostComment $post_comment)
    {
        $post_comment->delete();

        return response()->noContent();
    }
}
