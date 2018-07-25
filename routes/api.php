<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/

Route::middleware('auth:api')->get('/db', function (Request $request) {
    return $request->user();
});

Route::get('unathorize', function (Request $request) {
    return "You are not authorized!";
})->name('unathorize');

Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');

Route::group(['middleware' => 'auth:api'], function() {
    // Athlete: API calls
    Route::get('athletes', 'AthleteController@index');
    Route::get('athletes/{id}', 'AthleteController@show');
    Route::post('athletes', 'AthleteController@store');
    Route::put('athletes/{id}', 'AthleteController@update');
    Route::delete('athletes/{id}', 'AthleteController@delete');

    // Team: API calls
    Route::get('teams', 'TeamController@index');
    Route::get('teams/{id}', 'TeamController@show');
    Route::post('teams', 'TeamController@store');
    Route::put('teams/{id}', 'TeamController@update');
    Route::delete('teams/{id}', 'TeamController@delete');

    // Sport: API calls
    Route::get('sports', 'SportController@index');
    Route::get('sports/{id}', 'SportController@show');
    Route::post('sports', 'SportController@store');
    Route::put('sports/{id}', 'SportController@update');
    Route::delete('sports/{id}', 'SportController@delete');

    // ATS: API calls
    Route::get('ats', 'ATSController@index');
    Route::get('ats/{id}', 'ATSController@show');
    Route::post('ats', 'ATSController@store');
    Route::put('ats/{id}', 'ATSController@update');
    Route::delete('ats/{id}', 'ATSController@delete');

    // ATS List by ID: API calls
    Route::get('ats/ta/{id}', 'ATSController@showTeamByAthlete');
    Route::get('ats/ts/{id}', 'ATSController@showTeamBySport');
    Route::get('ats/at/{id}', 'ATSController@showAthleteByTeam');
    Route::get('ats/as/{id}', 'ATSController@showAthleteBySport');
    Route::get('ats/sa/{id}', 'ATSController@showSportByAthlete');
    Route::get('ats/st/{id}', 'ATSController@showSportByTeam');
});

