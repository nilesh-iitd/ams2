<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Athlete extends Model
{
    protected $fillable = [
      'name', 'dob', 'age', 'height', 'weight'
    ];
}
