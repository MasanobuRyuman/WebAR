<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\content;
use App\Models\contentAndTag;
use App\Models\tagList;
class userContentAPI extends Controller
{
    public function show(Request $request){
        $content = new content;

        $userName = $_GET['userName'];
        $users = $content->userContent($userName);
        logger('users',["users"=>$users]);
        $saveNameList = array();
        foreach ($users as $temp){
            $saveNameList[] = $temp->saveName;
        }
        logger('saveNameList',["saveNameList"=>$saveNameList]);
        $contentAndTag = new contentAndTag;
        $tagId = $contentAndTag->getManyTagId($saveNameList);
        $tagIdList = array();
        foreach($tagId as $temp){
            foreach($temp as $temp2){
                $tagIdList[]=$temp2;
            }
        }
        logger("tagIdList",["tagIdList"=>$tagIdList]);
        $tagList = new tagList;
        $tagName = $tagList->getConditionsTagName($tagList);
        $tagNameList = array();
        foreach($tagName as $temp){
            foreach($temp as $temp2){
                $tagNameList[]=$temp2;
            }
        }

        $array = array(
            "userContetn" => $users,
            "tagNameList" => $photoData,
            "contentName" => $contentName,
            "tagNameList" => $tagNameList,
        );
        $json = json_encode($array);
        return $json;

        return \Response::json($users);

    }
}
