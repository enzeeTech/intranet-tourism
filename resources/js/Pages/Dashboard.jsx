// import React, { useState } from 'react';
// import PageTitle from '../Components/Reusable/PageTitle';
// import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
// import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
// import './css/StaffDirectory.css';
// import Example from '../Layouts/DashboardLayoutNew';
// import { StoryNew } from '@/Components/Dashboard';
// import { ShareYourThoughts, Filter, OutputData, OutputPoll } from '@/Components/Reusable/WallPosting';
// import MyComponent from '@/Components/Reusable/CommunitySide';

// const Dashboard = () => {
//   const [polls, setPolls] = useState([]);

//   const handleCreatePoll = (poll) => {
//     setPolls((prevPolls) => [...prevPolls, poll]);
//   };

// //   return (
// //     <Example>
// //         {/* <main className="xl:pl-[calc(22%+4rem)] xl:pr-[calc(25%+2rem)]">
// //             <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col items-center "> */}
// //             <main className="xl:pl-96">
// //             <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
// //                 <StoryNew />
// //                 <ShareYourThoughts onCreatePoll={handleCreatePoll} />
// //                 <Filter  className="mr-10"/>
// //                 <div className="mb-20"></div>
// //                 <OutputData polls={polls} />
// //             </div>
// //         </main>

// // <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
// //     <style>
// //         {`
// //         aside::-webkit-scrollbar {
// //             width: 0px !important;
// //             background: transparent !important;
// //         }
// //         aside {
// //             scrollbar-width: none !important; /* For Firefox */
// //             -ms-overflow-style: none;  /* IE and Edge */
// //         }
// //         `}
// //     </style>
// //     <div className="file-directory-header">
// //         <PageTitle title="My Wall" />
// //     </div>
// //     <hr className="file-directory-underline" />
// //     <div>
// //         <FeaturedEvents />
// //         <WhosOnline />
// //     </div>
// // </aside>

// //     </Example>
// //   );

// return (
//     <Example>
//       <div className="grid grid-cols-1 xl:grid-cols-layout gap-4">
//         {/* <aside className="hidden xl:block border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8"> */}
//         <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
//           <div className="file-directory-header">
//             <PageTitle title="My Wall" />
//           </div>
//           <hr className="file-directory-underline" />
//           <div>
//             <FeaturedEvents />
//             <WhosOnline />
//           </div>
//         </aside>

//         {/* <main className="col-span-1 xl:col-span-2 px-4 py-10 sm:px-6 lg:px-8 lg:py-6"> */}
//         {/* <main className="xl:pl-[calc(22%+4rem)] xl:pr-[calc(25%+2rem)]"> */}
//         <main className="xl:pl-96">
//              <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col items-center ">
//           <StoryNew />
//           <ShareYourThoughts onCreatePoll={handleCreatePoll} />
//           <Filter className="mr-10" />
//           <div className="mb-20"></div>
//           <OutputData polls={polls} />
//           </div>
//         </main>

// {/* <<<<<<< Updated upstream */}
// <aside className="fixed bottom-0 left-20 top-16 hidden w-1/4 overflow-y-auto  px-4 py-6 sm:px-6 lg:px-8 xl:block">
//     <style>
//         {`
//         aside::-webkit-scrollbar {
//             width: 0px !important;
//             background: transparent !important;
//         }
//         aside {
//             scrollbar-width: none !important; /* For Firefox */
//             -ms-overflow-style: none;  /* IE and Edge */
//         }
//         `}
//     </style>
//     <div className="file-directory-header">
//         <PageTitle title="My Wall" />
//     </div>
//     <hr className="file-directory-underline" />
//     <div>
//         <FeaturedEvents />
//         <WhosOnline />
//     </div>
// </aside>

//         <aside className="fixed bottom-0 right-0 top-16 hidden w-1/5 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-4 xl:block">

//             <div>
//                 <MyComponent />
//             </div>

//         {/* <aside className="fixed bottom-0 right-0 top-16 xl:block border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8">
//         <aside className="hidden xl:block border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8">
//         <aside className="fixed bottom-0 -right-16 top-16 w-1/4 border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
//           <div>
//           <MyComponent />
//           </div> */}

//         </aside>
//       </div>
//     </Example>
//   );
// };
// export default Dashboard;

// {/* <aside className="fixed bottom-0 right-0 top-16 hidden w-1/4 border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
//     <div>
//         <MyComponent />
//     </div>
// </aside> */}



import React, { useState } from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import './css/StaffDirectory.css';
import Example from '../Layouts/DashboardLayoutNew';
import { StoryNew } from '@/Components/Dashboard';
import { ShareYourThoughts, Filter, OutputData, OutputPoll } from '@/Components/Reusable/WallPosting';
import MyComponent from '@/Components/Reusable/CommunitySide';

const Dashboard = () => {
  const [polls, setPolls] = useState([]);

  const handleCreatePoll = (poll) => {
    setPolls((prevPolls) => [...prevPolls, poll]);
  };

  return (
    <Example>
        <main className="xl:pl-[calc(22%+4rem)] xl:pr-[calc(25%+2rem)]">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col items-center ">
                <StoryNew />
                <ShareYourThoughts onCreatePoll={handleCreatePoll} />
                <Filter  className="mr-10"/>
                <div className="mb-20"></div>
                <OutputData polls={polls} />
            </div>
        </main>

<aside className="fixed bottom-0 left-20 top-16 hidden w-1/4 overflow-y-auto  px-4 py-6 sm:px-6 lg:px-8 xl:block">
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
        <PageTitle title="My Wall" />
    </div>
    <hr className="file-directory-underline" />
    <div>
        <FeaturedEvents />
        <WhosOnline />
    </div>
</aside>

        <aside className="fixed bottom-0 right-0 top-16 hidden w-1/5 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-4 xl:block">

            <div>
                <MyComponent />
            </div>
        </aside>
    </Example>
  );
};

export default Dashboard;
