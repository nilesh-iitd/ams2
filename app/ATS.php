<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ATS extends Model
{
    protected $fillable = [
      'dop', 'aid', 'tid', 'sid'
    ];
}
