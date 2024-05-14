<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostingsTable extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('title')->nullable();
            $table->text('content')->nullable();
            $table->json('tag')->nullable();
            $table->string('visibility')->default('public')->comment('public, department, file');
            $table->json('pool_posting')->nullable();
            $table->json('mention')->nullable();
            $table->dateTime('create_date');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
}

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
