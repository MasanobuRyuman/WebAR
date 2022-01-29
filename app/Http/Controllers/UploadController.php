<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\userInfo;
use App\Models\content;
use App\Models\rotationVectorData;
use App\Models\tagList;
use App\Models\contentAndTag;

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
        $mainPhotoFile = $request->file('mainFile');
        logger('objFile',['foo' => $objFile]);
        logger('mtlFile',['foo' => $mtlFile]);
        $selectTagData = $request->get("selectTagData");
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
            $mainPhotoType = pathinfo($mainPhotoFlie, PATHINFO_EXTENSION);
            $uniqNameForMainPhoto = uniqid();
            $mainPhotoName = $uniqNameForMainPhoto . "." .$mainPhotoType;
            $objFile->storeAs($dir, $objFileName, ['disk' => 'local']);
            $mtlFile->storeAs($dir, $mtlFileName, ['disk' => 'local']);
            $mainPhotoFile->storeAs($dir,$mainPhotoName,['disk' => 'local']);
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
            $tagList = new tagList;

            $tagId = $tagList -> getTagId($selectTagData);

            logger("タグIDリスト",["list" => $tagId]);
            $tagIdList=array();
            foreach($tagId as $Id){
                foreach($Id as $tag){
                    foreach ($tag as $temp){
                        logger("きた",["kkk" => $temp]);
                        $tagIdList[]=(int)$temp;
                    }

                }
            }

            logger("taguIDrisuto",["list" => $tagIdList]);
            $contentAndTag = new contentAndTag;
            $contentAndTag->addContentAndTag($uniqName,$tagIdList);

        }
    }
}
