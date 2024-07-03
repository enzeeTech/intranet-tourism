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

    public function update(ExternalLink $external_link)
    {
        $validated = request()->validate(...ExternalLink::rules('update'));
        $external_link->update($validated);

        return response()->noContent();
    }

    public function destroy(ExternalLink $external_link)
    {
        $external_link->delete();

        return response()->noContent();
    }
}
