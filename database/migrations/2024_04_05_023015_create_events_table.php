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
        // In your migration file (e.g., create_events_table.php)
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->datetime('start_time');
            $table->datetime('end_time');
            $table->string('color');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
