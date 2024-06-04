<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\Session;

class SessionController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Session::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Session::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Session::rules());
        Session::create($validated);

        return response()->noContent();
    }

    public function update(Session $session)
    {
        $validated = request()->validate(...Session::rules('update'));
        $session->update($validated);

        return response()->noContent();
    }

    public function destroy(Session $session)
    {
        $session->delete();

        return response()->noContent();
    }
}
