<?php

namespace App\Http\Controllers;

use App\ATS;
use Illuminate\Http\Request;

class ATSController extends Controller
{
    public function index()
    {
        return ATS::all();
    }

    public function show($id)
    {
        return ATS::find($id);
    }

    public function store(Request $request)
    {
        return ATS::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $sport = ATS::findOrFail($id);
        $sport->update($request->all());

        return $sport;
    }

    public function delete(Request $request, $id)
    {
        $sport = ATS::findOrFail($id);
        $sport->delete();

        return 204;
    }
}
