<?php

namespace Modules\Polls\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Polls\Models\Option;
use Modules\Posts\Models\PostAccessibility;

class OptionController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Option::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Option::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Option::rules());
        Option::create($validated);

        return response()->noContent();
    }

    public function update(Option $option)
    {
        $validated = request()->validate(...Option::rules('update'));
        $option->update($validated);

        return response()->noContent();
    }

    public function destroy(Option $option)
    {
        $option->delete();

        return response()->noContent();
    }
}
