<?php

namespace App\Http\Controllers\Api;

use App\Events\PaymentXendit;
use App\Http\Controllers\Controller;
use App\Models\Clients;
use App\Models\Farmers;
use App\Models\Invoices;
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
    public function clientOrders(){
        $transactions = Invoices::join('products', 'products.id', 'invoice.product_id')
        ->where('user_id', auth()->user()->id)
        ->where('status', null)
        ->get();

        return response()->json([
            "status" => 1,
            "message" => "Fetched Transactions",
            "data" => $transactions,
        ], 200);
    }
    public function clientTransactions(){
        $transactions = Invoices::join('products', 'products.id', 'invoice.product_id')
        ->where('user_id', auth()->user()->id)
        ->where('status', 1)
        ->get();

        return response()->json([
            "status" => 1,
            "message" => "Fetched Transactions",
            "data" => $transactions
        ], 200);
    }
    public function totals(){
        $farmer = Farmers::count();
        $client = Clients::count();
        $transactions = Invoices::count();

        return response()->json([
            "status" => 1,
            "message" => "Fetched Total Amount",
            "data" => [
                "farmers" => $farmer,
                "clients" => $client,
                "transactions" => $transactions
            ]
        ], 200);
    }

    public function transactions(){
        
        $transactions = Invoices::join('products', 'products.id', 'invoice.product_id')
        ->join('users', 'users.id', 'invoice.user_id')
        ->get();

        return response()->json([
            "status" => 1,
            "message" => "Fetched Transactions",
            "data" => $transactions
        ], 200);
    }

    public function webhook(Request $request){
        logger("REQUEST DATA:");
        logger($request);

        if($invoice = Invoices::where('invoice_no', $request->external_id)->first()){
            $invoice->status = 1;
            $invoice->save();
        }

        return response()->json([
            "status" => 1,
            "message" => "Fetched Products",
            "data" => $request
        ], 200);
    }

    public function order(Request $request){

        $payment = new PaymentXendit(auth()->user()->id, $request->product_id, $request->amount, $request->quantity);
        $result = $payment->setPayement();
        return response()->json([
            "status" => 1,
            "message" => "Invoice Successfully Created",
            "data" => $result,
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
