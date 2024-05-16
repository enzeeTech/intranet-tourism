import { useEffect } from 'react';
import Switch from 'react-switch';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <form onSubmit={submit} className="w-full p-4 sm:p -6 sm:py-8">
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <div className="mb-6">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Username"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <div className="h-6">
                        <InputError message={errors.email} className="text-sm text-red-500" />
                    </div>
                </div>

                <div className="mb-6">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <div className="h-6">
                        <InputError message={errors.password} className="text-sm text-red-500" />
                    </div>
                </div>

                <div className="mt-4 flex items-center mb-6">
                    <Switch
                        checked={data.remember}
                        onChange={(checked) => setData('remember', checked)}
                        onColor="#36c"
                        onHandleColor="#fff"
                        handleDiameter={24}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={16}
                        width={40}
                        className="react-switch"
                    />
                    <span className="ml-2 text-sm text-blue-600">Remember me?</span>
                </div>

                <PrimaryButton className="flex justify-center w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50" disabled={processing}>
                    Log in
                </PrimaryButton>
                <div className="h-1">
    <InputError 
        message={
            errors.email ? "username and/or password is wrong" : 
            errors.password ? "username and/or password is wrong" : 
            ""
        } 
        className="text-sm text-red-500" 
    />
</div>


            </form>
        </GuestLayout>
    );
}
