<?php

namespace App\Models\Traits;

use Modules\Resources\Models\Resource;

trait Attachable
{

    public function attachment()
    {
        return $this->morphOne(Resource::class, 'attachable')->latestOfMany();
    }

    public function attachments()
    {
        return $this->morphMany(Resource::class, 'attachable');
    }

    public function storeAttachments($for = 'attachment')
    {
        if ($resources = request()->file('attachments')) {
            foreach ($resources as $resource) {
                $resourceRef = uploadFile($resource);
                $this->attachments()->create(array_merge($resourceRef, [
                    'user_id' => auth()->id() ?? '1',
                    'for' => $for,
                    'metadata' => $resourceRef
                    // 'duration' => '1',
                ]));
            }
        }
    }
}
