<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\PasswordResetToken;

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
            'data' => PasswordResetToken::where('id', request('id'))->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...PasswordResetToken::rules());
        PasswordResetToken::create($validated);

        return response()->noContent();
    }

    public function update(PasswordResetToken $password_reset_token)
    {
        $validated = request()->validate(...PasswordResetToken::rules('update'));
        $password_reset_token->update($validated);

        return response()->noContent();
    }

    public function delete(PasswordResetToken $password_reset_token)
    {
        $password_reset_token->delete();

        return response()->noContent();
    }
}
