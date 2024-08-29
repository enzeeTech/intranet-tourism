import React from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import Example from '@/Layouts/DashboardLayoutNew';
import Pautan from '@/Components/Settings/LinkComponent';
import FeaturedEvents from '@/Components/Reusable/FeaturedEventsWidget/FeaturedEvents';

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

  // return (
  //   <Example>
  //     <main className="min-h-screen bg-gray-100">
  //       <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 ">
  //           <div className="flex items-start justify-between mb-2 border-b border-gray-200">
  //             <h2 className="mb-3 text-3xl font-bold">Links</h2>
  //             <div className="flex items-center justify-between mb-4">
  //                 <button 
  //                   className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
  //                   onClick={handleNavigation}
  //                 >
  //                   Manage Links
  //                 </button>
  //               </div>
  //             </div>
  //           <Pautan />
  //       </div>
  //     </main>
  //     <aside className="fixed bottom-0 hidden px-4 py-6 overflow-y-auto border-r border-gray-200 left-20 top-16 w-96 sm:px-6 lg:px-8 xl:block">
  //       <style>
  //         {`
  //         aside::-webkit-scrollbar {
  //           width: 0px;
  //           background: transparent;
  //         }
  //         `}
  //       </style>
  //       <div className="file-directory-header">
  //         <PageTitle title="Links" />
  //       </div>
  //       <hr className="file-directory-underline" />
  //       <div>
  //         <FeaturedEvents />
  //       </div>
  //     </aside>
  //   </Example>
  // );

  return (
    <Example>
      <div className="flex-row">
        <div className="">
          <main className="xl:pl-[calc(22%+4rem)] w-full min-h-screen bg-gray-100">
            <div className="flex flex-col items-start px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <div className="flex items-start w-full justify-between mb-2">
                {/* <h2 className="mb-3 text-3xl font-bold">Links</h2> */}
                <div className="flex items-center w-full justify-end mb-4">
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
  
          <aside className="fixed bottom-0 hidden w-1/4 px-4 py-6 overflow-y-auto left-20 top-16 sm:px-6 lg:px-8 xl:block">
            <style>
              {`
                aside::-webkit-scrollbar {
                  width: 0px !important;
                  background: transparent !important;
                }
                aside {
                  scrollbar-width: none !important; /* For Firefox */
                  -ms-overflow-style: none;  /* IE and Edge */
                }
              `}
            </style>
            <div className="file-directory-header">
              <PageTitle title="Links" />
            </div>
            <hr className="file-directory-underline" />
            <div>
              <FeaturedEvents />
            </div>
          </aside>
        </div>
      </div>
    </Example>
  );
  
};

export default Settings;
