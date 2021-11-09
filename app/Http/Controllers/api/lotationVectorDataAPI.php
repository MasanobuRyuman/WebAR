<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\latationVectorData;
class publicContentAPI extends Controller
{
    public function show(){
        $content = new content;
        $userName = session('name');
        $users = $content->publicContent($userName);

        return \Response::json($users);

    }
}
