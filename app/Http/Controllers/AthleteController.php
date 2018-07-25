<?php

namespace App\Http\Controllers;

use App\Athlete;
use Illuminate\Http\Request;

class AthleteController extends Controller
{
    public function index()
    {
        return Athlete::all();
    }

    public function show($id)
    {
        return Athlete::find($id);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
          'name' => 'required',
          'dob' => 'required|email',
          'age' => 'required|numeric',
          'height' => 'required|numeric',
          'weight' => 'required|numeric',
        ]);

        return Athlete::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $athlete = Athlete::findOrFail($id);
        $athlete->update($request->all());

        return $athlete;
    }

    public function delete(Request $request, $id)
    {
        $athlete = Athlete::findOrFail($id);
        $athlete->delete();

        return 204;
    }
}
