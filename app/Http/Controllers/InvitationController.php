<?php

namespace App\Http\Controllers;

use App\Models\Invitation;

class InvitationController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Invitation::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Invitation::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Invitation::rules());
        Invitation::create($validated);

        return response()->noContent();
    }

    public function update(Invitation $invitation)
    {
        $validated = request()->validate(...Invitation::rules('update'));
        $invitation->update($validated);

        return response()->noContent();
    }

    public function delete(Invitation $invitation)
    {
        $invitation->delete();

        return response()->noContent();
    }
}
