<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Modules\Crud\Models\Post;
use Modules\Crud\Models\Resource;

class PostController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Post::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Post::where('id', $id)->queryable()->firstOrFail(),
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
