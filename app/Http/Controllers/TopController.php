<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\userInfo;
use App\Models\content;

class TopController extends Controller
{
    public function show(){
        $content = new content;
        $publicContent = $content -> publicContent();
        return view('top', ['publicContent' => $publicContent]);
    }
}
