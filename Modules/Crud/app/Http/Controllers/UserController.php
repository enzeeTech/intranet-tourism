<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->query();
        $modelBuilder = User::queryable();

        // Handle search by name
        if ($request->has('search')) {
            $search = $request->input('search');
            $modelBuilder->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($search) . '%']);
        }

        // Handle pagination
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
