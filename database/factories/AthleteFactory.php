<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Athlete Factory
|--------------------------------------------------------------------------
| Generate seeds data for Athletes
|
*/

$factory->define(App\Athlete::class, function (Faker $faker) {
    return [
      'name' => $faker->name,
      'dob' => $faker->unique()->date(),
      'age' => $faker->numberBetween(5, 100),
      'height' => $faker->numberBetween(4, 7) + $faker->randomFloat(2, 0, 9),
      'weight' => $faker->numberBetween(4, 7) + $faker->randomFloat(2, 0, 9),
    ];
});
