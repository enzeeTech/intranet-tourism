import React from 'react';

const handleClick = () => {
    window.location.href = 'https://www.netflix.com/browse';}


class NotificationPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'all', // Default active tab is 'all'
            notifications: [
                // ... Your notifications array
                {
                    id: 1,
                    imageSrc: "/assets/smile.jpg",
                    miniIcon: "/assets/noti-icon-react/home_I.svg",
                    users: "Nyet",
                    orangeball: "/assets/orangeball.png",
                    message: "Your request to change the Organisational chart picture was 1 ",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 1,
                    read: true
                },
                {
                    id: 2,
                    imageSrc: "/assets/smile.jpg",
                    miniIcon: "/assets/",
                    users: "Nyet",
                    orangeball: "/assets/orangeball.png",
                    message: "Your request to change the Organisational chart picture was 2 ",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 3,
                    read: false
                },
                {
                    id: 3,
                    imageSrc: "/assets/smile.jpg",
                    miniIcon: "/assets/smile.jpg",
                    users: "Nyet",
                    orangeball: "/assets/orangeball.png",
                    message: "Your request to change the Organisational chart picture was 3  ",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 1,
                    read: true
                },
                {
                    id: 4,
                    imageSrc: "/assets/smile.jpg",
                    miniIcon: "/assets/comment.svg",
                    orangeball: "/assets/orangeball.png",
                    users: "Nyet",
                    message: "Your request to change the Organisational chart picture was 4 ",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 2,
                    read: false
                },
                {
                    id: 5,
                    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
                    miniIcon: "/assets/birthday.svg",
                    orangeball: "/assets/orangeball.png",
                    users: "Nyet",
                    message: "Your request to change the Organisational chart picture was 5 ",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 2,
                    read: true
                },
                {
                    id: 6,
                    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
                    miniIcon: "/assets/comment.svg",
                    orangeball: "/assets/orangeball.png",
                    users: "Nyet",
                    message: "Your request to change the Organisational chart picture was 6 ",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 1,
                    read: false
                },
                {
                    id: 7,
                    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
                    miniIcon: "/assets/birthday.svg",
                    users: "Nyet",
                    message: "Your request to change the Organisational chart picture was 7 ",
                    orangeball: "/assets/orangeball.png",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 3,
                    read: false
                },
            ]
        };
    }

    handleTabChange = tab => {
        this.setState({ activeTab: tab });
    };

    render() {
        const { activeTab, notifications } = this.state;

        // Filter notifications based on the active tab
        const filteredNotifications =
            activeTab === 'all'
                ? notifications.slice(0, 4) // Only display the first 4 notifications for 'all' tab
                : notifications.filter(notification => !notification.read);

        return (
            <div className="absolute right-0 mt-2 w-[360px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <style>{`
                    .notification-message {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-height: 3em; /* Adjust as needed to match the line height */
                        line-height: 1.2em; /* Adjust this value to reduce the line gap */
                    }
                    .tab-button {
                        margin-left: 10px;
                        border-bottom: 2px solid transparent;
                        color: gray;
                        background: none;
                        border: none;
                        cursor: pointer;
                        padding: 0;
                        text-decoration: none;
                        position: relative;
                    }
                    .tab-button.active {
                        border-bottom: 2px solid black;
                        color: black;
                        underline: 2px solid black;
                    }
                    .orange-circle {
                        position: absolute;
                        top: 0;
                        right: -10px;
                        width: 7px;
                        height: 7px;
                        background-color:#FF4500;
                        border-radius: 50%;
                        margin-top: 10px; /* Tailwind equivalent of mt-4 */
                    }
                `}</style>

                <h2 style={{ marginLeft: "10px", marginTop: "10px", color: "#222222", fontSize: "24px" }}>
                    {activeTab === 'all' ? <strong>All Notifications</strong> : <strong>Unread Notifications</strong>}
                </h2>
                <ul className="flex flex-row gap-2">
                    <li>
                        <button
                            onClick={() => this.handleTabChange('all')}
                            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                        >
                            All
                        </button>
                    </li>
                    <li className="relative">
                        <button
                            onClick={() => this.handleTabChange('unread')}
                            className={`tab-button ${activeTab === 'unread' ? 'active' : ''}`}
                        >
                            Unread
                            <span
                                className={ `orange-circle ${activeTab === 'unread' ? 'opacity-100' : 'opacity-50'}`}
                            />
                        </button>
                    </li>
                </ul>
                <br />
                <div className="notification-list mb-4">
                    <ul>
                        {filteredNotifications.map(notification => (
                            <div className="flex flex-row gap-2 mb-4 hover:bg-blue-100 items-center" key={notification.id}>
                                <div className="flex items-center bg-gray h-16">
                                    <img className="h-14 w-14 ml-4" src={notification.imageSrc} alt="" 
                                        style={{
                                            height: "80px",
                                            width: "80px",
                                            borderRadius: "100%"
                                        }} 
                                    />
                                    {notification.status === 1 && (
                                        <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/birthday.svg" alt="" />
                                    )}
                                    {notification.status === 2 && (
                                        <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/love.svg" alt="" />
                                    )}
                                    {notification.status === 3 && (
                                        <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/comment.svg" alt="" />
                                    )}
                                </div>
                                <div className='flex flex-col w-48 h-50 ml-4'>
                                    <div className="block px-2 py-1 text-sm font-bold">{notification.users}</div>
                                    <div className="block px-2 py-1 text-sm notification-message">{notification.message}</div>
                                    <div className="block px-2 py-1 text-sm font-medium text-neutral-800 text-opacity-50">{notification.timeAgo}</div>
                                </div>
                                

                                <div>
                                    {!notification.read && (
                                        <img
                                            src="/assets/orangeball.png"
                                            alt="Unread"
                                            style={{ width: '10px', height: '10px', marginLeft: '10px' }}
                                        />
                                    )}
                                </div>

                            </div>
                            
                        ))}

                    </ul>

                </div>
                <div onClick={handleClick} className='flex flex-row font-bold bg-slaute-400 h-10 px-2  w-full gap-2 cursor-pointer hover:bg-slate-200 rounded-lg items-center'>
                    View All<img className="h-8 w-8" src="/assets/viewall.svg" />
                    
                </div>
            </div>
        );
    }
}

export default NotificationPopup;
