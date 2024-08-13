<?php

namespace Modules\Crud\Http\Controllers;

use App\Models\Gallery;

class GalleryController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Gallery::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Gallery::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Gallery::rules());
        Gallery::create($validated);

        return response()->noContent();
    }

    public function update(Gallery $resource)
    {
        $validated = request()->validate(...Gallery::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(Gallery $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
