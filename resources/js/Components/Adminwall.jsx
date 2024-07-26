// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import DpMembers from '../Components/DepartmentCom/DepartmentMembers';
// import { ShareYourThoughts, Filter, OutputData } from '@/Components/Reusable/WallPosting';
// import { SearchInput, SearchButton, Table } from "../Components/ProfileTabbar";
// import { ImageProfile, VideoProfile } from "../Components/ProfileTabbar/Gallery";

// function HeaderSection({ departmentID, departmentHeader, departmentDescription }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [textContent, setTextContent] = useState('');

//   useEffect(() => {
//     setTextContent(departmentDescription);
//   }, [departmentDescription]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleInputChange = (e) => {
//     const newDescription = e.target.value;
//     setTextContent(newDescription);
//   };

//   const handleSaveClick = async () => {
//     try {
//       const updatedDescription = textContent;

//       const response = await fetch(`/api/crud/departments/${departmentID}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ description: updatedDescription }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update description');
//       }

//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating description:', error);
//     }
//   };

//   return (
//     <header className="flex overflow-hidden relative flex-col px-11 py-9 w-full w-[875px] text-white max-md:px-5 max-md:max-w-full rounded-t-xl">
//       <img
//         loading="lazy"
//         src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdd4e4b7e0f9ec45df838993c39761806ac75e1cc6917f44849c00849e5e2f19?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&"
//         className="absolute inset-0 object-cover size-full"
//         alt=""
//       />
//       <div className="relative flex justify-between w-full gap-5 max-md:flex-wrap max-md:max-w-full">
//         <div className="flex flex-col">
//           <h1 className="text-3xl font-extrabold">{departmentHeader}</h1>
//         </div>
//         <div className="flex content-center self-start justify-between gap-5 text-sm font-medium">
//           <button className="flex flex-row gap-4 my-auto">Group Admin
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/599b835164fff4e10552e23d04cdbdcfdb56df70e81b9264a82c878534e22499?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&"
//               className="w-8 shrink-0 aspect-square"
//               alt="Admin Avatar"
//             />
//           </button>
//         </div>
//       </div>
//       <div className="relative mt-5 text-base font-medium leading-5 max-md:max-w-full">
//         {isEditing ? (
//           <textarea
//             className="w-full h-32 p-2 text-white bg-inherit focus:outline-none focus:ring focus:ring-blue-500"
//             value={textContent}
//             onChange={handleInputChange}
//           />
//         ) : (
//           textContent
//         )}
//       </div>
//       <img
//         loading="lazy"
//         src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4ed48051cb5cb802fc585e5dc4525ddee2547b00e05bf15b875d0202cc7db34?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&"
//         className="mt-6 aspect-square w-[30px]"
//         alt="Section Icon"
//       />
//       <div className="absolute inset-x-0 bottom-0 flex items-center justify-start gap-4 py-4 px-11 max-md:px-5">
//         {isEditing ? (
//           <button className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md" onClick={handleSaveClick}>
//             Save
//           </button>
//         ) : (
//           <button className="flex items-center justify-center w-8 h-8 px-1 py-1 text-white bg-blue-500 rounded-full" onClick={handleEditClick}>
//             <img
//               src="/assets/pencil.svg"
//               alt="Edit Icon"
//               className="w-4 h-4 "
//             />
//           </button>
//         )}
//       </div>
//     </header>
//   );
// }

// function Navigation({ userId, departmentID, departmentName }) {
//   const [activeTab, setActiveTab] = useState('Post'); // Default active tab set to 'Post'
//   const [polls, setPolls] = useState([]);

//   const handleCreatePoll = (poll) => {
//     setPolls((prevPolls) => [...prevPolls, poll]);
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="flex flex-col">
//       <nav className="flex items-start w-full gap-5 py-6 text-sm font-semibold text-center bg-white shadow-custom px-9 rounded-b-2xl text-stone-300 max-md:flex-wrap max-md:max-w-full">
//         <div className={`cursor-pointer ${activeTab === 'Post' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Post')}>Post</div>
//         <div className={`cursor-pointer ${activeTab === 'Gallery' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Gallery')}>Gallery</div>
//         <div className={`cursor-pointer ${activeTab === 'Files' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Files')}>Files</div>
//         <div className={`cursor-pointer ${activeTab === 'Members' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Members')}>Members</div>
//       </nav>

