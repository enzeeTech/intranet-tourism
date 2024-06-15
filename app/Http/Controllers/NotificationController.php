<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        return Inertia::render('Notification', ['id' => auth()->id()]);
    }

    public function index_unread()
    {
        return Inertia::render('Notification_unread', ['id' => auth()->id()]);
    }

    public function testing()
    {
        return Inertia::render('Noti-popup-test', ['id' => auth()->id()]);
    }
}
