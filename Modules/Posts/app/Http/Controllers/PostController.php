<?php

namespace Modules\Posts\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Posts\Models\Post;
use Modules\Posts\Models\PostAccessibility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Posts\Models\PostComment;
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
        request()->merge(['user_id' => Auth::id()]);
        if (request()->has('accessibilities')) {
            $accessibilities = request('accessibilities');
            foreach ($accessibilities as $accessibility) {
                $validatedAccessibilities[] = validator($accessibility, ...PostAccessibility::rules('createFromPost'))->validated();
            }
        } else {
            request()->merge(['visibility' => 'public']);
        }

        $validated = request()->validate(...Post::rules());
        $validatedAccessibilities = [];

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
        DB::beginTransaction();
        try {
            if ($post->type == 'comment') {
                PostComment::where('comment_id', $post->id)->delete();
            }
            $post->delete();
            DB::commit();
            return response()->noContent();
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        }
    }

    public function like(Post $post)
    {
        abort_unless(Auth::check(), 403);

        $post->likes = collect($post->likes)->push(Auth::id())->unique()->toArray();
        $post->save();

        return response()->noContent();
    }


    public function unlike(Post $post)
    {
        abort_unless(Auth::check(), 403);

        $post->likes = collect($post->likes)->filter(fn($id) => $id != Auth::id())->unique()->toArray();
        $post->save();

        return response()->noContent();
    }

    public function comment(Post $post)
    {
        request()->merge(['user_id' => Auth::id()]);
        request()->merge(['type' => 'comment']);
        request()->merge(['visibility' => 'public']);
        $validated = request()->validate(...Post::rules());

        $comment = Post::create($validated);
        PostComment::create([
            'post_id' => $post->id,
            'comment_id' => $comment->id,
        ]);

        return response()->noContent();
    }

    public function access(Post $post)
    {
        $validated = request()->validate(...PostAccessibility::rules());
        $post->accesssibilities()->create($validated);

        return response()->noContent();
    }
}
