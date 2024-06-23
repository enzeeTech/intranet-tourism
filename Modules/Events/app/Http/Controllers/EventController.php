<?php

namespace Modules\Events\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Events\Models\Event;

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

    public function getEvents()
    {
        $events = Event::all(['id', 'title', 'start_time as start', 'end_time as end', 'color']);

        return response()->json($events);
    }

    public function handleDateSelect($request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'start' => 'required|date',
            'end' => 'required|date|after:start',
            'color' => 'required',
        ]);

        $event = new Event();
        $event->title = $validatedData['title'];
        $event->start_time = $validatedData['start'];
        $event->end_time = $validatedData['end'];
        $event->color = $validatedData['color'];
        $event->save();

        return response()->json(['success' => true, 'message' => 'Event created successfully']);
    }
}
