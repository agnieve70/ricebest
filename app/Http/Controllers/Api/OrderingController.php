<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderingController extends Controller
{
    //
    public function index(){
        return response()->json([
            "status" => 1,
            "message" => "Fetched Products",
        ], 200);
    }
}
