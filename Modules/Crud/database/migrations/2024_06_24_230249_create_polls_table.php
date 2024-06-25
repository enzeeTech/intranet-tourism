<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('polls', function (Blueprint $table) {
            $table->id('poll_id');
            $table->foreignId('user_id')->constrained('users');
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('expires_at')->nullable();
        });


        Schema::create('questions', function (Blueprint $table) {
            $table->id('question_id');
            $table->foreignId('poll_id')->constrained('polls');
            $table->text('question_text');
            $table->string('question_type', 50)->nullable();
        });


        Schema::create('options', function (Blueprint $table) {
            $table->id('option_id');
            $table->foreignId('question_id')->constrained('questions');
            $table->text('option_text');
        });

        Schema::create('responses', function (Blueprint $table) {
            $table->id('response_id');
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('poll_id')->constrained('polls');
            $table->foreignId('question_id')->constrained('questions');
            $table->timestamp('response_date')->default(DB::raw('CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('polls');
    }
};
