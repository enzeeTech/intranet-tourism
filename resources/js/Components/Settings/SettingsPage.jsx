import React from 'react';


const SettingsPage = ({ currentPage }) => {
    return (
        <div>
            <h1>{currentPage}</h1>
            {currentPage === 'Basic Settings' && <div></div>}





            {currentPage === 'Themes' && <div></div>}





            {currentPage === 'Advance Settings' && <div></div>}





            {currentPage === 'Department' && <div></div>}





            {currentPage === 'Media' && <div></div>}





            {currentPage === 'Requests' && <div></div>}





            {currentPage === 'Audit Trail' && <div></div>}





            {currentPage === 'Feedback' && <div></div>}





            {currentPage === 'Birthday Template' && <div></div>}




            
            {currentPage === 'Pautan' && <div></div>}
        </div>
    );
};

export default SettingsPage;

