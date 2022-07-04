<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    //
    public function index(Request $request)
    {
        try {

            $request->validate([
                'name' => 'required|unique:users',
                'email' => 'required|email|unique:users',
                'role' => 'required',
                'profile_picture' => 'required',
                'password' => 'required|confirmed',
            ]);

            $user = new User();
            $user->email = $request->email;
            $user->name = $request->name;
            $user->role = $request->role;

            $str_rnd = Str::random(5);
            $user->remember_token = $str_rnd;
            

            $profile_picture = $this->uploadPicture($request->file('profile_picture'), 'profile_pictures/');
            $user->profile_picture = $profile_picture;
            $user->password = bcrypt($request->password);

            $user->save();

            if (!$token = auth()->attempt(["email" => $request->email, "password" => $request->password])) {
                return response()->json([
                    "errors" => [
                        "user" => 0
                    ],
                    "message" => "Cannot get token"
                ], 400);
            }

            $token = $request->user()->createToken($request->email);

            return response()->json([
                "status" => 1,
                "message" => "User registered successfully",
                "user_id" => $user->id,
                "token" => $token->plainTextToken
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => $e->getMessage(),
            ], 200);
        }
    }

    public function emailConfirmation($code){
        if($user = User::where('remember_token', $code)->first()){
            $user->email_verified_at = now();
            $user->remember_token = null;
            $user->save();

            return response()->json([
                "status" => 0,
                "message" => 'Email Successfully verified!'
            ], 200);
        }else{
            return response()->json([
                "status" => 0,
                "message" => 'Code not found.',
            ], 404);
        }
    }
}