import React from 'react';
import { useState, useEffect } from 'react';
import '../css/UserAvatar.css';
import dummyProfilePic from '../../../../../public/assets/dummyProfilePic.png';

const UserAvatar = ({ name, ID_USER }) => {

  const [isUserProfile, setIsUserProfile]=useState({
    image: ""
  });

  useEffect(() => {
    fetch(`/api/users/users/${ID_USER}?with[]=profile`, {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(({ data }) => {
          setIsUserProfile({
                ...data,
                image: data.profile?.image,
            });
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
}, [ID_USER]);

const source = () => {
  if (!isUserProfile.image) {
      return `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${isUserProfile.name}&rounded=true`;
  }

  return isUserProfile.image === '/assets/dummyStaffPlaceHolder.jpg'
      ? isUserProfile.image
      : isUserProfile.image.startsWith('avatar/')
      ? `/storage/${isUserProfile.image}`
      : `/avatar/${isUserProfile.image}`;
};
  
  return (
    <div className="user-avatar">
      <img src={source()} alt={name} className="avatar-image" />
      <div className="user-name text-start">{name}</div>
    </div>
  );
};

export default UserAvatar;
