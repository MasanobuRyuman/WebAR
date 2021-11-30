<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\userInfo;
use App\Models\content;
use App\Models\rotationVectorData;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        session_start();
        syslog(LOG_INFO,"upload");
        $data = "出力したい文字列";
        logger('test', ['foo' => $data]);
        echo '<script>';
        echo 'console.log('. json_encode( $data ) .')';
        echo '</script>';
        $objFile = $request->file('obj');
        $mtlFile = $request->file('mtl');
        logger('objFile',['foo' => $objFile]);
        logger('mtlFile',['foo' => $mtlFile]);
        $contentName = $request->get('contentName');
        if (!is_null($objFile) and !is_null($mtlFile)) {
            date_default_timezone_set('Asia/Tokyo');
            logger("入ったか確認",['foo' => 'haitta']);
            logger("コンテント名",['foo' => $contentName]);
            $uniqName = uniqid();
            $name = $_SESSION['userName'];
            $objName = $objFile->getClientOriginalName();
            $mtlName = $mtlFile->getClientOriginalName();
            $objFileType = pathinfo($objName, PATHINFO_EXTENSION);
            $mtlFileType = pathinfo($mtlName, PATHINFO_EXTENSION);
            $objFileName = $uniqName . "." . $objFileType;
            $mtlFileName = $uniqName . "." . $mtlFileType;
            $dir = 'public';
            $objFile->storeAs($dir, $objFileName, ['disk' => 'local']);
            $mtlFile->storeAs($dir, $mtlFileName, ['disk' => 'local']);
            $content = new content;
            if ($request->get('releaseSetting') == false)
            {
                logger("入ったか確認",['foo' => 'false']);
                $content->addContent($name,$contentName,$uniqName,"public");
            }else{
                logger("入ったか確認",['foo' => 'haitta']);
                $content->addContent($name,$contentName,$uniqName,"private");
                logger("入ったか確認",['foo' => 'haitta']);
            }
            $rotationVectorData = new rotationVectorData;
            $rotationVectorData->addRotationVector($uniqName);
        }
    }
}
