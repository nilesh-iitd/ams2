<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateATSSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('a_t_s_s', function (Blueprint $table) {
            $table->increments('id');
            $table->date('dop');
            $table->integer('aid',false,true);
            $table->integer('tid',false,true);
            $table->integer('sid',false,true);
            $table->timestamps();
            $table->foreign('aid')->references('id')->on('athletes')
              ->onUpdate('cascade')
              ->onDelete('cascade');
            $table->foreign('tid')->references('id')->on('teams')
              ->onUpdate('cascade')
              ->onDelete('cascade');
            $table->foreign('sid')->references('id')->on('sports')
              ->onUpdate('cascade')
              ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('a_t_s_s');
    }
}
