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
        session_start();

        if ($request->get("login"))
        {
            $existence = $userInfo ->loginCheck($name,$password);
            if ($existence == 1)
            {
            

                $_SESSION['userName']=$name;
                $request->session()->put('userName',$name );

                header("location: /main");
                exit();
            }else{
                return view('login');
            }
        }else if($request->get('newLogin'))
        {
            $nameCount = $userInfo -> newLoginCheck($name);
            if ($nameCount == 0)
            {
                session(['UserName' => $name]);
                $_SESSION['username'] = $name;
                session_write_close(); // ロックを解除
                $userInfo -> loginRegister($name,$password);
                header("location: /main");
                exit();
            }else{
                return view('login');
            }
        }
    }
}
