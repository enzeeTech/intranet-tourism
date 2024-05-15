<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('banner')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Schema::create('ranks', function (Blueprint $table) {
            $table->id();
            $table->string('title')->index();
            $table->timestamps();
        });

        Schema::create('grades', function (Blueprint $table) {
            $table->id();
            $table->string('code')->index();
            $table->timestamps();
        });

        Schema::create('schemes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->index();
            $table->string('title');
            $table->timestamps();
        });

        Schema::create('employment_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained();
            $table->foreignId('rank_id')->constrained();
            $table->foreignId('grade_id')->constrained();
            $table->foreignId('scheme_id')->constrained();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->timestamps();
        });

    }

    public function down()
    {
        Schema::dropIfExists('departments');
    }
};
// Post_Accessibility

// post_id : 1

// accessable_type: table_name

// accessable_id:table_id

// created_by : user_id
