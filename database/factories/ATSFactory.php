<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Athlete Factory
|--------------------------------------------------------------------------
| Generate seeds data for Athletes
|
*/

$factory->define(App\ATS::class, function (Faker $faker) {
    return [
      'dop' => $faker->unique()->date(),
      'aid' => $faker->numberBetween(1, 100),
      'tid' => $faker->numberBetween(1, 10),
      'sid' => $faker->numberBetween(1, 2),
    ];
});
