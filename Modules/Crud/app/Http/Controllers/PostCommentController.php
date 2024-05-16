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

    public function show()
    {
        return response()->json([
            'data' => PostComment::where('id', request('id'))->queryable()->firstOrFail(),
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

    public function delete(PostComment $post_comment)
    {
        $post_comment->delete();

        return response()->noContent();
    }
}
