// import React from 'react';
// import PageTitle from '../Components/Reusable/PageTitle';
// import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
// import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
// import './css/StaffDirectory.css';
// import Example from '../Layouts/DashboardLayoutNew';
// import { StoryNew } from '@/Components/Dashboard';
// import { ShareYourThoughts } from '@/Components/Reusable/WallPosting';
// import { Filter } from '@/Components/Reusable/WallPosting';
// import { OutputData } from '@/Components/Reusable/WallPosting';
// import MyComponent from '@/Components/Reusable/CommunitySide';

// const Dashboard = () => {


//   return (
//     <Example>
//       <main className="xl:pl-[calc(22%+4rem)] xl:pr-[calc(25%+2rem)]">
//         <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col items-center">
//             {/* <Stories /> */}
//             <StoryNew />
//             <ShareYourThoughts />
//             <Filter />
//             <div className="mb-20"></div>
//             <OutputData />
//         </div>
//       </main>

//       <aside className="fixed bottom-0 left-20 top-16 hidden w-1/4 border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-3 xl:block ">
//         <div className="file-directory-header">
//           <PageTitle title="My Wall" />
//         </div>
//         <hr className="file-directory-underline" />
//         <div>
//           <FeaturedEvents />
//           <WhosOnline />
//         </div>
//       </aside>

//       <aside className="fixed bottom-0 right-0 top-16 hidden w-1/4 border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
//         <div>
//           <MyComponent />
//         </div>
//       </aside>
//     </Example>
//   );
// };

// export default Dashboard;




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

//   return (
//     <Example>
//       <main className="xl:pl-[calc(22%+4rem)] xl:pr-[calc(25%+2rem)]">
//         <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col items-center">
//           <StoryNew />
//           <ShareYourThoughts onCreatePoll={handleCreatePoll} />
//           <Filter />
//           <div className="mb-20"></div>
//           {/* <OutputPoll polls={polls} /> */}
//           <OutputData polls={polls} />
//         </div>
//       </main>
//       <aside className="fixed bottom-0 left-20 top-16 hidden w-1/4 border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-3 xl:block">
//         <div className="file-directory-header">
//           <PageTitle title="My Wall" />
//         </div>
//         <hr className="file-directory-underline" />
//         <div>
//           <FeaturedEvents />
//           <WhosOnline />
//         </div>
//       </aside>
//       <aside className="fixed bottom-0 right-0 top-16 hidden w-1/4 border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
//         <div>
//           <MyComponent />
//         </div>
//       </aside>
//     </Example>
//   );
// };

// export default Dashboard;




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
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col items-center">
          <StoryNew />
          <ShareYourThoughts onCreatePoll={handleCreatePoll} />
          <Filter />
          <div className="mb-20"></div>
          <OutputData polls={polls} />
        </div>
      </main>
      <aside className="fixed bottom-0 left-20 top-16 hidden w-1/4 border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-3 xl:block">
        <div className="file-directory-header">
          <PageTitle title="My Wall" />
        </div>
        <hr className="file-directory-underline" />
        <div>
          <FeaturedEvents />
          <WhosOnline />
        </div>
      </aside>
      <aside className="fixed bottom-0 right-0 top-16 hidden w-1/4 border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <div>
          <MyComponent />
        </div>
      </aside>
    </Example>
  );
};

export default Dashboard;
