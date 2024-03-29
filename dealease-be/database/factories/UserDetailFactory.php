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
        $barangay = [
            'Paliwas',
            'Salambao',
            'Binuangan',
            'Pag-asa',
            'San Pascual',
            'Catanghalan',
            'Hulo',
            'Panghulo',
            'Lawa',
            'Paco',
            'Tawiran'
        ];

        return [
            'middle_name' => fake()->lastName(),
            'last_name' => fake()->lastName(),
            'ext_name' => fake()->suffix(),
            'birth_date' => date('Y-m-d'),
            'region' => 'Region III (Central Luzon)',
            'province' => 'Bulacan',
            'city' => 'Obando',
            'barangay' => $barangay[rand(0, count($barangay) - 1)],
            'street' => fake()->streetAddress(),
            'contact_number' => '09298384753',
        ];
    }
}
