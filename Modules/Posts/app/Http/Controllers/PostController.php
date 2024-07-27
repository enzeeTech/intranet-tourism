<?php

namespace Modules\Posts\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Posts\Models\Post;
use Modules\Posts\Models\PostAccessibility;

class PostController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => $this->shouldPaginate(Post::queryable()),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Post::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }


    public function store(Post $post)
    {
        $validated = request()->validate(...Post::rules());
        $validatedAccessibilities = [];
        if (request()->has('accessibilities')) {
            $accessibilities = request('accessibilities');
            foreach ($accessibilities as $accessibility) {
                $validatedAccessibilities[] = validator($accessibility, ...PostAccessibility::rules('createFromPost'))->validated();
            }
        }

        DB::beginTransaction();
        try {
            $post->fill($validated)->save();
            $post->storeAttachments();
            if (request()->has('accessibilities')) {
                $post->accessibilities()->createMany($validatedAccessibilities);
            }
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
