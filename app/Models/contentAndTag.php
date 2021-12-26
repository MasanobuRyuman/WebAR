<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class contentAndTag extends Model
{
    use HasFactory;
    public function addContentAndTag($saveName,$tagList)
    {
        $insertData = [];
        foreach($tagList as $tag){
            $insertData[]=["saveName" => $saveName,"tagId" => $tag];
        }
        DB::table('contentAndTag')->insert($insertData);
    }

    public function getSaveName($tagId)
    {
        $saveNameList = DB::table('contentAndTag')->select("saveName")->whereIn("tagId",$tagId)->get();
        return $saveNameList ;
    }

    public function getTagId($saveName)
    {
        $tagIdList = DB::table('contentAndTag')->select("tagId")->where('saveName',$saveName)->get();
        logger("getTagId",["getTagId"=>$tagIdList]);
        return $tagIdList;
    }

    public function getManyTagId($saveNameList)
    {
        $tagIdList = array();
        foreach($saveNameList as $saveName){
            $tagId = DB::table("contentAndTag")->select("tagId")->where('saveName',$saveName)->get();
            $tagIdList[]=[$tagId];
        }
        return $tagIdList;
    }

    public function deleteConditionOfTagId($saveName,$tagIdList)
    {
        DB::table("contentAndTag")->where("saveName",$saveName)->whereIn("tagId",$tagIdList)->delete();
    }

    public function addConditionOfTagId($saveName,$tagIdList)
    {
        logger("addConditionOfTagId",["hiatta"=>"hitta"]);
        logger("addConditionOfTagId",["saveName"=>$saveName]);
        logger("addContentonOfTagId",["tagIdList"=>$tagIdList]);
        foreach($tagIdList as $tagId){
            DB::table("contentAndTag")->insert(["saveName"=>$saveName,"tagId"=>$tagId]);
        }
    }

}
