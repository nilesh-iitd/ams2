<?php

namespace App\Http\Controllers;

use App\ATS;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $this->validate($request, [
          'dop' => 'required',
          'aid' => 'required|numeric',
          'tid' => 'required|numeric',
          'sid' => 'required|numeric',
        ]);

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

    public function showTeamByAthlete($id)
    {
        $teams = DB::select('SELECT teams.id AS id, teams.name AS name FROM a_t_s_s LEFT JOIN teams ON a_t_s_s.tid = teams.id WHERE a_t_s_s.aid = ?',
          [$id]);
        return response()->json($teams);
    }

    public function showTeamBySport($id)
    {
        $teams = DB::select('SELECT teams.id AS id, teams.name AS name FROM a_t_s_s LEFT JOIN teams ON a_t_s_s.tid = teams.id WHERE a_t_s_s.sid = ?',
          [$id]);
        return response()->json($teams);
    }

    public function showAthleteByTeam($id)
    {
        $athletes = DB::select('SELECT athletes.id AS id, athletes.name AS name FROM a_t_s_s LEFT JOIN athletes ON a_t_s_s.aid = athletes.id WHERE a_t_s_s.tid = ?',
          [$id]);
        return response()->json($athletes);
    }

    public function showAthleteBySport($id)
    {
        $athletes = DB::select('SELECT athletes.id AS id, athletes.name AS name FROM a_t_s_s LEFT JOIN athletes ON a_t_s_s.aid = athletes.id WHERE a_t_s_s.sid = ?',
          [$id]);
        return response()->json($athletes);
    }

    public function showSportByAthlete($id)
    {
        $sports = DB::select('SELECT sports.id AS id, sports.name AS name FROM a_t_s_s LEFT JOIN sports ON a_t_s_s.sid = sports.id WHERE a_t_s_s.aid = ?',
          [$id]);
        return response()->json($sports);
    }

    public function showSportByTeam($id)
    {
        $sports = DB::select('SELECT sports.id AS id, sports.name AS name FROM a_t_s_s LEFT JOIN sports ON a_t_s_s.sid = sports.id WHERE a_t_s_s.tid = ?',
          [$id]);
        return response()->json($sports);
    }

}
