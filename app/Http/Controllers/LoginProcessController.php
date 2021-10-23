<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\userInfo;
use App\Models\content;


class LoginProcessController extends Controller
{
    function show(Request $request){
        $name = $request->input("name");
        $password = $request->input("password");
        $userInfo = new userInfo;

        if ($request->get("login"))
        {
            $existence = $userInfo ->loginCheck($name,$password);
            if ($existence == 1)
            {
                return view('main');
            }else{
                return view('login');
            }
        }else if($request->get('newLogin'))
        {
            $nameCount = $userInfo -> newLoginCheck($name);
            if ($nameCount == 0)
            {
                $userInfo -> loginRegister($name,$password);
                $items = userInfo::all();
                
                return view('main');
            }else{
                return view('login');
            }
        }
        echo "koooo";
    }
}
