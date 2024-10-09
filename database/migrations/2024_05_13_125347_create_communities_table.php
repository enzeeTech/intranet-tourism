<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('communities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('banner')->nullable();
            $table->string('description')->nullable();
            $table->string('type')->nullable()->default('public')->comment('public, private')->index();
            $table->auditable();
        });

        Schema::create('community_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('community_id')->constrained();
            $table->string('role')->nullable()->default('MEMBER')->comment('MEMBER, MODERATOR, ADMIN, OWNER');
            $table->auditable();
        });

    }

    public function down()
    {
        Schema::dropIfExists('communities');
    }
};
