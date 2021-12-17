<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class contentInfo extends Model
{
    use HasFactory;
    public function getContentInfo($saveName)
    {
        $contentInfo = DB::table('contentInfo')->select('contentInfo')->where('saveName',$saveName)->get()->first();
        logger('contentInfo', ['foo' => $contentInfo]);
        return $contentInfo;
    }
    public function editContentInfo($saveName,$newInfo){
        DB::table('contentInfo')->where('saveName',$saveName)->update(['contentInfo'=>$newInfo]);
    }
    public function addContentInfo($saveName,$newInfo){
        DB::table('contentInfo')->insert(["saveName"=>$saveName,"contentInfo"=>$newInfo]);
    }
}
