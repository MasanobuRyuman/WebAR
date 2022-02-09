<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\contentPhoto;
use App\Models\tagList;
class editTagAPI extends Controller
{
    function edit(Request $request){
        $selectedTagList = $request -> get('selectedTagList');

        logger("選択されたtagu",["選択されたタグ"=>$selectedTagList]);
    }
}
