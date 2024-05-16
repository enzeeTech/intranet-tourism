<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\Event;

class EventController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Event::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Event::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Event::rules());
        Event::create($validated);

        return response()->noContent();
    }

    public function update(Event $event)
    {
        $validated = request()->validate(...Event::rules('update'));
        $event->update($validated);

        return response()->noContent();
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return response()->noContent();
    }
}
