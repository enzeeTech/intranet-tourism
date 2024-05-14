<?php

namespace App\Http\Controllers;

use App\Models\Profile;

class ProfileController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Profile::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Profile::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Profile::rules());
        Profile::create($validated);

        return response()->noContent();
    }

    public function update(Profile $resource)
    {
        $validated = request()->validate(...Profile::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(Profile $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
