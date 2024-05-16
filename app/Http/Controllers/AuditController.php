<?php

namespace App\Http\Controllers;

use App\Models\Audit;

class AuditController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Audit::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Audit::queryable()->firstOrFail(request('id')),
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

    public function delete(Audit $audit)
    {
        $audit->delete();

        return response()->noContent();
    }
}
