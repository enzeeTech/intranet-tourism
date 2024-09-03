import React from 'react';
import NotiComp from './NotiComp';

const handleClick = () => {
    window.location.href = '../notification';
};

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
                    miniIcon: "",
                    users: "Jonathan and sarep",
                    orangeball: "/assets/orangeball.png",
                    message: "also commented on your post hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee. ",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 3,
                    read: true
                },
                {
                    id: 2,
                    imageSrc: "/assets/smile.jpg",
                    miniIcon: "",
                    users: "Nicky, Zucky & others",
                    orangeball: "/assets/orangeball.png",
                    message: "also wish your birthday on wall posting",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 1,
                    read: false
                },
                {
                    id: 3,
                    imageSrc: "/assets/smile.jpg",
                    miniIcon: "",
                    users: "Ahmad & Emir ",
                    orangeball: "/assets/orangeball.png",
                    message: "also wish your birthday on wall posting",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 1,
                    read: true
                },
                {
                    id: 4,
                    imageSrc: "/assets/smile.jpg",
                    miniIcon: "",
                    orangeball: "/assets/orangeball.png",
                    users: "Yahya",
                    message: "Your request to change the Organisational chart picture was 4 ",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 6,
                    read: false
                },
                {
                    id: 5,
                    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
                    orangeball: "/assets/orangeball.png",
                    users: "Nyet",
                    message: "Your request to change the Organisational chart picture was 5 ",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 6,
                    read: true
                },
                {
                    id: 6,
                    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
                    miniIcon: "",
                    orangeball: "/assets/orangeball.png",
                    users: "Baihaqi",
                    message: "request to change the Organisational chart picture was 6 ",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 7,
                    read: false
                },
                {
                    id: 7,
                    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
                    users: "Ahmad",
                    message: "request to change the Organisational chart picture was 7 ",
                    orangeball: "/assets/orangeball.png",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 8,
                    read: false
                },
                // ... other notifications
            ],
            isPopupOpen: true // Add a new state to control the popup visibility
        };

        this.popupRef = React.createRef(); // Reference for the popup
    }

    componentDidMount() {
        // Add event listener for clicks
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        // Remove event listener for clicks
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        // Check if the click is outside the popup
        if (this.popupRef.current && !this.popupRef.current.contains(event.target)) {
            this.setState({ isPopupOpen: false });
        }
    };

    handleTabChange = (tab) => {
        this.setState({ activeTab: tab });
    };

    render() {
        const { activeTab, notifications, isPopupOpen } = this.state;

        if (!isPopupOpen) {
            return null; // Don't render the popup if it's closed
        }

        // Filter notifications based on the active tab
        const filteredNotifications =
            activeTab === 'all'
                ? notifications.slice(0, 4) // Only display the first 4 notifications for 'all' tab
                : notifications.filter(notification => !notification.read);

        return (
            <div 
                className="notification-box absolute right-0 mt-2 w-[360px] bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                ref={this.popupRef} // Attach the reference to the popup div
            >
                <style>{`
                    .notification-message {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-height: 2.5em; /* 2 lines * 1.1em line height */
                        line-height: 1.1em;
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
                    }
                    .orange-circle {
                        position: absolute;
                        top: 0;
                        right: -10px;
                        width: 7px;
                        height: 7px;
                        background-color: #FF4500;
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
                            <span className={`orange-circle ${activeTab === 'unread' ? 'opacity-100' : 'opacity-50'}`} />
                        </button>
                    </li>
                </ul>
                <br />
                {/* Notification list rendering... */}
                <NotiComp />
                <div onClick={handleClick} className="flex flex-row font-bold bg-slaute-400 h-10 px-2 w-full gap-2 cursor-pointer hover:bg-slate-200 rounded-lg items-center">
                    VIEW ALL
                    <img className="h-6 w-6" src="/assets/viewall.svg" />
                </div>
            </div>
        );
    }
}

export default NotificationPopup;
