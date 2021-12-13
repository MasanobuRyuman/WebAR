<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\contentPhoto;
use App\Models\content;
class contentInfoAPI extends Controller
{
    public function search(){
        $saveName = $_POST['saveName'];
        $contentInfo = new contentInfo;
        $contentPhoto = new contentPhoto;
        $info = $contentInfo -> getContentInfo($saveName);
        $photo = $contentPhoto -> getContentPhoto($saveName);
        $infoData = "";
        $photoData = "";
        if ($info != ""){
            foreach ($info as $temp){
                $infoData = $temp;
            };
        }
        $photoData = array();
        logger("コンテント名",['contentInfoAPI' => "入りました"]);
        if ($photo != ""){
            foreach ($photo as $temp){
                foreach($temp as $temp2){
                    logger("コンテント名",['photo配列' => $temp2]);
                    $photoData[] = $temp2;
                }

            };
        }
        logger("写真データ",['photoData' => $photoData]);
        $content = new content;



        $array = array(
            "contentInfo" => $infoData,
            "contentPhoto" => $photoData,
        );
        $json = json_encode($array);
        return $json;
    }
}
