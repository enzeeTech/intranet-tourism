<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\CommunityMember;

class CommunityMemberController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => CommunityMember::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => CommunityMember::where('id', request('id'))->queryable()->firstOrFail(),
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

    public function delete(CommunityMember $community_member)
    {
        $community_member->delete();

        return response()->noContent();
    }
}
