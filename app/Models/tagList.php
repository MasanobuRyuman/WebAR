<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class tagList extends Model
{
    use HasFactory;
    public function getTagName()
    {
        $tagNameList = DB::table('tagList')->select('tagName')->get();
        return $tagNameList;
    }
    public function getConditionsTagName($tagIdList)
    {
        $tagNameList = DB::table('tagList')->select('tagName')->whereIn('tagId',$tagIdList)->get();
        return $tagNameList;
    }
    public function getTagId($tagNameList)
    {
        //whereInの第二引数を直接[]で括っているのでエラーがでる可能性がある。
        $tagIdList = array();
        foreach($tagNameList as $tag){
            $tagId = DB::table('tagList')->select('tagId')->where('tagName',$tag)->get();
            $tagIdList[] = $tagId;
        }
        return $tagIdList;
    }
}
