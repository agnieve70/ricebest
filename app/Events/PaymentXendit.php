<?php

namespace App\Events;

use App\Models\Products;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

require '../vendor/autoload.php';
use Xendit\Xendit;

class PaymentXendit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $user_id;
    public $product_id;
    public $amount;
    public $quantity;

    public function __construct($user_id, $product_id, $amount, $quantity)
    {
        //
        $this->product_id = $product_id;
        $this->amount = $amount;
        $this->quantity = $quantity;
        $this->user_id = $user_id;

        Xendit::setApiKey('xnd_development_3W8E9yLJ7SyI444EiQLAc88brK9asTHPMhgPQLaUQOtelFQsjRx6XpwUBEewSEY');
    }

    public function getPayment(){
        $invoiceInfo = \Xendit\Invoice::retrieve($id);
        var_dump(json_encode($invoiceInfo));
    }

    public function setPayement(){
        
        $user_info = User::where('id', $this->user_id)->first();
        $product_info = Products::where('id', $this->product_id)->first();

        $str_rnd = Str::random(8);

        $params = [
            'external_id' => $str_rnd,
            'amount' => $this->amount,
            'description' => $product_info->title,
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
            'success_redirect_url' => 'https://ricebest.herokuapp.com/success',
            'failure_redirect_url' => 'https://ricebest.herokuapp.com/fail',
            'currency' => 'PHP',
            'items' => [
                [
                    'name' => $product_info->title,
                    'quantity' => $this->quantity,
                    'price' => $this->amount,
                    'category' => 'Rice Order',
                    'url' => 'https://ricebest.herokuapp.com/'
                ]
            ],
            'fees' => [
                [
                    'type' => 'ORDER',
                    'value' => $this->amount
                ]
            ]
        ];

        $createInvoice = \Xendit\Invoice::create($params);
        return($createInvoice);
    }


    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
