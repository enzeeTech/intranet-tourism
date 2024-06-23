<?php

namespace Modules\Settings\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Settings\Models\ExternalLink;

class ExternalLinkController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => ExternalLink::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => ExternalLink::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...ExternalLink::rules());
        ExternalLink::create($validated);

        return response()->noContent();
    }

    public function update(ExternalLink $business_grade)
    {
        $validated = request()->validate(...ExternalLink::rules('update'));
        $business_grade->update($validated);

        return response()->noContent();
    }

    public function destroy(ExternalLink $business_grade)
    {
        $business_grade->delete();

        return response()->noContent();
    }
}
