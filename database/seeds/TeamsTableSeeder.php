<?php

use App\Team;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamsTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // first truncate the table
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Team::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Add 10 teams records
        factory(Team::class, 10)->create();
    }
}
