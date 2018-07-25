<?php

use App\ATS;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ATSTableSeeder extends Seeder
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
        ATS::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $faker = \Faker\Factory::create();

        // Add 100 athlete-team-sport relationship records
        factory(ATS::class, 100)->create();
    }
}
