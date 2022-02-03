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
        $publicContent = DB::table('content')->select('name','contentName','saveName')->paginate(9);
        return $publicContent;
    }
    public function userContent($name)
    {
        $userContent = DB::table('content')->select('name','contentName','saveName')->where('name',$name)->paginate(9);
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
        $contentPhoto = DB::table('contentPhoto')->select('contentPhoto')->where('saveName',$saveName);
        return $contentPhoto;
    }

    public function getConditionsPublicContent($saveName)
    {
        $conditionsPublicContent = DB::table('content')->select('name','contentName','saveName')->whereIn("saveName",$saveName)->paginate(9);
        return $conditionsPublicContent;
    }

    public function getContentByContent($contentName){
        $getContentList = DB::table('content')->select('name','contentName','saveName')->where("contentName",$contentName)->paginate(9);
        return $getContentList;
    }

    public function getContentByUser($userName){
        $getContentList = DB::table('content')->select('name','contentName','saveName')->where("name",$UserName)->paginate(9);
        return $getContentList;
    }

    public function getSaveNameByUser($userName){
        $getSaveNameList = DB::table('content')->select('saveName')->where("name",$userName);
        return $getSaveNameList;
    }

    public function getContentByUserNameAndTag($userName,$tagIdList){
        $getContentData = DB::table("content")->join('contentAndTag','content.saveName',"=",'contentAndTag.saveName')->select('name','contentName','content.saveName')->where("name",$userName)->whereIn('tagId',$tagIdList)->paginate(9);
        return $getContentData;
    }
}
