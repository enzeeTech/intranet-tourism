import React, { useState, useEffect } from 'react';
import UserAvatar from './UserAvatar';
import '../css/WhosOnline.css';
import dummyProfilePic from '../../../../../public/assets/dummyProfilePic.png'
import arrowRight from '../../../../../public/assets/viewAllArrow.png';
import "@fontsource/nunito-sans"; // Defaults to weight 400
import "@fontsource/nunito-sans/400.css"; // Specify weight
import "@fontsource/nunito-sans/400-italic.css"; // Specify weight and style

const WhosOnline = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const channel = window.Echo.join("online")
            .here((users) => {
                setOnlineUsers(users.map(user => ({ ...user, avatar: dummyProfilePic })));
            })
            .joining((user) => {
                setOnlineUsers(prevOnlineUsers => [...prevOnlineUsers, { ...user, avatar: dummyProfilePic }]);
            })
            .leaving((user) => {
                setOnlineUsers(prevOnlineUsers => prevOnlineUsers.filter(onlineUser => onlineUser.id !== user.id));
            });

            // console.log("USER_ID", onlineUsers.id);
        // Cleanup function to leave the channel when the component unmounts
        return () => {
            channel.leave();
        };
        
    }, []);
    

    return (
        <div className="whos-online-container border-2 shadow-2xl flex-col justify-start">
            <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '4px', fontFamily: "Nunito Sans" }}>
                Who's Online
            </h2>
            <hr style={{ marginTop: '5px', marginBottom: '5px',}} className="underline" />
            <div className="online-users text-left flex justify-start">
                {onlineUsers.map((user, index) => (
                    console.log("USERRRR", user),
                    console.log("USER_ID", user.id),
                    <UserAvatar key={index} {...user} ID_USER={user.id} />
                ))}
            </div>
            <hr style={{ marginTop: '5px', marginBottom: '5px' }} className="underline" />
            <a href="../onlinelist">
                <button style={{ fontFamily: "Nunito Sans" }} className="view-all-btn">
                    VIEW ALL
                    <img src={arrowRight} alt="Arrow right" className="arrow-icon" />
                </button>
            </a>
        </div>
    );
};

export default WhosOnline;
