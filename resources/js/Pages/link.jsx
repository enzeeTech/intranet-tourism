import React from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import Example from '@/Layouts/DashboardLayoutNew';
import Pautan from '@/Components/Settings/LinkComponent';

const Settings = () => {
  const handleNavigation = () => {
    window.location.href = route('manage-links');
  };

  // return (
  //   <Example>
  //     <main className="">
  //       <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 ">
  //         <div>
  //           <div className="flex items-center justify-between mb-4">
  //             <PageTitle title="Pautan" />
  //             <button 
  //               className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
  //               onClick={handleNavigation}
  //             >
  //               Manage Links
  //             </button>
  //           </div>
  //           <hr className="file-directory-underline" />
  //           <Pautan />
  //         </div>
  //       </div>
  //     </main>
  //   </Example>
  // );

  return (
    <Example>
      <main className="min-h-screen bg-gray-100">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 ">
            <div className="flex items-start justify-between mb-2 border-b border-gray-200">
              <h2 className="mb-3 text-3xl font-bold">Pautan</h2>
              <div className="flex items-center justify-between mb-4">
                  <button 
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
                    onClick={handleNavigation}
                  >
                    Manage Links
                  </button>
                </div>
              </div>
            <Pautan />
        </div>
      </main>
    </Example>
  );
};

export default Settings;
