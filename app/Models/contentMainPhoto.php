<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class contentMainPhoto extends Model
{
    use HasFactory;
    function addSaveNameAndmainPhoto($saveName,$mainPhotoName){
        DB::table("contentMainPhoto")->insert(['saveName' => $saveName , 'mainPhoto' => $mainPhotoName]);
    }
}
