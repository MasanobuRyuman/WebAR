<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\content;
use App\Models\contentAndTag;
use App\Models\tagList;
class getUserContentByTagAPI extends Controller
{
    public function get(){
        $searchBasedTag = $_POST["searchBasedTagList"];
        $userName = $_POST["userName"];

        $tagList = new tagList;
        $tagId = $tagList->getTagId($searchBasedTag);
        $tagIdList = array();
        foreach ($tagId as $temp){
            foreach($temp as $temp2){
                foreach($temp2 as $temp3){
                    $tagIdList[] = $temp3;
                }
            }
        };
        $content = new content;
        $conditionalUserContent = $content ->getContentByUserNameAndTag($userName,$tagIdList);
        return \Response::json($conditionalUserContent);
    }
}
