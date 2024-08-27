import React, { useState } from 'react';
import './index.css'

const MentionedName = ({ name, userId }) => {
    const [profileData, setProfileData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const fetchProfileData = async () => {
        if (!profileData) {
            try {
                const response = await fetch(`/api/users/users/${userId}?with[]=profile`);
                const data = await response.json();
                setProfileData(data.data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        }
    };

    return (
        <span 
            className="tagged-text text-blue-500"
            onMouseEnter={() => { 
                setShowPopup(true);
                fetchProfileData();
            }}
            onMouseLeave={() => setShowPopup(false)}
        >
            @{name}
            {showPopup && profileData && (
                <div className="profile-popup">
                    {/* Profile Popup Content */}
                    <img src={profileData.profile.image} alt={profileData.name} />
                    <div>
                        <h4>{profileData.name}</h4>
                        <p>{profileData.profile.bio}</p>
                        <p>@{profileData.username}</p>
                    </div>
                </div>
            )}
        </span>
    );
};

export default MentionedName;
