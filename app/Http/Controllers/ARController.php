<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ARController extends Controller
{
    function show(){
        $saveName = $_POST["saveName"];
        $saveNameType = $saveName.".obj";

        return view('ar',compact('saveNameType'));
    }
}
