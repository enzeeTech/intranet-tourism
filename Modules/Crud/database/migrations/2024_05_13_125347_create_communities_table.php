<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommunitiesTable extends Migration
{
    public function up()
    {
        Schema::create('communities', function (Blueprint $table) {

            $table->id();
            $table->string('name')->nullable();
            $table->string('banner')->nullable();
            $table->string('description')->nullable();
            $table->string('type')->default('public')->comment('public, private');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('communities');
    }
}
