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
            $table->auditable();
        });

        Schema::create('business_units', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained();
            $table->string('name')->nullable();
            $table->auditable();
        });

        Schema::create('business_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->index();
            $table->auditable();
        });

        Schema::create('business_grades', function (Blueprint $table) {
            $table->id();
            $table->string('code')->index();
            $table->auditable();
        });

        Schema::create('business_schemes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->index();
            $table->string('title');
            $table->auditable();
        });

        Schema::create('employment_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained();
            $table->foreignId('unit_id')->nullable()->constrained();
            $table->foreignId('business_post_id')->constrained();
            $table->foreignId('business_grade_id')->constrained();
            $table->foreignId('business_scheme_id')->constrained();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->auditable();
        });

        Schema::create('supervisors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('child_id')->constrained('employment_posts');
            $table->foreignId('parent_id')->constrained('employment_posts');
            $table->auditable();
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
