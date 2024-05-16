<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\Setting;

class SettingController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Setting::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Setting::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Setting::rules());
        Setting::create($validated);

        return response()->noContent();
    }

    public function update(Setting $setting)
    {
        $validated = request()->validate(...Setting::rules('update'));
        $setting->update($validated);

        return response()->noContent();
    }

    public function destroy(Setting $setting)
    {
        $setting->delete();

        return response()->noContent();
    }
}
