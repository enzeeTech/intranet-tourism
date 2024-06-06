import React from 'react';
import UserAvatar from './UserAvatar';
import '../css/WhosOnline.css';
import dummyProfilePic from '../../../../../public/assets/dummyProfilePic.png';
import arrowRight from '../../../../../public/assets/viewAllArrow.png';
import "@fontsource/nunito-sans"; // Defaults to weight 400
import "@fontsource/nunito-sans/400.css"; // Specify weight
import "@fontsource/nunito-sans/400-italic.css"; // Specify weight and style


const onlineUsers = [
  // This array should come from your backend or passed as props
  { name: 'Aisha', avatar: dummyProfilePic },
  { name: 'Thomas', avatar: dummyProfilePic },
  { name: 'Fareez', avatar: dummyProfilePic },
  { name: 'Sarah', avatar: dummyProfilePic },
  { name: 'Nik', avatar: dummyProfilePic}
];

const WhosOnline = () => {
  return (
    <div className="whos-online-container">
      <h2 style={{fontWeight: 'bold', fontSize: '24px', marginBottom: '4px', fontFamily: "Nunito Sans"}}>Who's Online</h2>
      <hr style={{marginTop: '5px', marginBottom: '5px'}} className="underline" />
      <div className="online-users">
        {onlineUsers.map((user, index) => (
          <UserAvatar key={index} {...user} />
        ))}
      </div>
      <hr style={{marginTop: '5px', marginBottom: '5px'}} className="underline" />
      <a href="../onlinelist"> <button style={{fontFamily: "Nunito Sans"}} className="view-all-btn"  >
        VIEW ALL
        <img src={arrowRight} alt="Arrow right" className="arrow-icon" />
      </button></a>
    </div>
  );
};

export default WhosOnline;
