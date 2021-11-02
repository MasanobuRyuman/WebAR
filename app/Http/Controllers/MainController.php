<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\content;
class MainController extends Controller
{
    public function show(){
        $content = new content;
        $userName = session('UserName','default');
        $users = $content->userContent($userName);
        echo "kita";

        return view('main', ['users' => $userName]);

    }
}
