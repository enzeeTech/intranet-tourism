import React, { useState, useEffect } from 'react';
import Stories from 'react-insta-stories';
import Popup from './CreateStoryPopup';
import CreateImageStory from './CreateImageStory';

const StoryViewer = ({ stories, onClose, user, onViewed }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    const handleStoryEnd = () => {
        if (currentStoryIndex === stories.length - 1) {
            onViewed(user); // Notify parent component that stories have been viewed
            onClose(); // Close the story viewer only when all stories are played
        } else {
            setCurrentStoryIndex(currentStoryIndex + 1); // Play the next story
        }
    };

    const handlePrevStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            pointerEvents: 'none',
        }}>
            {/* Overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 9998,
                }}
            ></div>
            {/* Story viewer */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 9999,
                    pointerEvents: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
                onClick={(e) => {
                    if (e.clientX < window.innerWidth / 2) {
                        handlePrevStory();
                    }
                }}
            >
                <div style={{
                    position: 'relative',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '12px',
                    boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)',
                    maxWidth: '400px',
                    maxHeight: '700px',
                    overflow: 'hidden',
                }}>
                    {/* Close button */}
                    <button
                        style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0',
                        }}
                        onClick={onClose}
                    >
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c01ea628264d796f4bd86723682019081b89678cb8451fb7b48173e320e5ff?apiKey=285d536833cc4168a8fbec258311d77b&"
                            alt="Close icon"
                            style={{ width: '24px', height: '24px' }}
                        />
                    </button>
                    {/* User info */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <img src={user.src} alt={user.alt} style={{ width: '36px', height: '36px', borderRadius: '50%', marginRight: '8px', objectFit:'cover' }} />
                        <div style={{ fontSize: '14px' }}>{user.name}</div>
                    </div>
                    {/* Stories */}
                    <Stories
                        stories={stories}
                        defaultInterval={1500}
                        width={360}
                        height={596}
                        onStoryEnd={handleStoryEnd}
                        currentIndex={currentStoryIndex}
                    />
                </div>
            </div>
        </div>
    );
};

const StoryNew = () => {
    const [showStoryViewer, setShowStoryViewer] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [avatars, setAvatars] = useState([
        {
            src: "assets/user4.jpeg",
            alt: "Avatar of Thomas",
            name: "Musa",
            stories: []
        },
        {
            src: "assets/women.avif",
            alt: "Avatar of Aisha",
            name: "Aisha",
            stories: [
                {
                    url: 'assets/car2.mp4',
                    type: 'video',
                    duration: 10000
                },
                {
                    url: 'assets/lambo2.jpeg',
                    caption: 'Story 2'
                },
            ]
        },
        {
            src: "assets/user1.webp",
            alt: "Avatar of Dan",
            name: "Dan",
            stories: [
                { url: 'assets/lambo4.avif', caption: 'Story 1' },
                { url: 'assets/lambo5.jpeg', caption: 'Story 2' },
            ]
        },
        {
            src: "assets/user2.jpeg",
            alt: "Avatar of Musa",
            name: "Julie",
            stories: [
                { url: 'assets/gtr.jpeg', caption: 'Story 1' },
                { url: 'assets/gtr2.jpeg', caption: 'Story 2' },
            ]
        },
        {
            src: "assets/user5.jpeg",
            alt: "Avatar of Safwan",
            name: "Safwan",
            stories: [
            { url: 'assets/gtr1.jpeg', caption: 'Story 1' },
            { url: 'assets/gtr3.jpeg', caption: 'Story 2' },
            ]
        },
        {
            src: "assets/user6.webp",
            alt: "Avatar of Hazmi",
            name: "Hazmi",
            stories: [
            { url: 'assets/gtr4.jpeg', caption: 'Story 1' },
            { url: 'assets/tesla.jpeg', caption: 'Story 2' },
            ]
        },
        {
            src: "assets/user7.png",
            alt: "Avatar of Jai",
            name: "Jai",
            stories: [
            { url: 'assets/lambo3.webp', caption: 'Story 1' },
            { url: 'assets/lambo2.jpeg', caption: 'Story 2' },
            ]
        },
    ]);

    useEffect(() => {
        // Add a "viewed" flag to each user
        setAvatars(avatars.map(avatar => ({
            ...avatar,
            viewed: false
        })));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setAvatars(prevAvatars => {
                const updatedAvatars = prevAvatars.map(avatar => ({
                    ...avatar,
                    stories: avatar.stories.filter(story => (Date.now() - story.timestamp) < 24 * 60 * 60 * 1000) // Filter stories older than 24 hours
                    // stories: avatar.stories.filter(story => (Date.now() - story.timestamp) < 8000) // Filter stories older than 8 second
                }));
                return updatedAvatars;
            });
        }, 60 * 1000); // Check every minute
    // }, 8000); // Check every 8 second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);


    const handleAvatarClick = (avatar) => {
        if (avatar === firstAvatar) { // Check if the clicked avatar is the first avatar
            if (avatar.stories && avatar.stories.length === 0) {
                setIsPopupOpen(true); // Open the popup if the first avatar has no stories
            } else {
                setSelectedStory(avatar.stories);
                setSelectedUser(avatar);
                setShowStoryViewer(true); // Open the story viewer if the first avatar has stories
            }
        } else {
            if (avatar.stories && avatar.stories.length > 0) {
                setSelectedStory(avatar.stories);
                setSelectedUser(avatar);
                setShowStoryViewer(true); // Open the story viewer for other users
            }
        }
    };

    const handlePlusButtonClick = () => {
        setIsPopupOpen(true);
    };

    const handleCloseViewer = () => {
        setShowStoryViewer(false);
        setSelectedStory(null);
        setSelectedUser(null);
    };

    const handlePostStory = (newStory) => {
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

    const sortedAvatars = [
        ...avatars.slice(1).sort((a, b) => a.viewed - b.viewed) // Sort
    ];

    const firstAvatar = avatars[0];

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '-30px', marginLeft: '-20px' }}>
            <div style={{ display: 'inline-block', margin: '10px', position: 'relative', marginRight: '30px', flexShrink: 0 }}>
                <button style={{ border: 'none', background: 'none', padding: '0', position: 'relative' }} onClick={() => handleAvatarClick(firstAvatar)} >
                    <div style={{
                        borderRadius: '50%',
                        width: '104px',
                        height: '104px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: firstAvatar.stories.length > 0 ? 'linear-gradient(45deg, #FCAF45, #FF3559, #FF9C33, #FF3559)' : 'transparent',
                        padding: '2px'
                    }}>
                        <img
                            src={firstAvatar.src}
                            alt={firstAvatar.alt}
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
                <div style={{ textAlign: 'center', marginTop: '-5px', fontSize: '12px', color: '#888' }}>
                    {firstAvatar.stories.length} {firstAvatar.stories.length === 1 ? 'story' : 'stories'}
                </div>
                <div style={{ textAlign: 'center', marginTop: '-5px' }}>{firstAvatar.name}</div>
            </div>
            <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
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
                                    src={avatar.src}
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
                    <CreateImageStory onPostStory={handlePostStory} />
                </Popup>
            )}
        </div>
    );
};

export default StoryNew;
