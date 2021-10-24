<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\content;
class MainController extends Controller
{
    public function show(){
        $content = new content;
        $userName = session('name');
        $users = $content->userContent($userName);
        return view('main', ['users' => $users]);

    }
}
