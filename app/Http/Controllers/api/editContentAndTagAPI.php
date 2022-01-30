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

        $saveName = $_POST["saveName"];
        $deleteTag = $_POST["deleteTag"];
        $addTag = $_POST["addTag"];
        $tagList = new tagList;

        $deleteTag = explode(",",$deleteTag);
        $addTag = explode(",",$addTag);

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
                    
                    $addTagIdList[] = $temp3;
                }
            }
        }
        $contentAndTag = new contentAndTag;
        $contentAndTag -> deleteConditionOfTagId($saveName,$deleteTagIdList);

        $contentAndTag -> addConditionOfTagId($saveName,$addTagIdList);
    }
}
