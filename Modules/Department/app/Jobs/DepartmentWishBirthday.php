<?php

namespace Modules\Department\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Modules\Posts\Models\Post;
use Modules\Profile\Models\Profile;

class DepartmentWishBirthday implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Profile::query()->whereMonth("dob", now()->month)->whereDay("dob", now()->month)
            ->chunk(100, function ($birthdayBoy) {
                $post = Post::create([
                    "type" => "post",
                    "content" => "Happy birthday $birthdayBoy->name!",
                    "visibility" => 'department',
                    "mention" => $birthdayBoy->user->id,
                ]);

                $post->accessibilities()->attach($birthdayBoy->department);
            });
    }
}
