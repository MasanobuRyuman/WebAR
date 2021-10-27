<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function show()
    {
        $users = App\userInfo::all()
        return response()->json(['users' => $users]);
    }
}
