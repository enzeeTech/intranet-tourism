<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request; // Don't forget to import the Event model
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        $events = Event::all(['id', 'title', 'start_time as start', 'end_time as end', 'color']);

        return Inertia::render('Calendar', ['events' => $events]);
    }

    public function getEvents()
    {
        $events = Event::all(['id', 'title', 'start_time as start', 'end_time as end', 'color']);

        return response()->json($events);
    }

    public function handleDateSelect(Request $request)
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
