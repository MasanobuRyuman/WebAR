<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\contentInfo;
use App\Models\content;
class getContentByContentAPI extends Controller
{
    public function get(){
        $searchName = $_POST["searchContentName"];
        $content = new content;
        $gotContent = $content->getContentByContent($searchName);
        logger("gotContent",["gotContent"=>$gotContent]);
        return \Response::json($gotContent);
    }
}
