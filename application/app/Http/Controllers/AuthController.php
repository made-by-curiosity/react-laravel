<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidCredentialsException;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function __construct(private readonly UserService $userService)
    {
    }

    public function register(RegisterRequest $request)
    {
        $token = $this->userService->register($request->validated());

        return response()->json([
            'token' => $token
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        try {
            $token = $this->userService->login($request->validated());

            return response()->json(['token' => $token]);
        } catch (InvalidCredentialsException $e) {
            throw ValidationException::withMessages([
                'email' => $e->getMessage(),
            ]);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message'=> 'Logout successful']);
    }
}
