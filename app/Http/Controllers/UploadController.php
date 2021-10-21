<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $objFile = $request->file('obj');
        

        if (!is_null($objFile)) {
            date_default_timezone_set('Asia/Tokyo');
            $objName = $objFile->getClientOriginalName();

            $micro = explode(" ", microtime());
            $fileTail = date("Ymd_His", $micro[1]) . '_' . (explode('.', $micro[0])[1]);
            $dir = 'public';
            $fileName = $objName;
            echo $fileName;
            $objFile->storeAs($dir, $fileName, ['disk' => 'local']);

        }

        return view('addFile');
    }
}
