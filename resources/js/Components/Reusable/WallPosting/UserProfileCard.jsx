// UserProfileCard.jsx
import React from 'react';

const UserProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="user-profile-card">
      <img src={user.avatar} alt={`${user.name}'s avatar`} className="user-avatar" />
      <div className="user-info">
        <h4>{user.name}</h4>
        <p>{user.bio}</p>
        {/* Add any other user information you'd like to display */}
      </div>
    </div>
  );
};

export default UserProfileCard;
