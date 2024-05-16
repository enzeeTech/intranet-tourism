<?php

namespace App\Http\Controllers;

use App\Models\Session;

class SessionController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Session::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Session::queryable()->firstOrFail(request('id')),
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

    public function delete(Session $session)
    {
        $session->delete();

        return response()->noContent();
    }
}
