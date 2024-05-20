<?php

namespace App\Models\Traits;

use Modules\Crud\Models\Resource;

trait Attachable
{

    public function attachments()
    {
        return $this->morphOne(Resource::class, 'attachable');
    }

    public function storeAttachments($for)
    {
        if ($resources = request()->file('attachments')) {
            foreach ($resources as $resource) {
                $resourceRef = uploadFile($resource);
                $this->resources()->create(array_merge($resourceRef, [
                    'user_id' => auth()->id(),
                    'for' => $for,
                    'metadata' => json_encode($resourceRef)
                    // 'duration' => '1',
                ]));
            }
        }
    }
}
