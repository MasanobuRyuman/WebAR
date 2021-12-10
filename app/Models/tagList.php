<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class tagList extends Model
{
    use HasFactory;
    public function getTagName(){
        $tagNameList = DB::table('tagList')->select('tagName')->get();
        return $tagNameList;
    }
    public function getTagId($tagName){
        logger("tagName",["tag"=>$tagName]);
        $conditionList = array();
        foreach($tagName as $tag){
            $conditionList[] = $tag;
        }
        logger("tagList",["tagList" => $conditionList]);
        $tagId = DB::table('tagList')->select('tagId')->whereIn('tagName', $conditionList)->get();
        return $tagId;
    }
}
