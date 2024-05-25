<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Crud\Models\Post;

class PostController extends Controller
{
    // public function index()
    // {
    //     return response()->json([
    //         'data' => Post::queryable()->paginate(),
    //     ]);
    // }

    // public function show($id)
    // {
    //     return response()->json([
    //         'data' => Post::where('id', $id)->queryable()->firstOrFail(),
    //     ]);
    // }

    public function index()
    {
        $posts = Post::queryable()->paginate();

        // Transform the attachments field to always be an array
        $posts->getCollection()->transform(function ($post) {
            $post->attachments = [$post->attachments];
            return $post;
        });

        return response()->json([
            'data' => $posts,
        ]);
    }

    public function show($id)
    {
        $post = Post::where('id', $id)->queryable()->firstOrFail();

        // Transform the attachments field to always be an array
        $post->attachments = [$post->attachments];

        return response()->json([
            'data' => $post,
        ]);
    }


    public function store()
    {
        $validated = request()->validate(...Post::rules());

        DB::beginTransaction();
        try {
            $post = new Post;
            $post->fill($validated)->save();
            $post->storeAttachments();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        }

        return response()->noContent();
    }

    public function update(Post $post)
    {
        $validated = request()->validate(...Post::rules('update'));
        $post->update($validated);

        return response()->noContent();
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->noContent();
    }
}
