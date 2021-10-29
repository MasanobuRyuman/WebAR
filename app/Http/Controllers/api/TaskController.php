<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class TaskController extends Controller
{
    public function show()
    {

        return response()->json(['name' => '山田太郎', 'gender' => '男','mail' => 'yamada@test.com']);
    }
}
