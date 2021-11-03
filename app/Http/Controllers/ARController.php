<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ARController extends Controller
{
    function show(){
        $saveName = $_POST["saveName"];
        
        return view('ar',compact('saveName'));
    }
}
