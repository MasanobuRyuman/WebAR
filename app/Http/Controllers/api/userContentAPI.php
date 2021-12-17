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
        
        return \Response::json($users);

    }
}
