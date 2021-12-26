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
                $addTagIdList[] = $temp2;
            }
        }
        $contentAndTag = new contentAndTag;
        $contentAndTag -> deleteConditionOfTagId($saveName,$deleteTagIdList);
        logger("editContentAndTagApi",["test"=>"確認"]);
        $contentAndTag -> addConditionOfTagId($saveName,$addTagIdList);
    }
}
