<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\userInfo;

class TopController extends Controller
{
    public function show(){
        $items = userInfo::all();
        echo $items;
        return view('top');
    }
}
