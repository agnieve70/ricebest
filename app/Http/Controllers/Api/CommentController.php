<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comments;
use Egulias\EmailValidator\Warning\Comment;
use Exception;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    public function index($id)
    {
        try{
            $comments = Comments::where('product_id',$id)->join('users', 'users.id','comments.user_id')->get();

            return response()->json([
                "status" => 1,
                "message" => "Fetched Comments",
                "data" => $comments,
            ], 200);
            
        }catch(Exception $e){
            return response()->json([
                "status" => 0,
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function create(Request $request)
    {

        // try {
            $request->validate([
                'product_id' => 'required',
                'content' => 'required',
            ]);

            $comment = new Comments();
            $comment->product_id = $request->product_id;
            $comment->content = $request->content;
            $comment->user_id = auth()->user()->id;
            $comment->save();

            return response()->json([
                "status" => 1,
                "message" => "Comment Saved",
                "data" => $comment,
            ], 200);
        // } catch (Exception $e) {
        //     return response()->json([
        //         "status" => 0,
        //         "message" => $e->getMessage(),
        //     ], 500);
        // }
    }

    public function update(Request $request)
    {
        try {
            if ($comment = Comments::find($request->id)) {

                $comment->content = !empty($request->content) ? $request->content : $comment->content;
                $comment->save();

                return response()->json([
                    "status" => 1,
                    "message" => "Comment Updated",
                    "data" => $comment
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function delete($id)
    {
        try {
            if($comment = Comments::find($id)){
                $comment->delete();
                return response()->json([
                    "status" => 1,
                    "message" => "Comment successfully deleted.",
                ], 201);
            }else{
                return response()->json([
                    "status" => 0,
                    "message" => "Comment not found.",
                ], 404);
            }
        } catch (Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => $e->getMessage(),
            ], 500);
        }
    }
}
