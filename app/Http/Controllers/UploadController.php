<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $file = $request->file('a');

        if (!is_null($file)) {
            date_default_timezone_set('Asia/Tokyo');
            $originalName = $file->getClientOriginalName();
            $micro = explode(" ", microtime());
            $fileTail = date("Ymd_His", $micro[1]) . '_' . (explode('.', $micro[0])[1]);

            $dir = 'upFiles';
            $fileName = $originalName . '.' . $fileTail;
            $file->storeAs($dir, $fileName, ['disk' => 'local']);

        }

        return view('addFile');
    }
}
