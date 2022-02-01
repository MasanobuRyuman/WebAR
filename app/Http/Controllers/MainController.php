<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\content;
class MainController extends Controller
{
    public function show(){
        session_start();
        $content = new content;
        $userName = $_SESSION['userName'];
        $users = $content->userContent($userName);
        return view('main', ['users' => $userName]);

    }
}
