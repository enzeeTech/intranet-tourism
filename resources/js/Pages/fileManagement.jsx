import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import SearchFile from '../Components/Reusable/FileManagementSearchBar';
import { FileTable } from '@/Components/FileManagement';
import DepartmentDropdown from '../Components/Reusable/DropdownStaffDirectory';
import StaffMemberCard from '../Components/Reusable/StaffMemberCard';
import DeactivateModal from '../Components/Reusable/DeactivateModal';
import './css/StaffDirectory.css';




const FileManage = () => {


  return (
    <div className="staff-directory">
      <div>
        <div className="staff-directory-header">
          <PageTitle title="Files" />
        </div>
        <hr className="staff-directory-underline" />
        <div className="widgets-container">
          <div className="left-widget">
            <FeaturedEvents />
            <WhosOnline />
          </div>
          <div className="right-widget">
            <SearchFile />
      <FileTable />

          </div>

        </div>
      </div>
      {/* <DeactivateModal 
        isOpen={isDeactivateModalOpen}
        onClose={closeDeactivateModal}
        onConfirm={() => console.log('Deactivated')}
      /> */}
    </div>
  );
};
  
export default FileManage;
