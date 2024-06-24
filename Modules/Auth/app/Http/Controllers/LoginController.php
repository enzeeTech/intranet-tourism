<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Modules\Auth\Http\Requests\LoginRequest;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $user = User::query()->where('id', auth()->id())->with('roles.permissions')
            ->withModuleRelation('Organisation', 'department')
            ->firstOrFail();

        return response()->json([
            'data' => [
                'hasVerifiedEmail' => $user->hasVerifiedEmail(),
                'token' => $user->createToken(name: 'web', expiresAt: request('remember') ? now()->addDays(7) : null)->plainTextToken,
                'user' => $user->only('id', 'name', 'email'),
                'permissions' => $user->roles->flatMap->permissions->pluck('name')->unique()->toArray(),
            ],
        ]);
    }

    public function loginWithAzure()
    {
        return Socialite::driver('azure')->redirect();
    }

    public function callback($driver = 'azure')
    {
        $socialiteUser = Socialite::driver('github')->user();

        // OAuth 2.0 providers...
        dd(
            $token = $socialiteUser->token,
            $refreshToken = $socialiteUser->refreshToken,
            $expiresIn = $socialiteUser->expiresIn,

            // OAuth 1.0 providers...
            $token = $socialiteUser->token,
            $tokenSecret = $socialiteUser->tokenSecret,

            // All providers...
            $socialiteUser->getId(),
            $socialiteUser->getNickname(),
            $socialiteUser->getName(),
            $socialiteUser->getEmail(),
            $socialiteUser->getAvatar(),
        );

        $user = User::where('email', $socialiteUser->getEmail())->firstOrCreate([
            ['email' => $socialiteUser->getEmail()],
            [
                'name' => $socialiteUser->getName(),
                'password' => bcrypt(str()->random(12)),
            ]
        ]);
        $user = User::where('email', $socialiteUser->getEmail())->firstOrCreate([
            ['email' => $socialiteUser->getEmail()],
            [
                'name' => $socialiteUser->getName(),
                'password' => bcrypt(str()->random(12)),
            ]
        ]);

        auth()->loginUsingId($user->id);

        return response()->json([
            'data' => [
                'hasVerifiedEmail' => $user->hasVerifiedEmail(),
                'token' => $user->createToken(name: 'web', expiresAt: request('remember') ? now()->addDays(7) : null)->plainTextToken,
                'user' => $user->only('id', 'name', 'email'),
                'permissions' => $user->roles->flatMap->permissions->pluck('name')->unique()->toArray(),
            ],
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard()->logout();
        $request->session()->flush();
        $azureLogoutUrl = Socialite::driver('azure')->getLogoutUrl(route('login'));
        return redirect($azureLogoutUrl);
    }

    public function logout2(Request $request)
    {
        if ($request->hasSession()) {
            auth()->logout();
            session()->invalidate();
            session()->regenerateToken();
        } else {
            auth()->user()->currentAccessToken()->delete();
        }

        return response()->noContent();
    }
}
