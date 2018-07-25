<?php

namespace App\Http\Controllers;

use App\Sport;
use Illuminate\Http\Request;

class SportController extends Controller
{
    public function index()
    {
        return Sport::all();
    }

    public function show($id)
    {
        return Sport::find($id);
    }

    public function store(Request $request)
    {
        return Sport::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $sport = Sport::findOrFail($id);
        $sport->update($request->all());

        return $sport;
    }

    public function delete(Request $request, $id)
    {
        $sport = Sport::findOrFail($id);
        $sport->delete();

        return 204;
    }
}
