<?php

namespace Modules\Communities\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Communities\Models\CommunityMember;
use Illuminate\Http\Request;

class CommunityMemberController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('user_id')) {
            $userId = $request->query('user_id');

            $communityMembers = CommunityMember::where('user_id', $userId)->get();

            return response()->json($communityMembers);
        }

        $communityMembers = CommunityMember::all();
        return response()->json($communityMembers);
    }

    public function show($id)
    {
        return response()->json([
            'data' => CommunityMember::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...CommunityMember::rules());
        CommunityMember::create($validated);

        return response()->noContent();
    }

    public function update(CommunityMember $community_member)
    {
        $validated = request()->validate(...CommunityMember::rules('update'));
        $community_member->update($validated);

        return response()->noContent();
    }

    public function destroy(CommunityMember $community_member)
    {
        $community_member->delete();

        return response()->noContent();
    }
}
