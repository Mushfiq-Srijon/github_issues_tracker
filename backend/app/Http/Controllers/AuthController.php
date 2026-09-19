<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = \App\Models\User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        return response()->json([
            'message' => 'Registration successful.',
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!$token = auth('api')->attempt($validated)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = auth('api')->user();

        return response()
            ->json([
                'message' => 'Login successful.',
                'user' => $user,
            ])
            ->withCookie(
                cookie(
                    'token',
                    $token,
                    config('jwt.ttl'),
                    '/',
                    null,
                    app()->environment('production'),
                    true,
                    false,
                    app()->environment('production') ? 'none' : 'lax'
                )
            );
    }

    public function logout()
    {
        auth('api')->logout();

        return response()
            ->json([
                'message' => 'Logout successful.',
            ])
            ->withCookie(
                cookie(
                    'token',
                    '',
                    -1,
                    '/',
                    null,
                    app()->environment('production'),
                    true,
                    false,
                    app()->environment('production') ? 'none' : 'lax'
                )
            );
    }

    public function user()
    {
        return response()->json([
            'user' => auth('api')->user(),
        ]);
    }
    public function refresh()
    {
        $token = auth('api')->refresh();

        return response()
            ->json([
                'message' => 'Token refreshed.',
            ])
            ->withCookie(
                cookie(
                    'token',
                    $token,
                    config('jwt.ttl'),
                    '/',
                    null,
                    app()->environment('production'),
                    true,
                    false,
                    app()->environment('production') ? 'none' : 'lax'
                )
            );
    }
}
