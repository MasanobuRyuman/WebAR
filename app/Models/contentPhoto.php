<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class contentPhoto extends Model
{
    use HasFactory;
    public function getContentPhoto($saveName)
    {
        $contentPhoto = DB::table('contentPhoto')->select('contentPhoto')->where('saveName',$saveName)->first();
        return $contentPhoto;
    }
    public function addPhotoData($saveName,$photoData)
    {
        DB::table('contentPhoto')->insert(['saveName' => $saveName,'contentPhoto' => $photoData]);
    }
}
