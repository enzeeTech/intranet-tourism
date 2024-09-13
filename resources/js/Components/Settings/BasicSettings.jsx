import React, { useState } from 'react';

function FileInputSection({ onFileSelect }) {
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      onFileSelect(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <section className="flex gap-2.5 mt-5 text-center justify-between">
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        onClick={() => document.getElementById("fileInput").click()}
        className="justify-center px-2 py-1.5 text-xs font-bold text-white bg-blue-500 rounded-3xl"
      >
        Choose file
      </button>
      <span className="my-auto text-xs font-medium text-opacity-50 text-neutral-800">
        No file Chosen
      </span>
    </section>
  );
}

function ImageSection({ imageSrc, onDelete }) {
  return (
    <section className="flex mt-3.5">
      <figure className="flex justify-center items-center w-full h-[50px] rounded-xl border border-solid border-neutral-200 overflow-hidden max-md:w-full max-md:h-[100px]">
        {imageSrc ? (
          <img
            loading="lazy"
            src={imageSrc}
            alt="Uploaded"
            className="object-contain w-[80%] h-[80%] max-md:h-[70%] mx-auto my-auto"
          />
        ) : (
          <span className="text-xs text-neutral-800">No image</span>
        )}
      </figure>
    </section>
  );
}

function LogoUploader() {
  const defaultImage = "https://cdn.builder.io/api/v1/image/assets/TEMP/d910594555d57a5759d52dbe5805129dbfe12b92da0f4c976f19b7b63e76b9f8?apiKey=285d536833cc4168a8fbec258311d77b&";
  const [imageSrc, setImageSrc] = useState(defaultImage);
  const [savedImage, setSavedImage] = useState(null);

  const handleFileSelect = (fileSrc) => {
    setImageSrc(fileSrc);
  };

  const handleDelete = () => {
    setImageSrc(null);
  };

  const handleSave = () => {
    setSavedImage(imageSrc);
  };

  return (
    <article className="flex flex-col px-5 py-4 bg-white rounded-xl shadow-custom max-w-[296px]">
      <header>
        <h1 className="text-2xl font-bold text-neutral-800">Jomla! Intranet Logo</h1>
      </header>
      <FileInputSection onFileSelect={handleFileSelect} />
      <ImageSection imageSrc={imageSrc} onDelete={handleDelete} />
      <div className="flex flex-row justify-end gap-2 mt-4">
      <button
        onClick={handleSave}
        className="self-center px-4 py-2 text-white bg-blue-500 rounded-full"
      >
        Save
      </button>
      {imageSrc && (
          <img
            onClick={handleDelete}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/afe3477ad4cf3bf53704463467275bf23818a2768045ef6be28ddcea6fc246d6?apiKey=285d536833cc4168a8fbec258311d77b&"
            alt="Delete icon"
            className="aspect-square w-[38px] cursor-pointer"
          />
        )}
  </div>
      {savedImage && (
        <div className="mt-5">
          <p className="text-sm text-neutral-800">Saved Image:</p>
          <figure className="flex justify-center items-center w-[190px] h-[50px] rounded-2xl border border-solid border-neutral-200 overflow-hidden mt-2">
            <img
              src={savedImage}
              alt="Saved"
              className="object-cover w-full h-full"
            />
          </figure>
        </div>
      )}
    </article>
  );
}

export default LogoUploader;
