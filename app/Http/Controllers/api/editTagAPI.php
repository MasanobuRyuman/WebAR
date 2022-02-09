<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\contentPhoto;
use App\Models\tagList;
use App\Models\contentAndTag;
class editTagAPI extends Controller
{
    function edit(Request $request){
        $selectedTagList = $_POST['selectedTagList'];
        $saveName = $_POST["saveName"];
        logger("選択されたtagu",["選択されたタグ"=>$selectedTagList]);
        $tagList = new tagList;
        $tagID = $tagList->gettagId($selectedTagList);
        $tagIDList = array();
        foreach($tagID as $temp){
            foreach($temp as $temp2){
                foreach($temp2 as $temp3){
                    $tagIDList[]=$temp3;
                }
            }
        }
        logger("選択されたタグID",["選択されたタグID"=>$tagIDList]);
        $contentAndTag = new contentAndTag;
        $contentAndTag->allDeleteTagDataBySaveName($saveName);
        $contentAndTag->addConditionOfTagId($saveName,$tagIDList);

    }
}
