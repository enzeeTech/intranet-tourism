import React, { useState, useEffect } from 'react';

function BirthdayNotificationPopup({ onClose }) {
    const [birthdays, setBirthdays] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const fetchBirthdayEvents = async () => {
        try {
            let allProfiles = [];
            let currentPage = 1;
            let totalPages = 1;

            while (currentPage <= totalPages) {
                const response = await fetch(`/api/profile/profiles?page=${currentPage}`);
                const data = await response.json();

                console.log('Fetched data:', data); // Debug: Log the fetched data

                if (data && data.data && Array.isArray(data.data.data)) {
                    allProfiles = [...allProfiles, ...data.data.data];
                    totalPages = data.data.last_page;
                    currentPage++;
                } else {
                    console.error('Error: Expected an array, but got:', data);
                    break;
                }
            }

            console.log('All profiles:', allProfiles); // Debug: Log all collected profiles

            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set to midnight to compare only date part

            // Map profiles to birthday events
            const birthdayEvents = allProfiles.reduce((acc, profile) => {
                if (!profile.dob) return acc; // Skip profiles with no dob

                const dob = new Date(profile.dob);
                if (isNaN(dob.getTime())) return acc; // Skip invalid dob

                const currentYear = today.getFullYear();
                dob.setFullYear(currentYear);

                const day = String(dob.getDate()).padStart(2, '0');
                const month = String(dob.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
                const year = dob.getFullYear();
                const dateStr = `${day}-${month}-${year}`;

                // Only include upcoming birthdays
                if (dob >= today) {
                    console.log('Upcoming Birthday:', profile.bio, 'Date:', dateStr); // Debug: Log upcoming birthdays
                    let existingEvent = acc.find(event => event.date === dateStr);

                    if (existingEvent) {
                        if (!existingEvent.names) {
                            existingEvent.names = [];
                        }
                        existingEvent.names.push(profile.bio);
                    } else {
                        acc.push({
                            name: profile.bio,
                            date: dateStr,
                            profileId: profile.id, // Store profile ID for click handling
                        });
                    }
                }

                return acc;
            }, []);

            console.log('Upcoming Birthday events:', birthdayEvents); // Debug: Log the resulting upcoming birthday events

            setBirthdays(birthdayEvents);
        } catch (error) {
            console.error('Error fetching birthdays: ', error);
        }
    };

    useEffect(() => {
        fetchBirthdayEvents();
    }, []);

    const handleBirthdayClick = (profileId) => {
        console.log(`Clicked on profile ID: ${profileId}`);
    };

    const renderBirthdays = () => {
        const displayBirthdays = showMore ? birthdays : birthdays.slice(0, 5);
        return displayBirthdays.map((birthday, index) => (
            <div
                key={index}
                className="cursor-pointer text-sm text-gray-600 mt-1 p-2 hover:bg-blue-100 rounded"
                onClick={() => handleBirthdayClick(birthday.profileId)}
            >
                {birthday.name} - {birthday.date}
            </div>
        ));
    };

    return (
        <div className="absolute right-0 z-10 mt-2.5 w-60 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
            <p className="text-sm font-semibold text-gray-900">
                Upcoming Birthdays
            </p>
            {renderBirthdays()}
            {birthdays.length > 5 && !showMore && (
                <button
                    onClick={() => setShowMore(true)}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                >
                    See More
                </button>
            )}
            <button
                onClick={onClose}
                className="mt-2 text-sm text-blue-600 hover:underline block"
            >
                Close
            </button>
        </div>
    );
}

export default BirthdayNotificationPopup;
