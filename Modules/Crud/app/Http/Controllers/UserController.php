<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => User::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => User::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...User::rules());
        User::create($validated);

        return response()->noContent();
    }

    public function update(User $user)
    {
        $validated = request()->validate(...User::rules('update'));
        $user->update($validated);

        return response()->noContent();
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->noContent();
    }
}
