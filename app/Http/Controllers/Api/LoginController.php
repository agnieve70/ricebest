<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    //
    public function index(Request $request){
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        if (!$token = auth()->attempt(["email" => $request->email, "password" => $request->password])) {
            return response()->json([
                "errors" => [
                    "user" => 0
                ],
                "message" => "Invalid Credentials"
            ], 404);
        }

        $token = $request->user()->createToken($request->email);

        return response()->json([
            "status" => 1,
            "message" => "Login Successfully",
            "token" => $token->plainTextToken,
        ], 200);
    }
}
