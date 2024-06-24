<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Modules\Auth\Http\Requests\LoginRequest;

class SocialLoginController extends Controller
{
    public function redirect($driver)
    {
        return Socialite::driver($driver)->redirect();
    }

    public function callback($driver)
    {
        $socialiteUser = Socialite::driver($driver)->user();

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

        // FIXME: should query from SocialAccount
        $user = User::where('email', $socialiteUser->getEmail())->first();

        if (!$user) {
            $user = User::create([
                'name' => $socialiteUser->name,
                'email' => $socialiteUser->email,
                'password' => bcrypt('password'),
            ]);

            // save social account token
        }

        auth()->login($user);

        return redirect('/');
    }

    public function logout(Request $request, $driver)
    {
        auth()->logout();
        session()->flush();
        $azureLogoutUrl = Socialite::driver($driver)->getLogoutUrl(route('login'));
        return redirect($azureLogoutUrl);
    }
}
