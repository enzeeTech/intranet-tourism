<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\Migration;

class MigrationController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Migration::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Migration::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Migration::rules());
        Migration::create($validated);

        return response()->noContent();
    }

    public function update(Migration $migration)
    {
        $validated = request()->validate(...Migration::rules('update'));
        $migration->update($validated);

        return response()->noContent();
    }

    public function destroy(Migration $migration)
    {
        $migration->delete();

        return response()->noContent();
    }
}
