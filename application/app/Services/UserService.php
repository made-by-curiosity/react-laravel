<?php

namespace App\Services;

use App\Exceptions\InvalidCredentialsException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function register(array $data): string
    {
        $user = User::create($data);

        return $user->createToken('auth_token')->plainTextToken;
    }

    public function login(array $credentials): string
    {
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw new InvalidCredentialsException();
        }

        return $user->createToken('auth_token')->plainTextToken;
    }
}
