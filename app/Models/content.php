<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class content extends Model
{
    protected $table = 'content';
    use HasFactory;
    public function publicContent()
    {
        $publicContent = DB::table('content')->select('name','contentName','saveName','contentPhoto')->paginate(12);
        logger("publicContent",["パブリックコンテンツ"=>$publicContent]);
        return $publicContent;
    }
    public function userContent($name)
    {
        $userContent = DB::table('content')->select('name','contentName','content.saveName','contentPhoto')->where('name',$name)->paginate(12);
        return $userContent;
    }
    public function addContent($name,$contentName,$saveName,$relese)
    {
        if ($relese == "public"){
            DB::table('content')->insert(["name"=> $name,"contentName"=>$contentName,"saveName"=>$saveName,"public"=>1]);
        }else{
            DB::table('content')->insert(["name"=> $name,"contentName"=>$contentName,"saveName"=>$saveName,"public"=>0]);
        }
    }

    public function getContentName($saveName)
    {
        $contentName = DB::table('content')->select('contentName')->where('saveName',$saveName)->get()->first();
        return $contentName;
    }

    public function deleteContent($saveName)
    {
        DB::table('content')->where('saveName',$saveName)->delete()->first();
    }

    public function editContent($saveName,$newContentName)
    {
        DB::table('content')->where('saveName',$saveName)->update(['contentName'=>$newContentName]);
    }

    public function getContentInfo($saveName)
    {
        $contentInfo = DB::table('contentInfo')->select('contentInfo')->where('saveName',$saveName);
        return $contentInfo;
    }

    public function getContentPhoto($saveName)
    {
        $contentPhoto = DB::table('content')->select('contentPhoto')->where('saveName',$saveName)->get();
        logger('getContentPhoto',["getContentPhoto"=>$contentPhoto]);
        return $contentPhoto;
    }

    public function getConditionsPublicContent($saveName)
    {
        $conditionsPublicContent = DB::table('content')->select('name','contentName','saveName','contentPhoto')->whereIn("saveName",$saveName)->paginate(12);
        return $conditionsPublicContent;
    }

    public function getContentByContent($contentName){
        $getContentList = DB::table('content')->select('name','contentName','saveName')->where("contentName",$contentName)->paginate(12);
        return $getContentList;
    }

    public function getContentByUser($userName){
        $getContentList = DB::table('content')->select('name','contentName','saveName','contentPhoto')->where("name",$UserName)->paginate(12);
        return $getContentList;
    }

    public function getSaveNameByUser($userName){
        $getSaveNameList = DB::table('content')->select('saveName')->where("name",$userName);
        return $getSaveNameList;
    }

    public function getContentByUserNameAndTag($userName,$tagIdList){
        $getContentData = DB::table("content")->join('contentAndTag','content.saveName',"=",'contentAndTag.saveName')->select('name','contentName','content.saveName','contentPhoto')->where("name",$userName)->whereIn('tagId',$tagIdList)->paginate(12);
        return $getContentData;
    }

    public function getContentByUserNameAndContentName($userName,$contentName){
        $getContentData = DB::table('content')->select('name','contentName','saveName','contentPhoto')->where([['name',$userName],['contentName',$contentName]])->paginate(12);
        return $getContentData;
    }
    public function getContentNameBySaveName($saveName){
        $getContentName = DB::table('content')->select('contentName')->where('saveName',$saveName)->get();
        return $getContentName;
    }


}
