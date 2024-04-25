import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 relative">
            <img src="/assets/LoginSide.png" alt="Image" className="absolute top-15 left-80 w-96 h-96 ml-8" />
            <div className="flex items-center justify-center">
    <div className="w-96 h-96 left-40 sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden relative rounded-r-lg">
        <div>
            <img src="/assets/logo.png" alt="Logo" className="w-48 h-16 ml-20 mt-3 mb-6" />
        </div>
        {children}
    </div>
</div>

        </div>
    );
}
