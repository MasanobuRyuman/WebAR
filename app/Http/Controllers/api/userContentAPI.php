<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\content;
class userContentAPI extends Controller
{
    public function show(Request $request){
        $content = new content;

        $userName = $_GET['userName'];
        $users = $content->userContent($userName);
        return \Response::json($users);
    }
}
