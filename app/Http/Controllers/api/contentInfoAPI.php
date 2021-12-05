<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\contentPhoto;
class contentInfoAPI extends Controller
{
    public function search(){
        $saveName = $_POST['saveName'];
        $contentInfo = new contentInfo;
        $contentPhoto = new contentPhoto;
        logger('serch',['jjj' => "jjjjjjj"]);
        $info = $contentInfo -> getContentInfo($saveName);
        $photo = $contentPhoto -> getContentPhoto($saveName);
        logger('testSerch', ['foo' => $info]);
        $infoData = "";
        $photoData = "";
        if ($info != ""){
            foreach ($info as $temp){
                $infoData = $temp;
            };
        }
        if ($photo != ""){
            foreach ($photo as $temp){
                $photoData = $temp;
            };
        }

        $array = array(
            "contentInfo" => $infoData,
            "contentPhoto" => $photoData,
        );
        $json = json_encode($array);
        return $json;
    }
}
