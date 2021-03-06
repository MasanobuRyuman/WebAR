<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\contentPhoto;
use App\Models\content;
use App\Models\tagList;
use App\Models\contentAndTag;
class getSearchContentAPI extends Controller
{
    public function get(Request $request){

        $searchBasedTag = $request -> get("searchBasedTagList");
        logger('searchBasedTag',["searchbasedTag"=>$searchBasedTag]);
        $tagList = new TagList;
        $tagId = $tagList->getTagId($searchBasedTag);
        $tagIdList = array();
        foreach ($tagId as $temp){
            foreach($temp as $temp2){
                foreach($temp2 as $temp3){
                    $tagIdList[] = $temp3;
                }
            }
        };
        $contentAndTag = new contentAndTag;

        $saveName = $contentAndTag->getSaveName($tagIdList);
        $saveNameList = array();
        foreach($saveName as $temp){
            foreach($temp as $temp2){
                $saveNameList[] = $temp2;
            }
        }
        $content = new content;
        $conditionsPublicContent = $content->getConditionsPublicContent($saveNameList);

        return \Response::json($conditionsPublicContent);
    }
}
