<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Str;
use File;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function uploadPicture($file, $destination){
        $str_rnd = Str::random(5);
        $destinationPath = 'file_storage/'.$destination;
        if ($file->getClientOriginalExtension() === null) {
            return response()->json([
                "errors" => [
                    "message" => "Image is required!",
                ],
                "message" => "Image is required",
            ], 200);
        }
        $filename = $str_rnd . '.' . $file->getClientOriginalExtension();
        $file->move($destinationPath, $filename);
        return $filename;
    }

    public function deleteFile($fileLocation)
    {
        try {
            File::delete($fileLocation);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
    public function updateFile($oldFileName, $newFile, $location)
    {
        $str_rnd = Str::random(5);
        $destinationPath = 'file_storage/' . $location . '/';
        if ($newFile->getClientOriginalExtension() === null) {
            return $this->sendError('Validation Error.', "Image is required");
        }

        File::delete($destinationPath . '/' . $oldFileName);

        $filename = $str_rnd . '.' . $newFile->getClientOriginalExtension();
        $newFile->move($destinationPath, $filename);

        return $filename;
    }
}
