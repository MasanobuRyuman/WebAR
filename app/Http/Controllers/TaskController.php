<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function show()
    {
        echo "kita";
        $users = App\userInfo::all()
        echo $users;
        return response()->json(['users' => $users]);
    }
}
