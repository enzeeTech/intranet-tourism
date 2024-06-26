import React from 'react';
import '../css/UserAvatar.css';
import dummyProfilePic from '../../../../../public/assets/dummyProfilePic.png';

const UserAvatar = ({ name, avatar }) => {
  return (
    <div className="user-avatar">
      <img src={dummyProfilePic} alt={name} className="avatar-image" />
      <div className="user-name">{name}</div>
    </div>
  );
};

export default UserAvatar;
