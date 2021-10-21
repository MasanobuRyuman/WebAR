<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\userInfo;
use App\Models\content;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $objFile = $request->file('obj');
        $mtlFile = $request->file('mtl');

        if (!is_null($objFile) and !is_null($mtlFile)) {
            date_default_timezone_set('Asia/Tokyo');
            $objName = $objFile->getClientOriginalName();
            $mtlName = $mtlFile->getClientOriginalName();
            $uniqName = uniqid();
            echo $uniqName;
            $objFileType = pathinfo($objName, PATHINFO_EXTENSION);
            $mtlFileType = pathinfo($mtlName, PATHINFO_EXTENSION);
            $micro = explode(" ", microtime());
            $objFileName = $uniqName . "." . $objFileType;
            $mtlFileName = $uniqName . "." . $mtlFileType;
            $dir = 'public';
            content::insert([
                'name' => '名前',
                'contentName' => $objName,
                'saveName' => $objFileName
            ]);

            $objFile->storeAs($dir, $objFileName, ['disk' => 'local']);
            $mtlFile->storeAs($dir, $mtlFileName, ['disk' => 'local']);
        }

        return view('main');
    }
}
