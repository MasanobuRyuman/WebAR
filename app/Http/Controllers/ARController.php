<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ARController extends Controller
{
    function show(){
        $saveName = $_POST["saveName"];
        $contentType = $_POST["contentType"];
        logger('contentType',["contentType"=>$contentType]);
        $saveNameObj = $saveName.".obj";
        $saveNameMtl = $saveName.".mtl";
        if($contentType == "AR"){
            return view('ar',compact('saveNameObj','saveNameMtl','saveName'));
        }else if ($contentType == "Object"){
            return view('object',compact('saveNameObj','saveNameMtl','saveName'));
        }else{
            echo "contentTypeがAR,Object以外が入っている";
        }

    }
}
