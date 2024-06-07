import React from 'react';
import '../css/UserAvatar.css';

const UserAvatar = ({ name, avatar }) => {
  return (
    <div className="user-avatar">
      <img src={avatar} alt={name} className="avatar-image" />
      <div className="user-name">{name}</div>
    </div>
  );
};

export default UserAvatar;