<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\userInfo;
use App\Models\content;

class UserContentEditController extends Controller
{
    public function show(){

        return view('userContentEdit');
    }
}
