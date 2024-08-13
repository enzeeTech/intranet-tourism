import React, { useState, useRef } from "react";

function Popup({ title, onClose, onSave, profileData, id, formData, csrfToken, authToken, setPhoto }) {
  const [fileNames, setFileNames] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleClickImg = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileNames([file.name]);
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for the selected image
    }
  };

  const handleSave = () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    // Add checks for formData and profileData
    if (!formData || !formData.name) {
      console.error("formData is undefined or missing 'name' property");
      return;
    }

    if (!profileData || !profileData.profile || !profileData.profile.id) {
      console.error("profileData is undefined or missing 'profile' or 'id' property");
      return;
    }

    const FfData = new FormData();
    FfData.append("cover_photo", selectedFile);
    FfData.append("user_id", id);
    FfData.append("_method", "PUT");
    FfData.append("name", formData.name);

    const url = `/api/profile/profiles/${profileData.profile.id}?with[]=user`;

    fetch(url, {
      method: "POST",
      body: FfData,
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": csrfToken || "",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          return await Promise.reject(error);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setPhoto(URL.createObjectURL(selectedFile)); // Update the photo URL
          onSave(); // Trigger the onSave callback
          console.log("File uploaded successfully:", data);
          window.location.reload();
        } else {
          console.error("Error uploading file:", data);
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        window.location.reload();
      });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col py-4 px-8 bg-white rounded-3xl shadow-custom max-w-[350px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-5 items-start text-neutral-800">
          <div className="flex flex-col grow shrink-0 mt-3.5 basis-0 w-fit">
            <div className="text-xl font-bold">{title}</div>
            <div className="flex gap-5 mt-4 text-base font-medium">
              {previewUrl ? (
                <img
                  loading="lazy"
                  src={previewUrl}
                  alt="Preview"
                  className="shrink-0 aspect-square w-[100px] rounded-lg"
                />
              ) : (
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f866987dac766e7c7baf2f103208e42a078a207c09f4684986fefda5837d21a?"
                  className="shrink-0 aspect-square w-[27px] cursor-pointer"
                  onClick={handleClickImg}
                />
              )}
              <div
                className="flex-auto my-auto cursor-pointer"
                onClick={handleClickImg}
              >
                Choose photo from the device
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex gap-2 self-end mt-3.5 mb-4 font-bold text-center">
          <div
            className="file-names-container flex flex-wrap gap-2"
            style={{
              maxWidth: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {fileNames.map((name, index) => (
              <div
                className="flex items-center px-2 py-1 bg-white rounded-lg shadow"
                key={index}
                style={{
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <div className="file-name text-xs truncate">{name}</div>
              </div>
            ))}
          </div>
          <button
            className="bg-white text-sm text-gray-400 border border-gray-400 hover:bg-gray-400 hover:text-white px-4 py-2 rounded-full"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-sm text-white px-4 py-2 rounded-full"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