//       <div className="relative">
//         {activeTab === 'Members' && (
//           <div className="flex justify-center w-full mt-4">
//             <div className="max-w-[900px] w-full border-inherit rounded-2xl shadow-2xl">
//               <DpMembers />
//             </div>
//           </div>
//         )}

//         {activeTab === "Files" && (
//           <div>
//             <div className="flex gap-4 ml-12 whitespace-nowrap">
//               <SearchInput />
//               <SearchButton />
//             </div>
//             <Table departmentID={departmentID} />
//           </div>
//         )}

//         {activeTab === "Gallery" && (
//           <section>
//             <ImageProfile selectedItem="All" />
//             <VideoProfile selectedItem="All" />
//           </section>
//         )}

//         {activeTab === 'Post' && (
//           <div className="flex flex-col max-w-[900px] shadow-2xl pb-6 rounded-xl mt-6">
//             <div className="max-w-[875px] w-full whitespace-nowrap absolute content-items">
//               <ShareYourThoughts userId={userId} postType={`department_${departmentID}`} onCreatePoll={handleCreatePoll} />
//               <Filter /><br />
//               <OutputData polls={polls} filterType={`department_${departmentID}`} departmentName={departmentName} />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// function Adminsection({ departmentID, departmentHeader, departmentDescription, userId }) {
//   return (
//     <div className='w-[875px]'>
//       <HeaderSection
//         departmentID={departmentID}
//         departmentHeader={departmentHeader}
//         departmentDescription={departmentDescription}
//       />
//       <Navigation departmentID={departmentID} userId={userId} departmentName={departmentHeader} />
//     </div>
//   );
// }

// export default Adminsection;

import * as React from 'react';
import { useState, useEffect } from 'react';
import DpMembers from '../Components/DepartmentCom/DepartmentMembers';
import { ShareYourThoughts, Filter, OutputData } from '@/Components/Reusable/WallPosting';
import { SearchInput, SearchButton, Table } from "../Components/ProfileTabbar";
import { ImageProfile, VideoProfile } from "../Components/ProfileTabbar/Gallery";
import EditDepartments from '../Components/Reusable/Departments/EditDepartments'; // Import EditDepartments

