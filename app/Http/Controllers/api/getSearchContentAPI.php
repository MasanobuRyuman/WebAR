<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\contentPhoto;
use App\Models\tagList;
class getSearchContentAPI extends Controller
{
    public function get(Request $request){
        $searchBasedTag = $request -> get("searchBasedTagList");
        logger("serchBasedTag",["serch"=>$searchBasedTag]);
    }
}
