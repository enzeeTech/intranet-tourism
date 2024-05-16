<?php

namespace Modules\Crud\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Crud\Models\Notification;

class NotificationController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Notification::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => Notification::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...Notification::rules());
        Notification::create($validated);

        return response()->noContent();
    }

    public function update(Notification $notification)
    {
        $validated = request()->validate(...Notification::rules('update'));
        $notification->update($validated);

        return response()->noContent();
    }

    public function destroy(Notification $notification)
    {
        $notification->delete();

        return response()->noContent();
    }
}
