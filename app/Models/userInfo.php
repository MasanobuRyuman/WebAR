<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
