<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\content;

class contentDeleteAPI extends Controller
{
    public function delete(){
        //logger('test', ['foo' => 'deleteAPI']);
        $saveName = $_POST["saveName"];
        $content = new content;
        $content -> deleteContent($saveName);
    }
}
