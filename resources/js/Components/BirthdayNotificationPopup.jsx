import React from 'react';

class BirthdayNotificationPopup extends React.Component {
    render() {
        const { userData, onClose } = this.props;

        return (
            <div className="absolute right-0 z-10 mt-2.5 w-60 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                <p className="text-sm font-semibold text-gray-900">
                    Happy Birthday, {userData.name}!
                </p>
                <p className="text-sm text-gray-600 mt-1">
                    We hope you have a great day!
                </p>
                <button
                    onClick={onClose}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                >
                    Close
                </button>
            </div>
        );
    }
}

export default BirthdayNotificationPopup;
