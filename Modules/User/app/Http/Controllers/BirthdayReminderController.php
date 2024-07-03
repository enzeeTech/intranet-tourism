<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Events\Models\Event;
use Modules\User\Models\BirthdayReminder;

class BirthdayReminderController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => BirthdayReminder::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => BirthdayReminder::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...BirthdayReminder::rules());
        BirthdayReminder::create($validated);

        return response()->noContent();
    }

    public function update(BirthdayReminder $birthday_reminder)
    {
        $validated = request()->validate(...BirthdayReminder::rules('update'));
        $birthday_reminder->update($validated);

        return response()->noContent();
    }

    public function destroy(BirthdayReminder $birthday_reminder)
    {
        $birthday_reminder->delete();

        return response()->noContent();
    }


}
