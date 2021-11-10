<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\rotationVectorData;
class rotationVectorDataAPI extends Controller
{
    public function show(Request $request){
        $rotationVectorData = new rotationVectorData;
        $saveName = $_GET['saveName'];
        $vector = $rotationVectorData->rotationVector($saveName);
    
        return \Response::json($vector);
    }
}
