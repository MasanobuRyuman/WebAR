<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\content;
class getContentByUserAPI extends Controller
{
    public function get(){
        $searchName = $_POST["searchUserName"];
        $content = new content;
        $gotContent = $content->getContentByUser($searchName);
        logger("gotContent",["gotContent"=>$gotContent]);
        return \Response::json($gotContent);
    }
}
