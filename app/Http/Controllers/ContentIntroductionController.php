<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContentIntroductionController extends Controller
{
    function show(){
        $saveName = $_GET["saveName"];
        $contentName = $_GET["contentName"];
        return view('ContentIntroduction',['saveName' => $saveName,'contentName'=>$contentName]);
    }
}
