<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_transactions', function (Blueprint $table) {
            $table->id('order_trans_id');
            $table->string('order_number');
            $table->char('order_trans_status', 1);
            $table->decimal('total_amount', 8, 2);
            $table->decimal('delivery_fee', 8, 2);
            $table->foreignId('seller_id');
            $table->foreignId('buyer_id');
            $table->foreignId('shipping_id');
            $table->foreignId('delivery_address_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_transactions');
    }
};
