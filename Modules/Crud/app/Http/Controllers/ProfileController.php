<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\Profile;

class ProfileController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Profile::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => Profile::where('id', request('id'))->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Profile::rules());
        Profile::create($validated);

        return response()->noContent();
    }

    public function update(Profile $profile)
    {
        $validated = request()->validate(...Profile::rules('update'));
        $profile->update($validated);

        return response()->noContent();
    }

    public function delete(Profile $profile)
    {
        $profile->delete();

        return response()->noContent();
    }
}
