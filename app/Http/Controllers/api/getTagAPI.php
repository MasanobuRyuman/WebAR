<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\contentPhoto;
use App\Models\tagList;
class getTagAPI extends Controller
{
    public function get(){
        $tagList = new tagList;
        $tagName = $tagList -> getTagName();
        logger("tagName",["タグ名"=>$tagName]);
        $tagNameList = [];
        foreach($tagName as $tag){
            $tagNameList[]=$tag;
        }
        $jsonTagNameList = json_encode($tagNameList);
        return $jsonTagNameList;
    }
}
