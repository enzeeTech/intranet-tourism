import LogoUploader from "./BasicSettings";
import ThemeComponent from "./Themes";
import { CoreFeatures, SizeLimit, Media, CoverPhotos, MailSettings } from "./AdvanceSettings";
import Departments from "./Departments";
import Requests from "./Requests";
import { AuditSearch, AuditCalendar, AuditTrailTable } from "./AuditTrail";
import Feedback from "./Feedback";
import Pautan from "./Pautan";



const SettingsPage = ({ currentPage }) => {
  const handleSave = (selectedImage) => {
    console.log('Selected image:', selectedImage);
  };

  return (
    <div>
      <h1 className="hidden">{currentPage}</h1>
      {currentPage === 'Basic Settings' && <LogoUploader onSave={handleSave} />}
      {currentPage === 'Themes' && <ThemeComponent onSave={handleSave} />}
      {currentPage === 'Advance Settings' && (
        <>
          <CoreFeatures onSave={handleSave} />
          <SizeLimit onSave={handleSave} />
          <Media onSave={handleSave} />
          <CoverPhotos onSave={handleSave} />
          <MailSettings onSave={handleSave} />
        </>
      )}
      {currentPage === 'Departments' && <Departments onSave={handleSave} />}
      {currentPage === 'Media' && <div></div>}
      {currentPage === 'Requests' && <Requests/>}
      {currentPage === 'Audit Trail' &&
        <>
          <AuditSearch onSave={handleSave} />
          <AuditTrailTable onSave={handleSave} />
        </>}
      {currentPage === 'Feedback' && <Feedback/>}
      {currentPage === 'Birthday Template' && <div></div>}
      {currentPage === 'Pautan' && <Pautan/>}
    </div>
  );
};

export { SettingsPage, LogoUploader, ThemeComponent, CoreFeatures, SizeLimit, Media, CoverPhotos, MailSettings, Departments, Requests, AuditSearch, AuditCalendar, AuditTrailTable, Pautan };
