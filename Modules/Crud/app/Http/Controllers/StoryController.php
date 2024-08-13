<?php

namespace Modules\Crud\Http\Controllers;

use App\Models\Story;

class StoryController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Story::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Story::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Story::rules());
        Story::create($validated);

        return response()->noContent();
    }

    public function update(Story $resource)
    {
        $validated = request()->validate(...Story::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(Story $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
