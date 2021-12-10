<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class contentAndTag extends Model
{
    use HasFactory;
    public function addContentAndTag($saveName,$tagList)
    {
        $insertData = [];
        foreach($tagList as $tag){
            $insertData[]=["saveName" => $saveName,"tagId" => $tag];
        }
        DB::table('contentAndTag')->insert($insertData);
    }

    public function getSaveName($tagId)
    {
        $saveNameList = DB::table('contentAndTag')->select("saveName")->whereIn("tagId",$tagId)->get();
        return $saveNameList ;
    }
}