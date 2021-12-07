<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\contentPhoto;

class addPhotoDataAPI extends Controller
{
    public function add(Request $request){
        $saveName = $request->get('saveName');
        $photoData = $request->file('photoData');
        logger("入ったか確認",['foo' => 'haitta']);
        logger("入ったか確認",['foo' => $saveName]);
        if (!is_null($photoData)) {
            date_default_timezone_set('Asia/Tokyo');

            logger("コンテント名",['foo' => "kannsuu"]);
            $uniqName = uniqid();
            $photoDataType = pathinfo($photoData, PATHINFO_EXTENSION);
            logger("入ったか確認",['foo' => $photoDataType]);
            $photoDataFileName = $uniqName . "." . $photoDataType;
            $dir = 'public';
            $photoData->storeAs($dir, $photoDataFileName, ['disk' => 'local']);
            $contentPhoto = new contentPhoto;
            $contentPhoto->addPhotoData($saveName,$photoDataFileName);
        }
    }
}
