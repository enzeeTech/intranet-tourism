<?php

namespace Modules\Department\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Department\Models\BusinessPost;

class BusinessPostController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => BusinessPost::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => BusinessPost::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...BusinessPost::rules());
        BusinessPost::create($validated);

        return response()->noContent();
    }

    public function update(BusinessPost $business_post)
    {
        $validated = request()->validate(...BusinessPost::rules('update'));
        $business_post->update($validated);

        return response()->noContent();
    }

    public function destroy(BusinessPost $business_post)
    {
        $business_post->delete();

        return response()->noContent();
    }
}
