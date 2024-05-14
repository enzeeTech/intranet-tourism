<?php

namespace App\Http\Controllers;

use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Post::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Post::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Post::rules());
        Post::create($validated);

        return response()->noContent();
    }

    public function update(Post $resource)
    {
        $validated = request()->validate(...Post::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(Post $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
