<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\contentPhoto;
use App\Models\content;
use App\Models\contentAndTag;
use App\Models\tagList;
class contentInfoAPI extends Controller
{
    public function search(){
        $saveName = $_POST['saveName'];
        $contentInfo = new contentInfo;
        $contentPhoto = new contentPhoto;
        $info = $contentInfo -> getContentInfo($saveName);
        $photo = $contentPhoto -> getContentPhoto($saveName);
        $infoData = "";
        $photoData = "";
        if ($info != ""){
            foreach ($info as $temp){
                $infoData = $temp;
            };
        }
        $photoData = array();
        if ($photo != ""){
            foreach ($photo as $temp){
                foreach($temp as $temp2){
                    $photoData[] = $temp2;
                }
            };
        }

        $contentAndTag = new contentAndTag;
        $tagId = $contentAndTag -> getTagId($saveName);

        $tagIdList = array();
        if ($tagId != ""){
            foreach($tagId as $temp){
                foreach($temp as $temp2){
                    $tagIdList[]=$temp2;
                }
            }
        }

        $tagList = new tagList;
        $tagName = $tagList -> getConditionsTagName($tagIdList);
    
        $tagNameList = array();
        if ($tagName !=""){
            foreach ($tagName as $temp){
                foreach ($temp as $temp2){
                    $tagNameList[] = $temp2;
                }
            }
        }
        $array = array(
            "contentInfo" => $infoData,
            "contentPhoto" => $photoData,
            "tagNameList" => $tagNameList,
        );
        $json = json_encode($array);
        return $json;
    }
}
