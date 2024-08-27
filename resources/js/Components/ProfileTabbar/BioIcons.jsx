// import React, { useState, useEffect } from 'react';

// function ProfileIcons({ icon1, icon2, onEdit, user_id, onFormDataChange, onPhotoChange, onSave, onCancel }) {
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     // const [qrCodeSvg, setQrCodeSvg] = useState(null);

//     // useEffect(() => {
//     //     if (isPopupOpen) {
//     //         fetch(`/user/${user_id}/profile-qr`, {
//     //             headers: {
//     //                 'Accept': 'image/svg+xml',
//     //             }
//     //         })
//     //         .then(response => response.text())
//     //         .then(svgData => {
//     //             setQrCodeSvg(svgData);
//     //         })
//     //         .catch(error => {
//     //             console.error("Failed to fetch QR code SVG:", error);
//     //         });
//     //     }
//     // }, [isPopupOpen, user_id]);

//     const handleIcon2Click = (e) => {
//         e.stopPropagation();
//         setIsPopupOpen(true);
//     };

//     const handleIcon1Click = (e) => {
//       e.stopPropagation();
//       onEdit();
//   };

//     const closePopup = () => {
//         setIsPopupOpen(false);
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (!event.target.closest(".popup")) {
//                 closePopup();
//             }
//         };

//         if (isPopupOpen) {
//             document.addEventListener("click", handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener("click", handleClickOutside);
//         };
//     }, [isPopupOpen]);

//     const handleDownload = (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         const qrImage = 'assets/hehe.png';
//         const link = document.createElement('a');
//         link.href = qrImage;
//         link.download = 'qr-image.png';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     const handleCopyLink = () => {
//         const qrCodeLink = "https://shattereddisk.github.io/rickroll/rickroll.mp4";
//         navigator.clipboard.writeText(qrCodeLink)
//             .then(() => {
//                 console.log("QR code link copied to clipboard:", qrCodeLink);
//                 window.alert("QR code link copied to clipboard!");
//             })
//             .catch((error) => {
//                 console.error("Failed to copy QR code link:", error);
//             });
//     };

//     return (
//         <div className="flex flex-row gap-2 items-center">
//             <button onClick={handleIcon1Click}>
//                 <img src={icon1} alt="Edit Icon" className="aspect-square w-[30px]" />
//             </button>
//             {icon2 && (
//                 <img
//                     src={icon2}
//                     alt="QR Code Icon"
//                     className="aspect-square w-[30px] h-[30px] cursor-pointer"
//                     onClick={handleIcon2Click}
//                 />
//             )}
//             {isPopupOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closePopup}>
//                     <div className="bg-white p-2 rounded-3xl shadow-custom max-w-md popup" onClick={(e) => e.stopPropagation()}>
//                         <img
//                             src="/assets/qrAcap.jpg"
//                             // src={`/user/17/profile-qr.svg`}
//                             alt="QR Code"
//                             className="mx-auto mx-4"
//                         />
//                         {/* {qrCodeSvg ? (
//                             <div
//                                 className="qr-code-svg"
//                                 dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
//                             />
//                         ) : (
//                             <p>Loading QR code...</p>
//                         )} */}
//                         <hr className="mb-4 w-full border-gray-300" />
//                         <div className="flex justify-between -mt-1 mx-20 max-md:mx-12 relative">
//                             <button onClick={handleDownload} className="text-white py-2">
//                                 <img src="/assets/DownloadIcon.png" alt="Download Icon" className="w-6 h-6 shrink-0" />
//                             </button>
//                             {/* <hr className="absolute top-0 right-52 h-full border-l border-red-300" /> */}
//                             <button onClick={handleCopyLink} className="text-white py-2">
//                                 <img src="/assets/CopyLinkIcon.png" alt="Copy Link Icon" className="w-6 h-6 shrink-0" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ProfileIcons;



// import React, { useState, useEffect } from 'react';
// import { jsPDF } from 'jspdf'; // Make sure you install jspdf using npm or yarn

// function ProfileIcons({ icon1, icon2, onEdit, user_id, user_name }) {
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [qrCodeSvg, setQrCodeSvg] = useState(null);

//     useEffect(() => {
//         if (isPopupOpen) {
//             fetch(`/user/${user_id}/profile-qr`, {
//                 headers: {
//                     'Accept': 'image/svg+xml',
//                 }
//             })
//             .then(response => response.text())
//             .then(svgData => {
//                 setQrCodeSvg(svgData);
//             })
//             .catch(error => {
//                 console.error("Failed to fetch QR code SVG:", error);
//             });
//         }
//     }, [isPopupOpen, user_id]);

//     const handleIcon2Click = (e) => {
//         e.stopPropagation();
//         setIsPopupOpen(true);
//     };

//     const handleIcon1Click = (e) => {
//       e.stopPropagation();
//       onEdit();
//   };

//     const closePopup = () => {
//         setIsPopupOpen(false);
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (!event.target.closest(".popup")) {
//                 closePopup();
//             }
//         };

//         if (isPopupOpen) {
//             document.addEventListener("click", handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener("click", handleClickOutside);
//         };
//     }, [isPopupOpen]);

//     const handleDownload = async (e) => {
//         e.stopPropagation();
//         e.preventDefault();
    
//         if (!qrCodeSvg) {
//             console.error("QR code SVG is not available.");
//             return;
//         }
    
//         // Create a jsPDF instance
//         const pdf = new jsPDF();
    
//         // Set the font size and add the user name
//         pdf.setFontSize(16);
//         pdf.text(`Name: ${user_name}`, 10, 20);
    
//         // Convert the SVG into an image
//         const canvas = document.createElement('canvas');
//         const svgBlob = new Blob([qrCodeSvg], { type: 'image/svg+xml;charset=utf-8' });
//         const url = URL.createObjectURL(svgBlob);
    
//         const img = new Image();
//         img.onload = () => {
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext('2d');
//             ctx.drawImage(img, 0, 0);
    
//             // Convert the canvas to a data URL
//             const imgData = canvas.toDataURL('image/png');
    
//             // Add the image to the PDF
//             pdf.addImage(imgData, 'PNG', 10, 30, img.width / 4, img.height / 4);
    
//             // Download the PDF
//             pdf.save(`${user_name} QR-Code.pdf`);
    
//             // Clean up
//             URL.revokeObjectURL(url);
//         };
//         img.src = url;
//     };
    

//     const handleCopyLink = () => {
//         const qrCodeLink = "https://shattereddisk.github.io/rickroll/rickroll.mp4";
//         navigator.clipboard.writeText(qrCodeLink)
//             .then(() => {
//                 console.log("QR code link copied to clipboard:", qrCodeLink);
//                 window.alert("QR code link copied to clipboard!");
//             })
//             .catch((error) => {
//                 console.error("Failed to copy QR code link:", error);
//             });
//     };

//     return (
//         <div className="flex flex-row gap-2 items-center">
//             <button onClick={handleIcon1Click}>
//                 <img src={icon1} alt="Edit Icon" className="aspect-square w-[30px]" />
//             </button>
//             {icon2 && (
//                 <img
//                     src={icon2}
//                     alt="QR Code Icon"
//                     className="aspect-square w-[30px] h-[30px] cursor-pointer"
//                     onClick={handleIcon2Click}
//                 />
//             )}
//             {isPopupOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closePopup}>
//                     <div className="bg-white p-2 rounded-3xl shadow-custom max-w-md popup" onClick={(e) => e.stopPropagation()}>
//                     {user_name}
//                         {qrCodeSvg ? (
//                             <div
//                                 className="qr-code-svg"
//                                 dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
//                             />
//                         ) : (
//                             <p>Loading QR code...</p>
//                         )}
//                         <hr className="mb-4 w-full border-gray-300" />
//                         <div className="flex justify-between -mt-1 mx-20 max-md:mx-12 relative">
//                             <button onClick={handleDownload} className="text-white py-2">
//                                 <img src="/assets/DownloadIcon.png" alt="Download Icon" className="w-6 h-6 shrink-0" />
//                             </button>
//                             <button onClick={handleCopyLink} className="text-white py-2">
//                                 <img src="/assets/CopyLinkIcon.png" alt="Copy Link Icon" className="w-6 h-6 shrink-0" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ProfileIcons;



import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf'; // Make sure you install jspdf using npm or yarn

function ProfileIcons({ icon1, icon2, onEdit, user_id, user_name, user_title }) {
    console.log("TITLEEEDIANI APE", user_title);
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [qrCodeSvg, setQrCodeSvg] = useState(null);
    const [qrCodeLink, setQrCodeLink] = useState(null); // Store the QR code link

    useEffect(() => {
        if (isPopupOpen) {
            fetch(`/user/${user_id}/profile-qr`, {
                headers: {
                    'Accept': 'image/svg+xml',
                }
            })
            .then(response => {
                setQrCodeLink(response.url); // Save the link to use later
                return response.text();
            })
            .then(svgData => {
                setQrCodeSvg(svgData);
            })
            .catch(error => {
                console.error("Failed to fetch QR code SVG:", error);
            });
        }
    }, [isPopupOpen, user_id]);

    const handleIcon2Click = (e) => {
        e.stopPropagation();
        setIsPopupOpen(true);
    };

    const handleIcon1Click = (e) => {
        e.stopPropagation();
        onEdit();
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".popup")) {
                closePopup();
            }
        };

        if (isPopupOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isPopupOpen]);

    const handleDownload = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!qrCodeSvg) {
        console.error("QR code SVG is not available.");
        return;
    }

    // Create a jsPDF instance
    const pdf = new jsPDF();

    

    // Load the logo image
    const logo = new Image();
    logo.src = '/assets/logo_tourism.png';

    // Once the logo image is loaded, proceed with the PDF creation
    logo.onload = () => {
        const logoWidth = 70; // Adjust logo size as needed
        const logoHeight = 30;
        const logoXPosition = (pdf.internal.pageSize.getWidth() - logoWidth) / 2;
        const logoYPosition = 20;

        // Add the logo to the PDF
        pdf.addImage(logo, 'PNG', logoXPosition, logoYPosition, logoWidth, logoHeight);

        // Set the Y position for user details below the logo
        const marginTop = 40; // Adjust margin as needed
        const yPosition = logoYPosition + logoHeight + marginTop;

        pdf.setFontSize(24); // Larger font size for name
        pdf.setFont("helvetica", "bold"); // Bold font style
        pdf.text(`${user_name}`, pdf.internal.pageSize.getWidth() / 2, yPosition, { align: "center" });

        // Set the font for user details and add the user name and title
        pdf.setFontSize(16);
        pdf.setFont("helvetica", "normal");
        pdf.text(`${user_title}`, pdf.internal.pageSize.getWidth() / 2, yPosition + 10, { align: "center" });

        // Convert the SVG into an image
        const canvas = document.createElement('canvas');
        const svgBlob = new Blob([qrCodeSvg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Convert the canvas to a data URL
            const imgData = canvas.toDataURL('image/png');

            // Adjust the Y position for the image to be below the text
            const imageYPosition = yPosition + 30; // Place the image below the text
            const imageWidth = img.width / 2;
            const imageHeight = img.height / 2;


            // Center the image on the page
            const imageXPosition = (pdf.internal.pageSize.getWidth() - imageWidth) / 2;

            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', imageXPosition, imageYPosition, imageWidth, imageHeight);

            // Download the PDF
            pdf.save(`${user_name} QR-Code.pdf`);

            // Clean up
            URL.revokeObjectURL(url);
        };
        img.src = url;
    };
};

    
    

    const handleCopyLink = () => {
        if (!qrCodeLink) {
            console.error("QR code link is not available.");
            return;
        }

        navigator.clipboard.writeText(qrCodeLink)
            .then(() => {
                console.log("QR code link copied to clipboard:", qrCodeLink);
                window.alert("QR code link copied to clipboard!");
            })
            .catch((error) => {
                console.error("Failed to copy QR code link:", error);
            });
    };

    return (
        <div className="flex flex-row gap-2 items-center">
            <button onClick={handleIcon1Click}>
                <img src={icon1} alt="Edit Icon" className="aspect-square w-[30px]" />
            </button>
            {icon2 && (
                <img
                    src={icon2}
                    alt="QR Code Icon"
                    className="aspect-square w-[30px] h-[30px] cursor-pointer"
                    onClick={handleIcon2Click}
                />
            )}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closePopup}>
                    <div className="bg-white p-6 rounded-3xl shadow-custom max-w-md popup" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center">
                        <img 
                        src="/assets/logo_tourism.png" 
                        alt="Tourism Logo" 
                        className="w-20 h-15 mr-2 align-middle"
                        />
                    </div>
                    <p className="text-lg font-bold text-gray-900"><span className="font-normal">{user_name}</span></p>
                    <p className="text-lg font-bold text-gray-900 mt-2"><span className="font-normal">{user_title}</span></p>

                        {qrCodeSvg ? (
                            <div
                                className="qr-code-svg mt-4"
                                dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                            />
                        ) : (
                            <p>Loading QR code...</p>
                        )}
                        <hr className="mb-4 mt-4 w-full border-gray-300" />
                        <div className="flex justify-between -mt-1 mx-10 max-md:mx-6 relative space-x-4">
                            <button onClick={handleDownload} className="text-white py-2">
                                <img src="/assets/DownloadIcon.png" alt="Download Icon" className="w-6 h-6 shrink-0" />
                            </button>
                            <button onClick={handleCopyLink} className="text-white py-2">
                                <img src="/assets/CopyLinkIcon.png" alt="Copy Link Icon" className="w-6 h-6 shrink-0" />
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileIcons;
