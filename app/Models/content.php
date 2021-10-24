<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class content extends Model
{
    protected $table = 'content';
    use HasFactory;
    public function addContent($name,$contentName,$saveName,$relese)
    {
        if ($relese == "public"){
            DB::table('content')->insert(["name"=> $name,"contentName"=>$contentName,"saveName"=>$saveName,"public"=>1]);
        }else{
            DB::table('content')->insert(["name"=> $name,"contentName"=>$contentName,"saveName"=>$saveName,"public"=>1]);
        }
    }
    public function userContent($name)
    {
        $userContent = DB::table('content')->select('name','contentName','saveName')->where('name',$name)->paginate(3);
        return $userContent;
    }
}
