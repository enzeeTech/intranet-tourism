export default function Guest({ children }) {
    return (
        <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
            <div className="grid items-center grid-cols-2"> {/* Grid layout with two columns */}
                <div className="w-full h-full"> {/* Container for the image */}
                    <img src="/assets/LoginSide.png" alt="Image" className="w-full h-full rounded-l-lg hidden md:block" />
                </div>

                <div style={{alignContent: 'center'}} className="w-full h-full px-6 overflow-hidden bg-white rounded-r-lg shadow-sm"> {/* Container for the form */}
                    <div style={{marginLeft: 100}}>
                        <img src="/assets/logo.png" alt="Logo" className="w-48 h-16 mt-3 mb-6" />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
