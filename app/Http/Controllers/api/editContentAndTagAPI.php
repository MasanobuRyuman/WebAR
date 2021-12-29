<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\tagList;
use App\Models\contentAndTag;

class editContentAndTagAPI extends Controller
{
    public function edit(){
        logger('test', ['foo' => 'editAPI']);
        logger("hitttttttttttttta",["hitttttttttttttta"=>'hitttttttttttttta']);
        $saveName = $_POST["saveName"];
        $deleteTag = $_POST["deleteTag"];
        $addTag = $_POST["addTag"];
        $tagList = new tagList;
        logger("deleteTag",["deleteTag"=>$deleteTag]);
        logger("addTag",["addTag"=>$addTag]);
        $deleteTag = explode(",",$deleteTag);
        $addTag = explode(",",$addTag);
        logger("listAddTag",["listAddTag"=>$addTag]);
        $deleteTagId = $tagList->getTagId($deleteTag);
        $addTagId = $tagList -> getTagId($addTag);
        $deleteTagIdList = array();
        foreach($deleteTagId as $temp){
            foreach($temp as $temp2){
                $deleteTagIdList[] = $temp2;
            }
        }

        $addTagIdList = array();
        foreach($addTagId as $temp){
            foreach($temp as $temp2){
                foreach($temp2 as $temp3){
                    logger("INaddTagIdList",["InaddTagIdList"=>$temp3]);
                    $addTagIdList[] = $temp3;
                }
            }
        }
        $contentAndTag = new contentAndTag;
        $contentAndTag -> deleteConditionOfTagId($saveName,$deleteTagIdList);
        logger("editContentAndTagApi",["test"=>"確認"]);
        logger("addTagList",["addTagList"=>$addTagIdList]);
        $contentAndTag -> addConditionOfTagId($saveName,$addTagIdList);
    }
}
