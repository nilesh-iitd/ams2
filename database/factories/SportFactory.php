<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Sport Factory
|--------------------------------------------------------------------------
| Generate seeds data for Sports
|
*/

$factory->define(App\Sport::class, function (Faker $faker) {
    return [
      'name' => $faker->domainName
    ];
});
