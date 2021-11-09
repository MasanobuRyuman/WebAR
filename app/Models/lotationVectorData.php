<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class lotationVectorData extends Model
{
    use HasFactory;
    function addLotationVector($name,$saveName){
        DB::table('lotationVectorData')->insert(['name' => $name , 'saveName' => $saveName , 'rotationX' => 270,'rotationY' => 0,'rotationZ' => 0);
    }
}
