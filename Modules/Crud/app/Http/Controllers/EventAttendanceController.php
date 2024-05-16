<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\EventAttendance;

class EventAttendanceController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => EventAttendance::queryable()->paginate(),
        ]);
    }

    public function show()
    {
        return response()->json([
            'data' => EventAttendance::where('id', request('id'))->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...EventAttendance::rules());
        EventAttendance::create($validated);

        return response()->noContent();
    }

    public function update(EventAttendance $event_attendance)
    {
        $validated = request()->validate(...EventAttendance::rules('update'));
        $event_attendance->update($validated);

        return response()->noContent();
    }

    public function delete(EventAttendance $event_attendance)
    {
        $event_attendance->delete();

        return response()->noContent();
    }
}
