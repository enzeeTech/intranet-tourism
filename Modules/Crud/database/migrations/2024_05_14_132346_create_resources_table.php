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
        Schema::create('resources', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained();
            $table->uuidMorphs('attachable');
            $table->string('for')->default('attachment');
            $table->string('path');
            $table->string('extension');
            $table->string('mime_type');
            $table->string('filesize');
            $table->string('duration')->nullable();
            $table->json('metadata');
            $table->auditable();
        });

        Schema::create('resource_access', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained();
            $table->foreignUuid('resource_id')->constrained();
            $table->json('ability')->default('["VIEW"]')->comment('VIEW, EDIT, DELETE, SHARE, DOWNLOAD');
            $table->auditable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
