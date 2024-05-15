<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('post_accessibilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->on('postings');
            $table->morphs('accesable_type');
            $table->string('accessable_id');
            $table->foreignId('created_by')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_accessibilities');
    }
};
