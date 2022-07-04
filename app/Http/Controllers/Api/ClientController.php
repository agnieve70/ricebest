<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Exception;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    //
    public function index(){
        $clients = Clients::select('firstname', 'lastname', 'created_at')->get();

        return response()->json([
            "status" => 1,
            "message" => "Fetched Clients",
            "data" => $clients,
        ], 200);
    }

    public function getClient($id){
        try {
            $client = Clients::find($id);

            if ($client) {
                return response()->json([
                    "status" => 1,
                    "message" => "Client Found",
                    "data" => [
                        "client" => $client,
                        "user" => Clients::find($id)->user
                    ]
                ], 200);
            } else {
                return response()->json([
                    "status" => 0,
                    "message" => 'Client not Found',
                ], 404);
            }
        } catch (Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => $e->getMessage()
            ], 500);
        }
    }

    public function create(Request $request){
        try {
            $request->validate([
                "firstname" => "required",
                "lastname" => "required",
                "birthdate" => "required",
                "address" => "required",
                "valid_id" => "required",
                "user_id" => "required",
            ]);

            $client = new Clients();
            $client->firstname = $request->firstname;
            $client->lastname = $request->lastname;
            $client->birthdate = $request->birthdate;
            $client->address = $request->address;
            $client->user_id = $request->user_id;
            $valid_id = $this->uploadPicture($request->file('valid_id'), 'valid_ids/');
            $client->valid_id = $valid_id;
            $client->save();

            return response()->json([
                "status" => 1,
                "message" => "Client Saved",
                "data" => $client
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request){
        try {
            if ($client = Clients::find($request->id)) {
                $client->firstname = !empty($request->firstname) ? $request->firstname : $client->firstname;
                $client->lastname = !empty($request->lastname) ? $request->lastname : $client->lastname;
                $client->birthdate = !empty($request->birthdate) ? $request->birthdate : $client->birthdate;
                $client->address = !empty($request->address) ? $request->address : $client->address;
                $client->user_id = !empty($request->user_id) ? $request->user_id : $client->user_id;
                $client->save();

                return response()->json([
                    "status" => 1,
                    "message" => "Client Updated",
                    "data" => $client
                ], 200);
            } else {
                return response()->json([
                    "status" => 0,
                    "message" => 'Client Not Found.',
                ], 404);
            }
        } catch (Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function delete($id){
        
    }
}
