<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class rotationVectorData extends Model
{
    use HasFactory;
    function addRotationVector($saveName){
        DB::table('rotationVectorData')->insert(['saveName' => $saveName , 'rotationX' => 270,'rotationY' => 0,'rotationZ' => 0]);
    }
    function rotationVector($saveName){
        $vectorData = DB::table('rotationVectorData')->select('rotationX','rotationY','rotationZ') -> where('saveName',$saveName)->get();
        return $vectorData;
    }
}
