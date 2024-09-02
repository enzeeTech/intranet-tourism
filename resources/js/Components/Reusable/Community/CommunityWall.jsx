import * as React from 'react';
import { useState, useEffect } from 'react';
import CmMembers from './CommunityMembers';
import { ShareYourThoughts, Filter, OutputData } from '@/Components/Reusable/WallPosting';
import { SearchInput, SearchButton, Table } from "../../ProfileTabbar";
import { ImageProfile, VideoProfile } from "../../ProfileTabbar/Gallery";
import EditCommunity from './EditCommunity';
import { useCsrf } from "@/composables";
import { usePage } from '@inertiajs/react';
import { add } from 'date-fns';

function HeaderSection({ communityID, departmentHeader, departmentBanner, departmentDescription, onEditClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    setTextContent(departmentDescription || ''); // Ensure textContent is always a string
  }, [departmentDescription]);

  const handleEditClick = () => {
    onEditClick(true); // Notify parent to open the edit popup
  };

  const handleInputChange = (e) => {
    setTextContent(e.target.value);
  };

  const handleSaveClick = async () => {
    try {
      const updatedDescription = textContent;

      const response = await fetch(`/api/communities/communities/${communityID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: updatedDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to update description');
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  // console.log(departmentBanner);

  // Check if departmentBanner is defined and a string
  let banner = null;
  if (typeof departmentBanner === 'string' && departmentBanner.startsWith('banner/')) {
    banner = `/storage/${departmentBanner}`;
  } else {
    banner = departmentBanner || '/assets/defaultCommunity.png';
  }

  return (
    <header className="flex overflow-hidden relative flex-col px-11 py-9 w-[875px] h-[291.67px] text-white max-md:px-5 w-full rounded-t-xl max-md:-mt-12">
      <img
        loading="lazy"
        src={banner}
        className="absolute inset-0 object-cover size-full"
        alt=""
      />
      <div className="relative flex justify-between w-full gap-0 py-2 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold drop-shadow-lg text-start shadow-neutral-100">{departmentHeader}</h1>
        </div>
        <div className="flex content-center self-start justify-between gap-5 text-sm font-medium">
        </div>
      </div>
      <div className="relative -mt-2 font-medium text-md max-md:max-w-full drop-shadow-lg">
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
          <button className="flex items-center justify-center w-8 h-8 px-1 py-1 mb-4 text-white bg-blue-500 rounded-full" onClick={handleEditClick}>
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


function Navigation({ userId, communityID, departmentName, type}) {
  const [activeTab, setActiveTab] = useState('Post'); 
  const [polls, setPolls] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const csrfToken = useCsrf();
  const {props} = usePage();
  const {id} = props;
 


  useEffect(() => {
    const checkMembership = async () => {
      try {
        const url = `api/communities/community_members?user_id=${id}`;
        const response = await fetch (url, {
          method: 'GET',
          headers: { Accept: 'application/json', 'X-CSRF-Token': csrfToken },
        })
        if (response.ok) {
          const data = await response.json();
          const isMember = data.some((member) => String(member.community_id) === String(communityID));
          setHasJoined(isMember);
        } else {
          console.error('Failed to fetch membership data');
        }
      } catch (error) {
        console.error('Error checking membership:', error);
      }
    };

    checkMembership();
  }, [id, communityID]);


  const handleCreatePoll = (poll) => {
    setPolls((prevPolls) => [...prevPolls, poll]);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const addPublicMember = async () => {
    const url = `api/communities/community_members`;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', "X-CSRF-Token": csrfToken },
        };

        const body={
            community_id: communityID,
            user_id: String(id),
        }

        try {
            const response = await fetch(url, { ...options, body: JSON.stringify(body) });
            if (response.ok) {
                console.log('Member added successfully');
            } else {
                throw new Error('Failed to add member');
            }
        }
        catch (error) {
            console.error('Error adding member:', error);
        }
  };

  // Dummy functions
  const handleJoin = () => {
    if (!hasJoined) {
      addPublicMember();
    }
  };

  const handleAddMember = () => {
    console.log('Add Member function triggered');
  };

  return (
    <div className="flex flex-col">
      <nav className="flex items-start w-full gap-5 py-6 text-sm font-semibold text-center bg-white shadow-custom px-9 rounded-b-2xl text-stone-300 max-md:flex-wrap max-md:max-w-full">
        <div className={`cursor-pointer ${activeTab === 'Post' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Post')}>Post</div>
        <div className={`cursor-pointer ${activeTab === 'Gallery' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Gallery')}>Gallery</div>
        <div className={`cursor-pointer ${activeTab === 'Files' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Files')}>Files</div>
        <div className={`cursor-pointer ${activeTab === 'Members' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Members')}>Members</div>
        <div className="ml-auto">
          {type === 'public' ? (
            <button
              className={`px-4 py-2 text-white rounded-full ${
                hasJoined ? 'bg-[#FF5437]' : 'bg-[#FF5437] hover:bg-red-700'
              }`}
              onClick={handleJoin}
              disabled={hasJoined}
            >
              {hasJoined ? 'Already Joined' : 'Join'}
            </button>
          ) : (
            <button className="px-4 py-2 text-white bg-[#FF5437] rounded-full hover:bg-red-700" onClick={handleAddMember}>
              Invite
            </button>
          )}
        </div>
      </nav>

      <div className="relative">
        {activeTab === 'Members' && (
          <div className="flex justify-center w-full mt-4">
            <div className="max-w-[900px] w-full border-inherit rounded-2xl shadow-2xl">
              <CmMembers communityID={communityID}/>
            </div>
          </div>
        )}

        {activeTab === "Files" && (
          <div>
            <div className="flex gap-4 ml-12 whitespace-nowrap">
              <SearchInput />
              <SearchButton />
            </div>
            <Table departmentID={communityID} />
          </div>
        )}

        {activeTab === "Gallery" && (
          <section>
            <ImageProfile selectedItem="All" accessableType="Department" accessableId={communityID} filterBy="department" />
            <VideoProfile selectedItem="All" accessableType="Department" accessableId={communityID} filterBy="department" />
          </section>
        )}

        {activeTab === 'Post' && (
          <div className="flex flex-col max-w-[1000px] shadow-2xl pb-6 rounded-xl mt-6">
            <div className="max-w-[875px] w-full whitespace-nowrap absolute content-items ">
              <ShareYourThoughts userId={userId} onCreatePoll={handleCreatePoll} includeAccessibilities={true} filterType="Department" filterId={communityID} />
              <Filter /><br />
              <OutputData polls={polls} filterType="Department" filterId={communityID} departmentName={departmentName} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Adminsection({ communityID, departmentHeader, departmentDescription, userId, type, departmentBanner }) {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [departmentData, setDepartmentData] = useState(null);

  useEffect(() => {
    // Fetch the department data here
    const fetchDepartmentData = async () => {
      try {
        const response = await fetch(`/api/communities/communities/${communityID}`); // Use departmentID

        if (!response.ok) {
          throw new Error('Failed to fetch department data');
        }

        const department = await response.json();
        setDepartmentData(department.data);
      } catch (error) {
        console.error('Error fetching department data:', error);
      }
    };

    fetchDepartmentData();
  }, [communityID]);

  // console.log("DEPARTMENT BANNER", departmentBanner);
  console.log("COMMUNITY ID", communityID);

  const handleEditClick = (isOpen) => {
    setIsEditPopupOpen(isOpen);
  };

  const handleSave = (updatedDepartment) => {
    setDepartmentData(updatedDepartment);
    setIsEditPopupOpen(false);
    // window.location.reload(true);
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
        communityID={communityID}
        departmentHeader={departmentHeader}
        departmentBanner={departmentBanner} // Use departmentData.banner here
        departmentDescription={departmentDescription}
        onEditClick={handleEditClick}
      />
      <Navigation communityID={communityID} userId={userId} departmentName={departmentHeader} type={type} />
      {isEditPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <EditCommunity
            department={departmentData}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}


export default function CommunityWall({ communityID, departmentHeader, departmentDescription, departmentBanner, type, userId }) {
  return (
    <div className="flex flex-wrap mx-auto my-20 text-black justify-left max-w-7xl gap-y-10">
      <Adminsection
        communityID={communityID}
        departmentHeader={departmentHeader}
        departmentDescription={departmentDescription}
        departmentBanner={departmentBanner}
        type={type}
        userId={userId}
      />
    </div>
  );
}