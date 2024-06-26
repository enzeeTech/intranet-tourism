<?php

namespace Modules\Polls\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Polls\Models\Response;

class ResponseController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Response::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Response::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Response::rules());
        Response::create($validated);

        return response()->noContent();
    }

    public function update(Response $response)
    {
        $validated = request()->validate(...Response::rules('update'));
        $response->update($validated);

        return response()->noContent();
    }

    public function destroy(Response $response)
    {
        $response->delete();

        return response()->noContent();
    }
}
