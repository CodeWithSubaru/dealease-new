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
        Schema::create('shell_transactions', function (Blueprint $table) {
            $table->id('shells_trans_id');
            $table->foreignId('user_id');
            $table->string('payment_number');
            $table->char('payment_status', 1);
            $table->text('payment_description');
            $table->decimal('payment_total_amount', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shell_transactions');
    }
};
