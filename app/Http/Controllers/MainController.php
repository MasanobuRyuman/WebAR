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
        foreach ($users as $user){
            print_r($user);
            print_r($user->contentName);
        }

        return view('main', ['users' => $users]);

    }
}
