<?php

namespace Modules\Department\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Modules\Department\Models\EmploymentPost;
use Illuminate\Http\Request;
use Modules\Department\Models\Supervisor;

class EmploymentPostController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('department_id')) {
            $departmentId = $request->get('department_id');
            $members = EmploymentPost::where('employment_posts.department_id', $departmentId)
                ->join('users', 'employment_posts.user_id', '=', 'users.id')
                ->join('profiles', 'users.id', '=', 'profiles.user_id')
                ->join('business_posts', 'employment_posts.business_post_id', '=', 'business_posts.id')
                ->join('business_units', 'employment_posts.business_unit_id', '=', 'business_units.id')
                ->join('departments', 'employment_posts.department_id', '=', 'departments.id')
                ->join('business_grades', 'employment_posts.business_grade_id', '=', 'business_grades.id')
                ->leftJoin('supervisors', 'supervisors.child_id', '=', 'employment_posts.id')
                ->select(
                    'users.id as user_id',
                    'employment_posts.id as employment_post_id',
                    'employment_posts.is_hod',
                    'employment_posts.is_assistance',
                    'employment_posts.order',
                    'departments.id as department_id',
                    'departments.name as department_name',
                    'business_units.id as unit_id',
                    'business_units.name as unit_name',
                    'business_posts.title as business_post_title',
                    'business_grades.code as business_grade',
                    'users.is_active',
                    'profiles.bio as name',
                    'profiles.staff_image',
                    'employment_posts.work_phone',
                    'profiles.phone_no',
                    'users.email',
                    'supervisors.parent_id',
                )
                ->get()
                ->map(function ($member) {
                    if (is_null($member->image)) {
                        $member->image = '/assets/dummyStaffPlaceHolder.jpg';
                    }
                    return $member;
                });

            return response()->json([
                'members' => $members,
            ]);
        }

        return response()->json([
            'data' => EmploymentPost::queryable()->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => EmploymentPost::where('id', $id)->queryable()->firstOrFail(),
        ]);
    }

    public function store()
    {
        $validated = request()->validate(...EmploymentPost::rules());
        EmploymentPost::create($validated);

        return response()->noContent();
    }

    public function update(EmploymentPost $employment_post)
    {
        $validated = request()->validate(...EmploymentPost::rules('update'));
        $employment_post->update($validated);
        if (request()->has('report_to')) {
            $user = User::whereKey(request('report_to'))
                ->has('employmentPost')
                ->firstOrFail();
            if (!$employment_post->supervisor()->exists()) {
                $employment_post->supervisor()->create([
                    'parent_id' => $user->employmentPost->id,
                ]);
            } else {
                $employment_post->supervisor->update([
                    'parent_id' => $user->employmentPost->id,
                ]);
            }
        }
        return response()->noContent();
    }


    public function destroy(EmploymentPost $employment_post)
    {
        $employment_post->delete();

        return response()->noContent();
    }
}
