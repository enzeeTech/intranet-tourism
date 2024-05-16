<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users');
            $table->string('type')->default('post')->comment('post,comment,announcement,poll')->index();
            $table->text('content');
            $table->string('title')->nullable();
            $table->json('tag')->nullable()->index();
            $table->string('visibility')->default('public')->comment('public, department, file')->index();
            $table->json('pool_posting')->nullable();
            $table->json('likes')->nullable();
            $table->json('mentions')->nullable();
            $table->auditable();
        });

        Schema::create('post_comments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('post_id')->constrained('posts');
            $table->foreignUuid('comment_id')->constrained('posts');
            $table->foreignId('user_id')->constrained('users');
            $table->auditable();
        });

        Schema::create('post_accessibilities', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('post_id')->constrained('posts');
            $table->morphs('accessable');
            $table->auditable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
        Schema::dropIfExists('post_comments');
    }
};

// Post

// id : 1

// Comment

// id: 1
// post_id : 1

// id: 2
// post_id : 1

// Like
// post_id : 1

// user_id : 2

// Post_Accessibility

// post_id : 1

// accessable_type: table_name

// accessable_id:table_id

// created_by : user_id
