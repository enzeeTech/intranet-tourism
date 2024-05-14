<?php

namespace App\Http\Controllers;

use App\Models\Setting;

class SettingController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Setting::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Setting::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Setting::rules());
        Setting::create($validated);

        return response()->noContent();
    }

    public function update(Setting $resource)
    {
        $validated = request()->validate(...Setting::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(Setting $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
