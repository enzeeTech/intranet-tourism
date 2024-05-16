<?php

namespace App\Http\Controllers;

use App\Models\PostAccessibility;

class PostAccessibilityController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => PostAccessibility::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => PostAccessibility::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...PostAccessibility::rules());
        PostAccessibility::create($validated);

        return response()->noContent();
    }

    public function update(PostAccessibility $post_accessibility)
    {
        $validated = request()->validate(...PostAccessibility::rules('update'));
        $post_accessibility->update($validated);

        return response()->noContent();
    }

    public function delete(PostAccessibility $post_accessibility)
    {
        $post_accessibility->delete();

        return response()->noContent();
    }
}
