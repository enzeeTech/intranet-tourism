import React, { useState, useEffect } from 'react';
import UserAvatar from './UserAvatar';
import '../css/WhosOnline.css';
import dummyProfilePic from '../../../../../public/assets/dummyProfilePic.png';
import arrowRight from '../../../../../public/assets/viewAllArrow.png';
import "@fontsource/nunito-sans"; // Defaults to weight 400
import "@fontsource/nunito-sans/400.css"; // Specify weight
import "@fontsource/nunito-sans/400-italic.css"; // Specify weight and style
import { createPortal } from 'react-dom';

const Tooltip = ({ item, position }) => {
    const tooltipStyles = {
        position: 'fixed',
        left: `${position.left + position.width / 2}px`,
        top: `${position.bottom}px`,
        transform: 'translateX(-50%)', // Center horizontally
        marginTop: '0.5rem', // Space between the avatar and the tooltip
        backgroundColor: '#1a1a1a',
        color: '#fff',
        fontSize: '0.75rem',
        borderRadius: '0.25rem',
        padding: '0.5rem',
        zIndex: 9999,
        whiteSpace: 'nowrap',
    };


    return createPortal(
        <div style={tooltipStyles}>
            {item.name}
        </div>,
        document.body
    );
};

const WhosOnline = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [tooltip, setTooltip] = useState({ visible: false, user: null, position: {} });

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

        return () => {
            channel.leave();
        };
    }, []);

    const handleMouseEnter = (event, user) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltip({
            visible: true,
            user,
            position: rect,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, user: null, position: {} });
    };

    return (
        <div className="whos-online-container border-2 shadow-2xl flex-col justify-start">
            <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '4px', fontFamily: "Nunito Sans" }}>
                Who's Online
            </h2>
            <hr style={{ marginTop: '5px', marginBottom: '5px',}} className="underline" />
            <div className="online-users text-left flex justify-start pb-2">
                {onlineUsers.map((user, index) => (
                    <div
                        key={index}
                        onMouseEnter={(event) => handleMouseEnter(event, user)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <UserAvatar {...user} ID_USER={user.id} />
                    </div>
                ))}
            </div>
            <hr style={{ marginTop: '5px', marginBottom: '5px' }} className="underline" />
            <a href="../onlinelist">
                <button style={{ fontFamily: "Nunito Sans" }} className="view-all-btn">
                    VIEW ALL
                    <img src={arrowRight} alt="Arrow right" className="arrow-icon" />
                </button>
            </a>
            {tooltip.visible && <Tooltip item={tooltip.user} position={tooltip.position} />}
        </div>
    );
};

export default WhosOnline;
