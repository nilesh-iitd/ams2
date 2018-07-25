<?php

use App\Athlete;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AthletesTableSeeder extends Seeder
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
        Athlete::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $faker = \Faker\Factory::create();

        // Add 100 athletes records
        factory(Athlete::class, 100)->create();
    }
}
