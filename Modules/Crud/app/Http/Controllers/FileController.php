<?php

namespace Modules\Crud\Http\Controllers;

use App\Models\File;

class FileController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => File::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => File::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...File::rules());
        File::create($validated);

        return response()->noContent();
    }

    public function update(File $resource)
    {
        $validated = request()->validate(...File::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(File $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
