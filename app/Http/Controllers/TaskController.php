<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\userInfo;

class TaskController extends Controller
{
    public function show()
    {
        echo "kita";
        $users = App\userInfo::all();

        return response()->json(['name' => '山田太郎', 'gender' => '男','mail' => 'yamada@test.com']);
    }
}
