<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Products;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

require '../vendor/autoload.php';
use Xendit\Xendit;

class ProductController extends Controller
{
    //
    public function webhook($result){
        return response()->json([
            "status" => 1,
            "message" => "Fetched Products",
            "data" => $result
        ], 200);
    }

    public function order(){
        Xendit::setApiKey('xnd_public_development_9OMRCYJBbLm797GIgDk7IwlXof0bCIqTVJWbPN187rw9hyNWeXN4UDzTr4PqX');

        $user_info = User::where('id', auth()->user()->id)->first();
        $str_rnd = Str::random(8);

        $params = [
            'external_id' => $str_rnd,
            'amount' => 495,
            'description' => 'Xffiliate Pro Plan Subscription',
            'invoice_duration' => 86400,
            'customer' => [
                'given_names' => $user_info->name,
                'surname' => $user_info->email,
                'address' => [
                   
                ]
            ],
            'customer_notification_preference' => [
                'invoice_created' => [
                    'whatsapp',
                    'sms',
                    'email',
                    'viber'
                ],
                'invoice_reminder' => [
                    'whatsapp',
                    'sms',
                    'email',
                    'viber'
                ],
                'invoice_paid' => [
                    'whatsapp',
                    'sms',
                    'email',
                    'viber'
                ],
                'invoice_expired' => [
                    'whatsapp',
                    'sms',
                    'email',
                    'viber'
                ]
            ],
            'success_redirect_url' => 'https://xffiliate.xtendly.com/payment/success?xffiliate=23429gsgals82gdfg',
            'failure_redirect_url' => 'https://xffiliate.xtendly.com/payment/failed?xffiliate=23429gsgals82gdfg',
            'currency' => 'PHP',
            'items' => [
                [
                    'name' => 'Xffiliate Premium',
                    'quantity' => 1,
                    'price' => 495,
                    'category' => 'Subscription',
                    'url' => 'https://xffiliate.xtendly.com/'
                ]
            ],
            'fees' => [
                [
                    'type' => 'ADMIN',
                    'value' => 495
                ]
            ]
        ];

        $createInvoice = \Xendit\Invoice::create($params);

        return response()->json([
            "status" => 1,
            "message" => "Invoice Created",
            "data" => $createInvoice,
            "user" => $user_info
        ], 200);
    }

    public function index()
    {
        $products = Products::select('id','title', 'address', 'price','kilo', 'product_image', 'created_at')->get();

        return response()->json([
            "status" => 1,
            "message" => "Fetched Products",
            "data" => $products
        ], 200);
    }

    public function getProduct($id)
    {
        $product = Products::find($id);
        if($product !== null){
            return response()->json([
                "status" => 1,
                "message" => "Fetched Product",
                "data" => $product
            ], 200);
        }else{
            return response()->json([
                "status" => 0,
                "message" => "Product Not Found",
            ], 404);
        }
        
    }

    public function create(Request $request)
    {
        try {
            $request->validate([
                "title" => "required|unique:products",
                "farmer_id" => "required",
                "description" => "required",
                "address" => "required",
                "price" => "required",
                "product_image" => "required",
                "kilo" => "required",
            ]);

            $product = new Products();
            $product->farmer_id = $request->farmer_id;
            $product->title = $request->title;
            $product->description = $request->description;
            $product->address = $request->address;
            $product->price = $request->price;
            $product->kilo = $request->kilo;

            $product_image = $this->uploadPicture($request->file('product_image'), 'product_images/');

            $product->product_image = $product_image;
            $product->save();

            return response()->json([
                "status" => 1,
                "message" => "Product Saved",
                "data" => $product
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request)
    {
        $request->validate([
            "title" => "unique:products",
        ]);
        try {
            if ($product = Products::find($request->id)) {
                $product->farmer_id = !empty($request->farmer_id) ? $request->farmer_id :  $product->farmer_id;
                $product->title = !empty($request->title) ? $request->title : $product->title;
                $product->description = !empty($request->description) ? $request->description : $product->description;
                $product->address = !empty($request->address) ? $request->address : $product->address;
                $product->price = !empty($request->price) ? $request->price : $product->price;
                $product->kilo = !empty($request->kilo) ? $request->kilo : $product->kilo;

                $product_image = $product->product_image;

                if (!empty($request->file('product_image'))) {
                    $product_image = $this->updateFile($product->product_image, $request->file('product_image'), 'product_images/');
                }
                $product->product_image = $product_image;

                $product->save();

                return response()->json([
                    "status" => 1,
                    "message" => "Product Updated",
                    "data" => $product
                ], 201);
            } else {
                return response()->json([
                    "status" => 0,
                    "message" => 'Product not Found',
                ], 404);
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
            if ($product = Products::find($id)) {

                $this->deleteFile('file_storage/attractions/image/' . $product->product_image);
                $product->delete();

                return response()->json([
                    "status" => 1,
                    "message" => 'Product Successfully Deleted',
                ], 201);
            } else {
                return response()->json([
                    "status" => 0,
                    "message" => 'Product not Found',
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
