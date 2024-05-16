<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\ResourceAccess;

class ResourceAccessController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => ResourceAccess::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => ResourceAccess::where('id', request('id'))->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...ResourceAccess::rules());
        ResourceAccess::create($validated);

        return response()->noContent();
    }

    public function update(ResourceAccess $resource_access)
    {
        $validated = request()->validate(...ResourceAccess::rules('update'));
        $resource_access->update($validated);

        return response()->noContent();
    }

    public function delete(ResourceAccess $resource_access)
    {
        $resource_access->delete();

        return response()->noContent();
    }
}
