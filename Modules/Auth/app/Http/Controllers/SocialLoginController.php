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

        $user = User::updateOrCreate([
            'email' => $socialiteUser->email,
        ], [
            'name' => $socialiteUser->name,
            'email' => $socialiteUser->email,
            'password' => bcrypt('password'),
        ]);

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
