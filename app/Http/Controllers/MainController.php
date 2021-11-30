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
        echo $userName;
        $users = $content->userContent($userName);
        echo "kita";

        return view('main', ['users' => $userName]);

    }
}
