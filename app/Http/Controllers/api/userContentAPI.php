<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\content;
class userContentAPI extends Controller
{
    public function show(){
        $content = new content;
        $userName = session('name');
        $users = $content->userContent($userName);

        return \Response::json($users);

    }
}
