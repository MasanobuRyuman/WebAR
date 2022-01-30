<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\userInfo;
use App\Models\content;
use App\Models\rotationVectorData;
use App\Models\tagList;
use App\Models\contentAndTag;
use App\Models\contentMainPhoto;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        logger("っっっっっっっk",["test"=>"tewst"]);
        session_start();
        syslog(LOG_INFO,"upload");
        $data = "出力したい文字列";
        echo '<script>';
        echo 'console.log('. json_encode( $data ) .')';
        echo '</script>';
        $objFile = $request->file('obj');
        $mtlFile = $request->file('mtl');
        $mainPhotoFile = $request->file('mainPhoto');
        logger('mainPhotoFlie',["mainphoto"=>$mainPhotoFile]);
        $selectTagData = $request->get("selectTagData");
        $contentName = $request->get('contentName');
        if (!is_null($objFile) and !is_null($mtlFile)) {
            date_default_timezone_set('Asia/Tokyo');

            $uniqName = uniqid();
            $name = $_SESSION['userName'];
            $objName = $objFile->getClientOriginalName();
            $mtlName = $mtlFile->getClientOriginalName();
            $objFileType = pathinfo($objName, PATHINFO_EXTENSION);
            $mtlFileType = pathinfo($mtlName, PATHINFO_EXTENSION);
            $objFileName = $uniqName . "." . $objFileType;
            $mtlFileName = $uniqName . "." . $mtlFileType;
            $dir = 'public';
            $mainPhotoType = pathinfo($mainPhotoFile, PATHINFO_EXTENSION);
            $uniqNameForMainPhoto = uniqid();
            $mainPhotoName = $uniqNameForMainPhoto . "." .$mainPhotoType;
            $objFile->storeAs($dir, $objFileName, ['disk' => 'local']);
            $mtlFile->storeAs($dir, $mtlFileName, ['disk' => 'local']);
            $mainPhotoFile->storeAs($dir,$mainPhotoName,['disk' => 'local']);
            $content = new content;
            if ($request->get('releaseSetting') == false)
            {
                $content->addContent($name,$contentName,$uniqName,"public");
            }else{
                $content->addContent($name,$contentName,$uniqName,"private");
            }
            $rotationVectorData = new rotationVectorData;
            $rotationVectorData->addRotationVector($uniqName);
            $tagList = new tagList;

            $tagId = $tagList -> getTagId($selectTagData);

            $tagIdList=array();
            foreach($tagId as $Id){
                foreach($Id as $tag){
                    foreach ($tag as $temp){
                        $tagIdList[]=(int)$temp;
                    }

                }
            }

            $contentAndTag = new contentAndTag;
            $contentAndTag->addContentAndTag($uniqName,$tagIdList);
            $contentMainPhoto = new contentMainPhoto;
            logger("ここまで",["dd"=>"dd"]);
            $contentMainPhoto->addSaveNameAndMainPhoto($uniqName,$mainPhotoName);
        }
    }
}
