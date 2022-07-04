<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Messages;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    //
    public function contacts()
    {
        $contacts = Messages::select('sender_id', 'receiver_id', 'created_at')
        ->distinct()
        ->where('sender_id', auth()->user()->id)
        ->orWhere('receiver_id', auth()->user()->id)
        ->get();
        
        $data = [];
        foreach($contacts as $con){
            $row = [];
            if($con->sender_id === auth()->user()->id){
                $user = User::find($con->receiver_id);
                $row['user'] = !empty($user) ? $user : null;
            }else{
                $row['user'] = User::find($con->sender_id);
            }
            $row['date'] = $con->created_at;
            $data[] = $row;
        }

        return response()->json([
            "status" => 1,
            "message" => "Fetched Contacts",
            "data" => $data,
        ], 200);
    }

    public function index()
    {
        $messages = Messages::select('sender_id', 'receiver_id', 'content', 'created_at')
        ->distinct()
        ->where('sender_id', auth()->user()->id)
        ->orWhere('receiver_id', auth()->user()->id)
        ->get();

        return response()->json([
            "status" => 1,
            "message" => "Fetched Messages",
            "data" => $messages,
        ], 200);
    }

    public function create(Request $request)
    {
    }
}
