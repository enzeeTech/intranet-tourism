<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('group')->default('GENERAL')->comment('GENERAL');
            $table->string('key');
            $table->string('value');
            $table->auditable();
        });

        Schema::create('preference_schemas', function (Blueprint $table) {
            $table->id();
            $table->morphs('preferencable');
            $table->string('group_name')->default('GENERAL')->comment('GENERAL');
            $table->string('subgroup_name')->nullable();
            $table->string('item');
            $table->string('value_type')->default('string')->comment('string', 'switch');
            $table->auditable();
        });

        Schema::create('user_preferences', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained();
            $table->string('group')->default('GENERAL')->comment('GENERAL');
            $table->string('subgroup')->nullable();
            $table->string('key');
            $table->string('value');
            $table->auditable();
        });

        Schema::create('department_preferences', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('department_id')->constrained();
            $table->string('group')->default('GENERAL')->comment('GENERAL');
            $table->string('subgroup')->nullable();
            $table->string('key');
            $table->string('value');
            $table->auditable();
        });

        Schema::create('community_preferences', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('community_id')->constrained();
            $table->string('group')->default('GENERAL')->comment('GENERAL');
            $table->string('subgroup')->nullable();
            $table->string('key');
            $table->string('value');
            $table->auditable();
        });

    }

    public function down()
    {
        Schema::dropIfExists('settings');
    }
};
