<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $query = request()->query();
        $modelBuilder = User::queryable();
        if (array_key_exists('disabledPagination', $query)) {
            $data = $modelBuilder->get();
        } else {
            $data = $modelBuilder->paginate();
        }
        return response()->json(['data' => $data]);
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

    // public function update(User $user)
    // {
    //     $validated = request()->validate(...User::rules('update'));
    //     $user->update($validated);

    //     return response()->noContent();
    // }
    public function update(User $user)
    {
        $validated = request()->validate(User::rules('update')[0]);
        $user->update($validated);

        return response()->noContent();
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->noContent();
    }
}