function HeaderSection({ departmentID, departmentHeader, departmentDescription, onEditClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    setTextContent(departmentDescription);
  }, [departmentDescription]);

  const handleEditClick = () => {
    onEditClick(true); // Notify parent to open the edit popup
  };

  const handleInputChange = (e) => {
    const newDescription = e.target.value;
    setTextContent(newDescription);
  };

  const handleSaveClick = async () => {
    try {
      const updatedDescription = textContent;

      const response = await fetch(`/api/department/departments/${departmentID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: updatedDescription || '' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update description');
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  return (
    <header className="flex overflow-hidden relative flex-col px-11 py-9 w-full w-[875px] text-white max-md:px-5 max-md:max-w-full rounded-t-xl">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdd4e4b7e0f9ec45df838993c39761806ac75e1cc6917f44849c00849e5e2f19?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&"
        className="absolute inset-0 object-cover size-full"
        alt=""
      />
      <div className="relative flex justify-between w-full gap-5 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold">{departmentHeader}</h1>
        </div>
        <div className="flex content-center self-start justify-between gap-5 text-sm font-medium">
        </div>
      </div>
      <div className="relative mt-5 text-base font-medium leading-5 max-md:max-w-full">
        {isEditing ? (
          <textarea
            className="w-full h-32 p-2 text-white bg-inherit focus:outline-none focus:ring focus:ring-blue-500"
            value={textContent}
            onChange={handleInputChange}
          />
        ) : (
          textContent
        )}
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4ed48051cb5cb802fc585e5dc4525ddee2547b00e05bf15b875d0202cc7db34?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&"
        className="mt-6 aspect-square w-[30px]"
        alt="Section Icon"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-start gap-4 py-4 px-11 max-md:px-5">
        {isEditing ? (
          <button className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button className="flex items-center justify-center w-8 h-8 px-1 py-1 text-white bg-blue-500 rounded-full" onClick={handleEditClick}>
            <img
              src="/assets/pencil.svg"
              alt="Edit Icon"
              className="w-4 h-4 "
            />
          </button>
        )}
      </div>
    </header>
  );
}

function Navigation({ userId, departmentID, departmentName }) {
  const [activeTab, setActiveTab] = useState('Post'); // Default active tab set to 'Post'
  const [polls, setPolls] = useState([]);

  const handleCreatePoll = (poll) => {
    setPolls((prevPolls) => [...prevPolls, poll]);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col">
      <nav className="flex items-start w-full gap-5 py-6 text-sm font-semibold text-center bg-white shadow-custom px-9 rounded-b-2xl text-stone-300 max-md:flex-wrap max-md:max-w-full">
        <div className={`cursor-pointer ${activeTab === 'Post' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Post')}>Post</div>
        <div className={`cursor-pointer ${activeTab === 'Gallery' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Gallery')}>Gallery</div>
        <div className={`cursor-pointer ${activeTab === 'Files' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Files')}>Files</div>
        <div className={`cursor-pointer ${activeTab === 'Members' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Members')}>Members</div>
      </nav>

      <div className="relative">
        {activeTab === 'Members' && (
          <div className="flex justify-center w-full mt-4">
            <div className="max-w-[900px] w-full border-inherit rounded-2xl shadow-2xl">
              <DpMembers />
            </div>
          </div>
        )}

        {activeTab === "Files" && (
          <div>
            <div className="flex gap-4 ml-12 whitespace-nowrap">
              <SearchInput />
              <SearchButton />
            </div>
            <Table departmentID={departmentID} />
          </div>
        )}

        {activeTab === "Gallery" && (
          <section>
            <ImageProfile selectedItem="All" />
            <VideoProfile selectedItem="All" />
          </section>
        )}

        {activeTab === 'Post' && (
          <div className="flex flex-col max-w-[900px] shadow-2xl pb-6 rounded-xl mt-6">
            <div className="max-w-[875px] w-full whitespace-nowrap absolute content-items">
              <ShareYourThoughts userId={userId} postType={`department_${departmentID}`} onCreatePoll={handleCreatePoll} />
              <Filter /><br />
              <OutputData polls={polls} filterType={`department_${departmentID}`} departmentName={departmentName} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function Adminsection({ departmentID, departmentHeader, departmentDescription, userId }) {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [departmentData, setDepartmentData] = useState({
    id: departmentID,
    name: departmentHeader,
    description: departmentDescription,
    banner: '', // Add this line to hold the banner image URL
  });

  const handleEditClick = (isOpen) => {
    setIsEditPopupOpen(isOpen);
  };

  const handleSave = (updatedDepartment) => {
    setDepartmentData(updatedDepartment);
    setIsEditPopupOpen(false);
    window.location.reload(true);
  };

  const handleCancel = () => {
    setIsEditPopupOpen(false);
  };

  useEffect(() => {
    // Fetch the latest department data if required
  }, [isEditPopupOpen]);

  return (
    <div className='w-[875px]'>
      <HeaderSection
        departmentID={departmentID}
        departmentHeader={departmentHeader}
        departmentDescription={departmentDescription}
        onEditClick={handleEditClick}
      />
      <Navigation departmentID={departmentID} userId={userId} departmentName={departmentHeader} />
      {isEditPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <EditDepartments
            department={departmentData}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}

export default function Adminwall({ departmentID, departmentHeader, departmentDescription, userId }) {
  return (
    <div className="flex flex-wrap justify-left py-10 w-[875px] max-md:flex-col max-md:px-0 sm:w-sm">
      <Adminsection
        departmentID={departmentID}
        departmentHeader={departmentHeader}
        departmentDescription={departmentDescription}
        userId={userId}
      />
    </div>
  );
}

