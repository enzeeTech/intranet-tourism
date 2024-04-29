import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
//     return (
//         <div className="relative flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
//             <img src="/assets/LoginSide.png" alt="Image" className="absolute ml-8 top-15 left-80 w-96 h-96" />
//             <div className="flex items-center justify-center">
//     <div className="relative px-6 py-4 overflow-hidden bg-white rounded-r-lg shadow-md w-96 h-96 left-40 sm:max-w-md">
//         <div>
//             <img src="/assets/logo.png" alt="Logo" className="w-48 h-16 mt-3 mb-6 ml-20" />
//         </div>
//         {children}
//     </div>
// </div>

//         </div>
//     );
    return (
        <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
            <div className="grid items-center grid-cols-2 ">  {/* Grid layout with two columns */}
                <div className="w-full h-full ">  {/* Container for the image */}
                    <img src="/assets/LoginSide.png" alt="Image" className="w-full h-full rounded-l-lg " />
                </div>

                <div style={{alignContent: 'center'}} className="w-full h-full px-6 overflow-hidden bg-white rounded-r-lg shadow-sm">  {/* Container for the form */}
                    <div style={{marginLeft: 100}}>
                        <img src="/assets/logo.png" alt="Logo" className="w-48 h-16 mt-3 mb-6" />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
