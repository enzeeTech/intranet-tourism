<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\PostAccessibility;

class PostAccessibilityController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => PostAccessibility::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => PostAccessibility::where('id', $id)->queryable()->firstOrFail(),
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

    public function destroy(PostAccessibility $post_accessibility)
    {
        $post_accessibility->delete();

        return response()->noContent();
    }
}
