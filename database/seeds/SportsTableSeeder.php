<?php

use App\Sport;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SportsTableSeeder extends Seeder
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
        Sport::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Add 5 Sports records
        factory(Sport::class, 5)->create();
    }
}
