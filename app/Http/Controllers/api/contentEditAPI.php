<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\content;

class contentEditAPI extends Controller
{
    public function edit(){
        logger('test', ['foo' => 'editAPI']);
        $saveName = $_POST["saveName"];
        $newContentName = $_POST["newContentName"];
        $content = new content;
        $content -> editContent($saveName,$newContentName);
    }
}
