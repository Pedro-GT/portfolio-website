<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class TokenController extends Controller
{
    public function createToken(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);

        $user = Auth::getProvider()->retrieveByCredentials([
            'email' => $request->email,
        ]);

        if (!$user || !Auth::getProvider()->validateCredentials($user, ['password' => $request->password])) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken($request->device_name)->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function showTokenForm()
    {
        return view('auth.token');
    }

    public function generateToken(Request $request)
    {
        $request->validate([
            'device_name' => 'required|string|max:255',
        ]);

        $token = $request->user()->createToken($request->device_name);

        return back()->with('token', $token->plainTextToken);
    }

    public function deleteToken(Request $request, $id)
    {
        $request->user()->tokens()->where('id', $id)->delete();
        return back()->with('status', 'Token deleted successfully');
    }

    public function listTokens(Request $request)
    {
        $tokens = $request->user()->tokens;
        return view('auth.tokens', compact('tokens'));
    }
}