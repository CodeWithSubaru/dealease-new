<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        static $increment = 0;

        $increment++;

        return [
            'title' => 'Bangus',
            'description' => fake()->text(),
            'image' => 'default_profile.jpg',
            'stocks_per_kg' => rand(1, 10),
            'price_per_kg' => rand(50, 200),
            'user_id' => $increment,
        ];
    }
}
