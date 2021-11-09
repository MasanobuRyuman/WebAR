<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\userInfo;
use App\Models\content;
use App\Models\lotationVectorData;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $objFile = $request->file('obj');
        $mtlFile = $request->file('mtl');
        $contentName = $request->get('contentName');

        if (!is_null($objFile) and !is_null($mtlFile)) {
            date_default_timezone_set('Asia/Tokyo');
            $uniqName = uniqid();
            $name = session('UserName','default');
            $objName = $objFile->getClientOriginalName();
            $mtlName = $mtlFile->getClientOriginalName();
            $objFileType = pathinfo($objName, PATHINFO_EXTENSION);
            $mtlFileType = pathinfo($mtlName, PATHINFO_EXTENSION);
            $objFileName = $uniqName . "." . $objFileType;
            $mtlFileName = $uniqName . "." . $mtlFileType;
            $dir = 'public';
            $objFile->storeAs($dir, $objFileName, ['disk' => 'local']);
            $mtlFile->storeAs($dir, $mtlFileName, ['disk' => 'local']);
            if ($request->get('releaseSetting') == "public")
            {
                $content->addContent($name,$contentName,$uniqName,"public");
            }else{
                $content->addContent($name,$contentName,$uniqName,"private");
            }
            $content = new content;
            $lotationVectorData = new lotationVectorData;
            $lotationVectorData->addLotationVector($name,$uniqName);
        }

        header("location: main");
        exit();

    }
}
