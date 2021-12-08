<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\contentPhoto;
class editContentInfoAPI extends Controller
{
    public function edit(){
        $saveName = $_POST['saveName'];
        $newInfo = $_POST['newInfo'];
        $contentInfo = new contentInfo;
        $contentInfo -> editContentInfo($saveName,$newInfo);
    }
}
