<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        return Inertia::render('Notification');
    }

    public function index_unread()
    {
        return Inertia::render('Notification_unread');
    }
    public function testing()
    {
        return Inertia::render('Noti-popup-test');
    }
}
