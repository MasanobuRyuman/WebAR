<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ARController extends Controller
{
    function show(){
        $saveName = $_POST["saveName"];
        $saveNameObj = $saveName.".obj";
        $saveNameMtl = $saveName.".mtl";
        return view('ar',compact('saveNameObj','saveNameMtl'));
    }
}
