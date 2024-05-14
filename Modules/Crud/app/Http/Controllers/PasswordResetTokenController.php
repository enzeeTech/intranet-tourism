<?php

namespace App\Http\Controllers;

use App\Models\PasswordResetToken;

class PasswordResetTokenController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => PasswordResetToken::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => PasswordResetToken::queryable()->firstOrFail(request('id')),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...PasswordResetToken::rules());
        PasswordResetToken::create($validated);

        return response()->noContent();
    }

    public function update(PasswordResetToken $resource)
    {
        $validated = request()->validate(...PasswordResetToken::rules('update'));
        $resource->update($validated);

        return response()->noContent();
    }

    public function delete(PasswordResetToken $resource)
    {
        $resource->delete();

        return response()->noContent();
    }
}
