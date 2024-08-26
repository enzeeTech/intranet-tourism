<?php

namespace Modules\Communities\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Modules\Communities\Models\Community;

class CommunityController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Community::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Community::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {

        $validated = request()->validate(...Community::rules());
        Community::create($validated);

        return response()->noContent();
    }

    public function update(Community $community)
    {
        $validated = request()->validate(...Community::rules('update'));
        $community->update($validated);

        return response()->noContent();
    }

    public function destroy(Community $community)
    {
        $community->delete();

        return response()->noContent();
    }

    public function addMember(Community $community)
    {
        request()->validate(Community::rules('addMember'));
        $user = User::findOrFail(request()->user_id);
        $community->members()->attach($user);

        return response()->noContent();
    }

    public function deleteMember(Community $community)
    {

        request()->validate(Community::rules('addMember'));

        $user = User::findOrFail(request()->user_id);

        $community->members()->detach($user->id);

        return response()->noContent();
    }
}
