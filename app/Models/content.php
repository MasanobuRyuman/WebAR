<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class content extends Model
{
    protected $table = 'content';
    use HasFactory;
    public function publicContent()
    {
        $publicContent = DB::table('content')->select('name','contentName','saveName')->where('public',1)->paginate(3);
        return $publicContent;
    }
    public function userContent($name)
    {
        $userContent = DB::table('content')->select('name','contentName','saveName')->where('name',$name)->paginate(3);
        return $userContent;
    }
    public function addContent($name,$contentName,$saveName,$relese)
    {
        if ($relese == "public"){
            DB::table('content')->insert(["name"=> $name,"contentName"=>$contentName,"saveName"=>$saveName,"public"=>1]);
        }else{
            logger("入ったか確認",['foo' => 'addContent']);
            DB::table('content')->insert(["name"=> $name,"contentName"=>$contentName,"saveName"=>$saveName,"public"=>0]);
            logger("入ったか確認",['foo' => 'haitta']);
        }
    }
}
