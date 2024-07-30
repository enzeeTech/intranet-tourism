import React, { useState, useEffect, useRef } from 'react';
import Popup from './CreateStoryPopup';
import CreateImageStory from './CreateImageStory';
import { usePage } from '@inertiajs/react';
import StoryViewer from './StoryViewer';
import './styles.css';

const StoryNew = ({ userId }) => {
    const [showStoryViewer, setShowStoryViewer] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [avatars, setAvatars] = useState([
        {
            src: "assets/user4.jpeg",
            alt: "Avatar of Thomas",
            name: "Musa",
            stories: []
        }
    ]);

    const { props } = usePage();
    const { id } = props; // Access the user ID from props
    const [userData, setUserData] = useState({});
    const [userStories, setUserStories] = useState([]);

    const containerRef = useRef(null);

    useEffect(() => {
        fetchUserData(id);
    }, [id]);

    const fetchUserData = (id) => {
        fetch(`/api/crud/users/${id}?with[]=profile&with[]=employmentPost.department&with[]=employmentPost.businessPost`, {
            method: "GET",
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(({ data }) => {
            setUserData({
                ...data,
                profileImage: data.profile && data.profile.image ? data.profile.image : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${data.name}&rounded=true`
            });
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    };

    useEffect(() => {
        setAvatars(avatars.map(avatar => ({
            ...avatar,
            viewed: false
        })));
    }, []);

    const API_URL = "/api/posts/posts";
    const USERS_API_URL = "/api/crud/users/";

    useEffect(() => {
        const fetchStories = async () => {
            let allStories = [];
            let currentPage = 1;
            let lastPage = 1;

            try {
                while (currentPage <= lastPage) {
                    const response = await fetch(`${API_URL}?with[]=author&with[]=attachments&page=${currentPage}`, {
                        method: "GET",
                    });

                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }

                    const data = await response.json();
                    console.log("data", data.data.data);
                    const storiesToAdd = data.data.data
                        .filter(story => story.type === 'story' && (Date.now() - new Date(story.created_at).getTime()) < 24 * 60 * 60 * 1000) // Filter out stories older than 24 hours
                        // .filter(story => story.type === 'story' && (Date.now() - new Date(story.created_at).getTime()) < 10 * 1000) // Filter out stories older than 10 seconds
                        .map(story => ({
                            url: story.attachments.length > 0 ? `${story.attachments[0].path}` : '', 
                            type: story.attachments.length > 0 ? (story.attachments[0].mime_type.startsWith('image') ? 'image' : 'video') : 'image',
                            text: story.content,
                            userId: story.user_id,
                            timestamp: new Date(story.created_at).getTime()
                        }));

                    allStories = allStories.concat(storiesToAdd);

                    setAvatars(prevAvatars => {
                        const updatedAvatars = prevAvatars.map(avatar => ({
                            ...avatar,
                            stories: avatar.stories.concat(allStories.filter(story => story.url !== '' && story.userId === id))
                        }));
                        return updatedAvatars;
                    });

                    lastPage = data.data.last_page;
                    currentPage++;
                }

                setUserStories(allStories);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchStories();
    }, [id]);

    useEffect(() => {
        const fetchUsers = async () => {
            const uniqueUserIds = [...new Set(userStories.map(story => story.userId))];
            const userPromises = uniqueUserIds.map(userId => fetch(`${USERS_API_URL}${userId}?with[]=profile`));
            const userResponses = await Promise.all(userPromises);
            const userJsonPromises = userResponses.map(response => response.json());
            const users = await Promise.all(userJsonPromises);
            

            const userAvatars = users.map(user => ({
                src: user.data.profile && user.data.profile.image ? user.data.profile.image : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.data.name}&rounded=true`,
                alt: `Avatar of ${user.data.name}`,
                name: user.data.username,
                stories: userStories.filter(story => story.userId === user.data.id)
            }));

            setAvatars(prevAvatars => [...prevAvatars, ...userAvatars]);
        };

        if (userStories.length > 0) {
            fetchUsers();
        }
    }, [userStories]);

    const handleAvatarClick = (avatar) => {
        if (avatar === loggedInUserAvatar) {
            if (avatar.stories.length === 0) {
                fileInputRef.current.click();
            } else {
                setSelectedStory(avatar.stories);
                setSelectedUser(avatar);
                setShowStoryViewer(true);
            }
        } else {
            setSelectedStory(avatar.stories);
            setSelectedUser(avatar);
            setShowStoryViewer(true);
        }
    };

    const handlePlusButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setIsPopupOpen(true);
        }
    };

    const handleCloseViewer = () => {
        setShowStoryViewer(false);
        setSelectedStory(null);
        setSelectedUser(null);
    };

    const handlePostStory = (newStory) => {
        newStory.timestamp = Date.now(); // Add current timestamp to new story

        setAvatars(prevAvatars => {
            const updatedAvatars = [...prevAvatars];
            updatedAvatars[0].stories.push(newStory);
            return updatedAvatars;
        });
        setIsPopupOpen(false);
    };

    const markUserAsViewed = (user) => {
        setAvatars(prevAvatars => {
            const updatedAvatars = prevAvatars.map(avatar => {
                if (avatar === user) {
                    return { ...avatar, viewed: true };
                }
                return avatar;
            });
            return updatedAvatars;
        });
    };
    // console.log("LL", userData);

    const loggedInUserAvatar = {
        src: userData.profileImage || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${userData.name}&rounded=true`,
        alt: "Avatar of logged in user",
        name: "Your Story",
        stories: avatars[0].stories.filter(story => story.userId === id)
    };

    const sortedAvatars = avatars
        .filter(avatar => avatar.stories.length > 0 && avatar.stories[0].userId !== id)
        .sort((a, b) => a.viewed - b.viewed);


    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginBottom: '30px', marginLeft: '-20px', width: '610px', }}>
            <div style={{ display: 'inline-block', margin: '10px', position: 'relative', marginRight: '30px', flexShrink: 0 }}>
                <button style={{ border: 'none', background: 'none', padding: '0', position: 'relative' }} onClick={() => handleAvatarClick(loggedInUserAvatar)} >
                    <div style={{
                        borderRadius: '50%',
                        width: '104px',
                        height: '104px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: loggedInUserAvatar.stories.length > 0 ? 'linear-gradient(45deg, #FCAF45, #FF3559, #FF9C33, #FF3559)' : 'transparent',
                        padding: '2px'
                    }}>
                        <img
                            // src={loggedInUserAvatar.src}
                            src={`/storage/${loggedInUserAvatar.src}`}
                            alt={loggedInUserAvatar.alt}
                            style={{
                                borderRadius: '50%',
                                width: '100px',
                                height: '100px',
                                border: '3px solid white'
                            }}
                        />
                    </div>
                </button>
                <button style={{ border: 'none', background: 'none', padding: '0', position: 'relative' }} onClick={handlePlusButtonClick}>
                    <span style={{
                        position: 'absolute',
                        bottom: '0px',
                        right: '5px',
                        width: '22px',
                        height: '22px',
                        background: 'blue',
                        color: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        border: '2px solid white',
                    }}>+</span>
                </button>
                <input
                    type="file"
                    accept="image/*, video/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
                <div style={{ textAlign: 'center', marginTop: '-5px', fontSize: '12px', color: '#888' }}>
                    {loggedInUserAvatar.stories.length} {loggedInUserAvatar.stories.length === 1 ? 'story' : 'stories'}
                </div>
                <div style={{ textAlign: 'center', marginTop: '-5px' }}>Your Story</div>
            </div>
            <div ref={containerRef} style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                {sortedAvatars.map((avatar, index) => (
                <div key={index} style={{ display: 'inline-block', margin: '10px', position: 'relative', marginRight: '10px' }}>
                        <button style={{ border: 'none', background: 'none', padding: '0', position: 'relative' }}>
                            <div style={{
                                borderRadius: '50%',
                                background: avatar.stories.length > 0 ? 'linear-gradient(45deg, #FCAF45, #FF3559, #FF9C33, #FF3559)' : 'transparent',
                                padding: '2px',
                                filter: avatar.viewed ? 'grayscale(100%)' : 'none' // Apply grayscale filter if the stories have been viewed
                            }}>
                                <img
                                    // src={avatar.src}
                                    src={`/storage/${avatar.src}`}
                                    alt={avatar.alt}
                                    style={{
                                        borderRadius: '50%',
                                        width: '80px',
                                        height: '80px',
                                        border: '3px solid white',
                                        objectFit: 'cover',
                                    }}
                                    onClick={() => handleAvatarClick(avatar)}
                                />
                            </div>
                        </button>
                        <div style={{ textAlign: 'center', marginTop: '-5px', fontSize: '12px', color: '#888' }}>
                            {avatar.stories.length} {avatar.stories.length === 1 ? 'story' : 'stories'}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '-5px' }}>{avatar.name}</div>
                </div>
                ))}
            </div>
            {showStoryViewer && selectedStory && (
                <StoryViewer stories={selectedStory} onClose={handleCloseViewer} user={selectedUser} onViewed={markUserAsViewed} />
            )}
            {isPopupOpen && (
                <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                    <CreateImageStory userId={userId} onPostStory={handlePostStory} file={selectedFile} />
                </Popup>
            )}
        </div>
    );
};

export default StoryNew;