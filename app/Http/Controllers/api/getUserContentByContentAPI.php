<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\content;
class getUserContentByContentAPI extends Controller
{
    public function get(){
        logger("user検索",["hiatta"=>"入った"]);
        $searchContentName = $_POST["searchContentName"];
        $userName = $_POST["userName"];
        logger("検索内容",["検索内容"=>$searchContentName]);
        $content = new content;
        $conditionalUserContent = $content->getContentByuserNameAndContentName($userName,$searchContentName);
        return \Response::json($conditionalUserContent);
    }
}
