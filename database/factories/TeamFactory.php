<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Team Factory
|--------------------------------------------------------------------------
| Generate seeds data for Teams
|
*/

$factory->define(App\Team::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->name,
        'logo' => $faker->url
    ];
});
