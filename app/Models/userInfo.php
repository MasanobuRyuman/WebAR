<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class userInfo extends Model
{
    protected $table = 'userInfo';
    public function getData()
    {
        /**
        * モデルと関連しているテーブル
        *
        * @var string
        */
        return '名前：'.$this -> name.'---メール：'.$this -> password;
    }
    public function loginCheck($name,$password)
    {
        $data = DB::table('userInfo')->where([['name',$name],['password',$password]])->limit(1)->count();
        return $data;
    }
    public function newLoginCheck($name)
    {
        $data = DB::table('userInfo')->where('name',$name)->limit(1)->count();
        return $data;
    }
    public function loginRegister($name,$password)
    {
        DB::table('userInfo')->insert(['name' => $name , 'password' => $password]);
    }
}
