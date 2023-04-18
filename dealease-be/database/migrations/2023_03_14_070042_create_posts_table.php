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
        Schema::create('products', function (Blueprint $table) {
            $table->id('id');
            $table->text('title');
            $table->text('description');
            $table->string('image')->nullable();
            $table->string('stock')->nullable();
            $table->decimal('amount', 8, 2)->default(0);
            $table->string('weight')->nullable();
            $table->foreignId('user_id')
                ->constrained('users', 'user_id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
