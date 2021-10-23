<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\content;
class MainController extends Controller
{
    public function show(){
        echo "llllllll";
        $users = content::select('name')->paginate(3);
        return view('main', ['users' => $users]);

    }
}
