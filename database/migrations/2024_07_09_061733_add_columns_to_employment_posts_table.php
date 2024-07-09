<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToEmploymentPostsTable extends Migration
{
    public function up()
    {
        Schema::table('employment_posts', function (Blueprint $table) {
            $table->string('schema_grade')->nullable();
            $table->string('title')->nullable();
            $table->string('location')->nullable();
        });
    }

    public function down()
    {
        Schema::table('employment_posts', function (Blueprint $table) {
            $table->dropColumn('schema_grade');
            $table->dropColumn('title');
            $table->dropColumn('location');
        });
    }
}
