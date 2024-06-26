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
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users');
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->auditable();

        });


        Schema::create('questions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('poll_id')->constrained('polls');
            $table->text('question_text');
            $table->string('question_type', 50)->nullable();
            $table->auditable();

        });


        Schema::create('options', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('question_id')->constrained('questions');
            $table->text('option_text');
            $table->auditable();

        });

        Schema::create('responses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignUuid('poll_id')->constrained('polls');
            $table->foreignUuid('question_id')->constrained('questions');
            $table->foreignUuid('option_id')->constrained('options');
            $table->timestamp('response_date')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->auditable();

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
