<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->text('bio')->nullable();
            $table->string('profile_picture')->nullable();
            $table->string('phone_no')->nullable();
            $table->string('office_no')->nullable();
            $table->string('cover_photo')->nullable();
            $table->string('job_title')->nullable();
            // $table->foreignId('position_id')->constrained('positions');
            // $table->foreignId('grade_id')->constrained('grades');
            $table->date('date_of_birth')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('profiles');
    }
}
