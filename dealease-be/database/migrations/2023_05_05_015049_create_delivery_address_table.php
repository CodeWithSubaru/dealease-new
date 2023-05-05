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
        Schema::create('delivery_address', function (Blueprint $table) {
            $table->id('delivery_address_id');
            $table->foreignId('order_trans_id');
            $table->foreignId('rider_id');
            $table->char('delivery_status', 1);
            $table->string('city', 50);
            $table->string('barangay', 50);
            $table->string('street', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_address');
    }
};
