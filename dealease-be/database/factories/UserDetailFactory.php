<?php

namespace Database\Factories;

use App\Models\UserDetail;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'birth_date' => date('Y-m-d'),
            'region' => fake()->state(),
            'province' => fake()->country(),
            'city' => fake()->city(),
            'barangay' => fake()->streetName(),
            'street' => fake()->streetAddress(),
            'contact_number' => '09298384753',
        ];
    }
}
