<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Farmers;
use Exception;
use Illuminate\Http\Request;

class FarmerController extends Controller
{
    //
    public function index(){
        $farmers = Farmers::select('farmers.id','firstname', 'lastname', 'email', 'address', 'farmers.created_at')
        ->join('users', 'farmers.user_id', 'users.id')
        ->get();

        return response()->json([
            "status" => 1,
            "message" => "Fetched Farmers",
            "data" => $farmers
        ], 200);
    }

    public function getFarmer($id){
        try{
            $farmer = Farmers::find($id);

            if ($farmer) {
                return response()->json([
                    "status" => 1,
                    "message" => "Farmer Found",
                    "data" => [
                        "farmer" => $farmer,
                        "user" => Farmers::find($id)->user
                    ]
                ], 200);
            } else {
                return response()->json([
                    "status" => 0,
                    "message" => 'Farmer not Found',
                ], 404);
            }
        }catch(Exception $e){
            return response()->json([
                "status" => 0,
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function create(Request $request){
        try{
            $request->validate([
                "firstname" => "required",
                "lastname" => "required",
                "address" => "required",
                "user_id" => "required",
            ]);

            $farmer = new Farmers();
            $farmer->firstname = $request->firstname;
            $farmer->lastname = $request->lastname;
            $farmer->address = $request->address;
            $farmer->user_id = $request->user_id;
            $farmer->save();

            return response()->json([
                "status" => 1,
                "message" => "Farmer Saved",
                "data" => $farmer
            ], 200);
        }catch(Exception $e){
            return response()->json([
                "status" => 0,
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request){
        try{
            if($farmer = Farmers::find($request->id)){
                $farmer->firstname = !empty($request->firstname) ? $request->firstname : $farmer->firstname;
                $farmer->lastname = !empty($request->lastname) ? $request->lastname : $farmer->lastname;
                $farmer->address = !empty($request->address) ? $request->address : $farmer->address;
                $farmer->user_id = !empty($request->user_id) ? $request->user_id : $farmer->user_id;
                $farmer->save();

                return response()->json([
                    "status" => 1,
                    "message" => "Farmer Updated",
                    "data" => $farmer
                ], 200);
            }else{
                return response()->json([
                    "status" => 0,
                    "message" => 'Farmer Not Found.',
                ], 404);
            }
        }catch(Exception $e){
            return response()->json([
                "status" => 0,
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function delete(Request $request){

    }
}
