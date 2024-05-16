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

    public function show()
    {
        return response()->json([
            'data' => Migration::where('id', request('id'))->queryable()->firstOrFail(),
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

    public function delete(Migration $migration)
    {
        $migration->delete();

        return response()->noContent();
    }
}
