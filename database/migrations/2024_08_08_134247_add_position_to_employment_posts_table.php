<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        // Check if the enum type exists before creating it
        $enumExists = DB::select("SELECT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'employment_position')");
        if (!$enumExists[0]->exists) {
            DB::statement("CREATE TYPE employment_position AS ENUM ('Tetap', 'Kontrak', 'MySTEP')");
        }

        // Add the new column to the employment_posts table
        Schema::table('employment_posts', function (Blueprint $table) {
            $table->enum('position', ['Tetap', 'Kontrak', 'MySTEP'])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove the column
        Schema::table('employment_posts', function (Blueprint $table) {
            $table->dropColumn('position');
        });

        // Drop the enum type if it exists
        $enumExists = DB::select("SELECT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'employment_position')");
        if ($enumExists[0]->exists) {
            DB::statement("DROP TYPE employment_position");
        }
    }
};
