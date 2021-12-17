<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\contentPhoto;
use App\Models\contentAndTag;
use App\Models\tagList;
class getSaveNameRelationTagNameAPI extends Controller
{
    public function get(){
        $saveName = $_POST['saveName'];
        $contentAndTag = new contentAndTag;
        $tagId = $contentAndTag -> getTagId($saveName);
        $tagIdList = [];
        foreach($tagId as $temp){
            foreach($temp as $temp2){
                $tagIdList[] = $temp2;
            }
        }
        $tagList = new tagList;
        $tagName = $tagList -> getConditionsTagName($tagIdList);
        $tagNameList = [];
        foreach($tagName as $temp){
            foreach($temp as $temp2){
                $tagNameList[] = $temp2;
            }
        }

        $array = array(
            "tagNameList" => $tagNameList,
        );
        $json = json_encode($array);
        return $json;

    }
}
