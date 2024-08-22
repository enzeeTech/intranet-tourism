<?php

namespace Modules\Posts\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Posts\Models\Post;
use Modules\Posts\Models\PostAccessibility;
use Illuminate\Http\Request;
use Modules\Resources\Models\Resource;

class PostController extends Controller
{
    public function index(Request $request)
    {
        // Start with a query builder instance
        $query = Post::query();
    
        // Check if the 'filter' parameter is present
        if ($request->has('filter')) {
            // Apply the necessary filters to the query
            if (in_array('birthday', $request->input('filter'))) {
                $query->where('type', 'birthday');
            }
    
            // If filters are present, paginate the filtered query
            $data = $this->shouldPaginate($query);
        } else {
            // If no filters are present, paginate using the predefined queryable method
            $data = $this->shouldPaginate(Post::queryable());
        }
    
        return response()->json([
            'data' => $data,
        ]);
    }
    


    public function show($id)
    {
        return response()->json([
            'data' => Post::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }


    public function store(Post $post)
    {
        $validated = request()->validate(...Post::rules());
        $validatedAccessibilities = [];
        if (request()->has('accessibilities')) {
            $accessibilities = request('accessibilities');
            foreach ($accessibilities as $accessibility) {
                $validatedAccessibilities[] = validator($accessibility, ...PostAccessibility::rules('createFromPost'))->validated();
            }
        }

        DB::beginTransaction();
        try {
            $post->fill($validated)->save();
            $post->storeAttachments();
            if (request()->has('accessibilities')) {
                $post->accessibilities()->createMany($validatedAccessibilities);
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        }

        return response()->noContent();
    }

    public function update(Post $post)
    {

        $validated = request()->validate(...Post::rules('update'));
        $validated = request()->validate(...Post::rules());
        $validatedAccessibilities = [];

        if (request()->has('accessibilities')) {
            $accessibilities = request('accessibilities');
            foreach ($accessibilities as $accessibility) {
                $validatedAccessibilities[] = validator($accessibility, ...PostAccessibility::rules('createFromPost'))->validated();
            }
        }

        DB::beginTransaction();
        try {

            $post->update($validated);

            if (request()->has('attachments')) {

                // $resources = Resource::where('attachable_id', $post->id)->first();
                // $resources = Resource::where('attachable_id', $post->id)->first();
                $post->storeAttachments();
                // $resources->delete();

            }
            if (request()->has('accessibilities')) {

                $currentAccessibilities = $post->accessibilities()->get();

                foreach ($validatedAccessibilities as $validatedAccessibility) {
                    $accessibility = $currentAccessibilities->firstWhere('id', $validatedAccessibility['id'] ?? null);
                    if ($accessibility) {
                        $accessibility->update($validatedAccessibility);
                    } else {
                        $post->accessibilities()->create($validatedAccessibility);
                    }
                }

                $validatedIds = collect($validatedAccessibilities)->pluck('id')->filter()->all();

                // delete if old access does not exist in new data
                $post->accessibilities()->whereNotIn('id', $validatedIds)->delete();
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        }


        return response()->noContent();
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->noContent();
    }

    public function likePost($id)
    {
        $post = Post::findOrFail($id);

        $likesData = $post->likes ? json_decode($post->likes, true) : [];


        $likesData['likes'] = isset($likesData['likes']) ? $likesData['likes'] + 1 : 1;


        $post->likes = json_encode($likesData);

        $post->save();

        return response()->json([
            'data' => $post
        ]);
    }


    public function unlikePost($id)
    {
        $post = Post::findOrFail($id);

        $likesData = $post->likes ? json_decode($post->likes, true) : [];

        if (isset($likesData['likes']) && $likesData['likes'] > 0) {
            $likesData['likes'] -= 1;
        } else {
            $likesData['likes'] = 0;
        }

        $post->likes = json_encode($likesData);


        $post->save();

        return response()->json([
            'data' => $post
        ]);
    }
}
