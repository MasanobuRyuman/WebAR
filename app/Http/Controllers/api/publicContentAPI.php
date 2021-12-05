<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\content;
class publicContentAPI extends Controller
{
    public function show(){
        $content = new content;
        $users = $content->publicContent();
        return \Response::json($users);
    }
}
