<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserOnline implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $key = 'onlineUsers';
    /**
     * Create a new event instance.
     */
    public function __construct(public Authenticatable $user, public $isOnline = true)
    {
        // cache()->forget($this->key);
        $users = collect(cache()->get($this->key, []));

        if ($isOnline) {
            $users->push($user->toArray());
            cache()->set($this->key, $users->unique());
        } else {
            cache()->set(
                $this->key,
                $users->filter(fn ($onlineUser) => $onlineUser['id'] != $user['id'])->unique()
            );
        }
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('online-users'),
        ];
    }

    public function broadcastWith()
    {
        return ['users' => cache()->get($this->key), 'isOnline' => $this->isOnline];
    }
}
