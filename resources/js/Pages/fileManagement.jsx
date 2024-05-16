import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import SearchFile from '../Components/Reusable/FileManagementSearchBar';
import { FileTable } from '@/Components/FileManagement';
import './css/StaffDirectory.css';
import '../Components/Reusable/css/FileManagementSearchBar.css';




const FileManage = () => {


  return (
    <div className="file-directory">
      <div>
        <div className="file-directory-header">
          <PageTitle title="Files" />
        </div>
        <hr className="file-directory-underline" />
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
    </div>
  );
};
  
export default FileManage;
