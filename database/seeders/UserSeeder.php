<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Modules\Crud\Models\BusinessGrade;
use Modules\Crud\Models\BusinessPost;
use Modules\Crud\Models\BusinessScheme;
use Modules\Crud\Models\BusinessUnit;
use Modules\Crud\Models\Department;
use Modules\Crud\Models\EmploymentPost;
use Modules\Crud\Models\Profile;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::findByName('admin_department');
        $userRole = Role::findByName('user');

        $admin = User::factory()->create(['email' => 'admin@enzee.com']);
        Profile::factory()->create(['user_id' => $admin->id, 'bio' => $admin->name]);
        $admin->assignRole($adminRole->name);

        if (! app()->isProduction()) {
            $user = User::factory()->create(['email' => 'test@example.com']);
            Profile::factory()->create(['user_id' => $user->id, 'bio' => $user->name]);
            $user->assignRole($userRole->name);

            User::factory(3)->create()->each(function ($user) use ($adminRole) {
                $user->assignRole($adminRole->name);
                Profile::factory()->create(['user_id' => $user->id, 'bio' => $user->name]);
            });

            User::factory(10)->create()->each(function ($user) use ($userRole) {
                $user->assignRole($userRole->name);
                Profile::factory()->create(['user_id' => $user->id, 'bio' => $user->name]);
            });
        }

        $user = User::factory()->create();
        Profile::factory()->create(['user_id' => $user->id]);

        $department = Department::factory()->create(['name' => 'Jabatan Perdana Menteri']);
        BusinessUnit::factory()->create(['name' => 'Unit Kewangan', 'department_id' => $department->id]);
        BusinessPost::factory()->create(['title' => 'Pegawai Kewangan']);
        BusinessGrade::factory()->create(['code' => '52']);
        BusinessScheme::factory()->create(['code' => 'M', 'title' => 'Skim Perhidmatan Kewangan']);
        EmploymentPost::factory()->create(['user_id' => $user->id]);
    }
}
