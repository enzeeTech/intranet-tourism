<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\Audit;

class AuditController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Audit::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Audit::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Audit::rules());
        Audit::create($validated);

        return response()->noContent();
    }

    public function update(Audit $audit)
    {
        $validated = request()->validate(...Audit::rules('update'));
        $audit->update($validated);

        return response()->noContent();
    }

    public function destroy(Audit $audit)
    {
        $audit->delete();

        return response()->noContent();
    }
}
