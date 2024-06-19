import React, { useState, Fragment } from 'react';
import { Field, Label, Switch, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Basic Settings
function FileInputSection({ onFileSelect }) {
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      onFileSelect(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <section className="flex gap-2.5 mt-5 text-center">
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
      <span className="flex-auto my-auto text-xs font-medium text-neutral-800 text-opacity-50">
        No file Chosen
      </span>
    </section>
  );
}

function ImageSection({ imageSrc, onDelete }) {
  return (
    <section className="flex gap-5 justify-between mt-3.5">
      <figure className="flex justify-center items-center w-[190px] h-[50px] rounded-xl border border-solid border-neutral-200 overflow-hidden">
        {imageSrc ? (
          <img
            loading="lazy"
            src={imageSrc}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-neutral-800">No image</span>
        )}
      </figure>
      <div className="flex items-end">
        <img
          onClick={onDelete}
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/afe3477ad4cf3bf53704463467275bf23818a2768045ef6be28ddcea6fc246d6?apiKey=285d536833cc4168a8fbec258311d77b&"
          alt="Delete icon"
          className={`aspect-square w-[26px] cursor-pointer ${imageSrc ? 'block' : 'hidden'}`}
        />
      </div>
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
        <h1 className="text-2xl font-bold text-neutral-800">Company Logo</h1>
      </header>
      <FileInputSection onFileSelect={handleFileSelect} />
      <ImageSection imageSrc={imageSrc} onDelete={handleDelete} />
      <button
        onClick={handleSave}
        className="mt-5 self-center px-4 py-2 text-white bg-blue-500 rounded-full"
      >
        Save
      </button>
      {savedImage && (
        <div className="mt-5">
          <p className="text-sm text-neutral-800">Saved Image:</p>
          <figure className="flex justify-center items-center w-[190px] h-[50px] rounded-2xl border border-solid border-neutral-200 overflow-hidden mt-2">
            <img
              src={savedImage}
              alt="Saved"
              className="w-full h-full object-cover"
            />
          </figure>
        </div>
      )}
    </article>
  );
}

// =============================================================================================================================================================

// Themes

const ImageGrid = ({ images, altTexts, onImageClick, selectedImage }) => (
  <div className="grid grid-cols-6 gap-5">
    {images.map((src, index) => (
      <div
        key={index}
        className={`relative cursor-pointer ${
          selectedImage === src ? 'border-2 border-blue-500' : ''
        }`}
        onClick={() => onImageClick(src)}
      >
        <img
          loading="lazy"
          src={src}
          alt={altTexts[index]}
          className="aspect-square w-full"
        />
        {selectedImage === src && (
          <img
            src="assets/red-tick-select.svg"
            alt="Selected"
            className="absolute top-2 right-3 w-4 h-4"
          />
        )}
      </div>
    ))}
  </div>
);

const ThemeComponent = ({ onSave }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images1 = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/972033d7958552cb31c869fdebe33a7acc4a9f9919b3947a9fb97cb4d9ea8801?apiKey=285d536833cc4168a8fbec258311d77b&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/593e8551ea6875ce30fc60bae3b6965543240bc37d09dc61b61c3566d989c7b8?apiKey=285d536833cc4168a8fbec258311d77b&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/7396e07caa8a440244eef73e4ed2d99765f858ee6546d98cc5359862ac951cdd?apiKey=285d536833cc4168a8fbec258311d77b&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/35e6905b2b569c758e645cfca82d85f8f13819a6d417afe0b83ce6b7953a76bc?apiKey=285d536833cc4168a8fbec258311d77b&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/f4dcc2b582498c4d048fd2ddd1321d4caa1f0a1b57227672464e2c2c8752687a?apiKey=285d536833cc4168a8fbec258311d77b&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/fa56425df96b396350ea0b7b409c9570d081fd64e250918cd846cdaa29d15f72?apiKey=285d536833cc4168a8fbec258311d77b&",
  ];

  const images2 = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/2a16dcdce82e30a3f83f8206fb4c7ad009e759b69d7b5d5e5ac4be5fd536c026?apiKey=285d536833cc4168a8fbec258311d77b&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/6ad517ff12d1d0875c89f413cf180d327f505bca589d778be0d181d65820d229?apiKey=285d536833cc4168a8fbec258311d77b&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/33924e30099ac7022aa4882a9319b32e10b12023f437b5caddfa44747d67fb33?apiKey=285d536833cc4168a8fbec258311d77b&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/5d038602c185600957c1312e6a175db13e29aad612c782932948c2ec4bd0d530?apiKey=285d536833cc4168a8fbec258311d77b&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/5c9a678562efbc92647e54e6e3622a8c318433e7c0f90b1d3d24d3902a9a12a9?apiKey=285d536833cc4168a8fbec258311d77b&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/42772b915808bc5456f206e50fe2ddb23a8d77b83e30b467eb2a2bffcf9efa06?apiKey=285d536833cc4168a8fbec258311d77b&",
  ];

  const altTexts = [
    "Image 1 description",
    "Image 2 description",
    "Image 3 description",
    "Image 4 description",
    "Image 5 description",
    "Image 6 description",
    "Image 7 description",
    "Image 8 description",
    "Image 9 description",
    "Image 10 description",
    "Image 11 description",
    "Image 12 description",
  ];

  const handleImageClick = (src) => {
    setSelectedImage((prevSelectedImage) => (prevSelectedImage === src ? null : src));
  };

  const handleSave = () => {
    onSave(selectedImage);
  };

  return (
    <section className="flex flex-col px-5 py-8 bg-white rounded-2xl shadow-custom max-w-[700px]">
      <h2 className="text-2xl font-bold text-neutral-800 max-md:max-w-full">
        Customize your theme
      </h2>
      <div className="mt-8">
        <ImageGrid
          images={images1}
          altTexts={altTexts}
          onImageClick={handleImageClick}
          selectedImage={selectedImage}
        />
      </div>
      <div className="mt-5">
        <ImageGrid
          images={images2}
          altTexts={altTexts}
          onImageClick={handleImageClick}
          selectedImage={selectedImage}
        />
      </div>
      <button
        onClick={handleSave}
        className="mt-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </section>
  );
};

// =============================================================================================================================================================

// Advance Settings

// Utility function to join class names conditionally
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CoreFeatures = () => {
  const [wall, setWall] = useState(false);
  const [calendarOfEvents, setCalendarOfEvents] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [pages, setPages] = useState(false);
  const [poll, setPoll] = useState(false);
  const [organisationChart, setOrganisationChart] = useState(false);

  return (
    <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[844px]">
      <h2 className="text-2xl font-bold text-blue-500">Enable/Disable Core Features</h2>
      <div className="border-t border-gray-200 mt-2"></div>
      <div className="w-full">
        <ul role="list" className="divide-y divide-gray-200">
          {[
            { label: 'Wall', state: wall, setState: setWall },
            { label: 'Calendar of Events', state: calendarOfEvents, setState: setCalendarOfEvents },
            { label: 'Notifications', state: notifications, setState: setNotifications },
            { label: 'Pages', state: pages, setState: setPages },
            { label: 'Poll', state: poll, setState: setPoll },
            { label: 'Organisation Chart', state: organisationChart, setState: setOrganisationChart },
          ].map(({ label, state, setState }) => (

            <li key={label} className="flex items-center justify-between py-4 w-full">
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-6 text-gray-900">{label}</p>
              </div>
              <Switch
                checked={state}
                onChange={setState}
                className={classNames(
                  state ? 'bg-blue-500' : 'bg-gray-200',
                  'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    state ? 'translate-x-5' : 'translate-x-0',
                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-200 w-full"></div>
      <div className="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6 w-full">
        <button
          type="button"
          className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Save
        </button>
      </div>
    </section>
  );
};

const SizeLimit = () => {
  const [fileLimit, setFileLimit] = useState('Choose Limit');
  const [videoLimit, setVideoLimit] = useState('Choose Limit');
  const [photoLimit, setPhotoLimit] = useState('Choose Limit');

  const handleSelect = (option, type, event) => {
    event.preventDefault(); // Prevent the default behavior
    if (type === 'file') setFileLimit(option);
    if (type === 'video') setVideoLimit(option);
    if (type === 'photo') setPhotoLimit(option);
  };

  return (
    <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[844px] mt-5">
      <h2 className="text-2xl font-bold text-blue-500">File / Video / Photo Size Limit</h2>
      <div className="border-t border-gray-200 mt-2"></div>
      <div className="w-full">
        <ul role="list" className="divide-y divide-gray-200">
          {[
            { label: 'File', limit: fileLimit, setLimit: setFileLimit, type: 'file' },
            { label: 'Video', limit: videoLimit, setLimit: setVideoLimit, type: 'video' },
            { label: 'Photo', limit: photoLimit, setLimit: setPhotoLimit, type: 'photo' },
          ].map(({ label, limit, setLimit, type }) => (

            <li key={label} className="flex items-center justify-between py-4 w-full">
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-6 text-gray-900">{label}</p>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {limit}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {['1 GB', '3 GB', '5 GB'].map(option => (
                        <Menu.Item key={option}>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={(event) => handleSelect(option, type, event)} // Pass the event object)}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-200 w-full"></div>
      <div className="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6 w-full">
        <button
          type="button"
          className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Save
        </button>
      </div>
    </section>
  );
};

const Media = () => {
  const [fileFolder, setFileFolder] = useState(false);

  return (
    <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[844px] mt-5">
      <h2 className="text-2xl font-bold text-blue-500">Media</h2>
      <div className="border-t border-gray-200 mt-2"></div>
      <div className="w-full">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="flex items-center justify-between py-4 w-full">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-6 text-gray-900">Path to Files Folder</p>
            </div>
            <div className="flex flex-col -ml-64">
              <p className="text-sm font-light leading-6 text-gray-900">Allow members to invite</p>
            </div>
            <Switch
              checked={fileFolder}
              onChange={setFileFolder}
              className={classNames(
                fileFolder ? 'bg-blue-500' : 'bg-gray-200',
                'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  fileFolder ? 'translate-x-5' : 'translate-x-0',
                  'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </li>
          <li className="flex items-center justify-between py-4 w-full">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-6 text-gray-900">Limit Email Domain</p>
            </div>
            <div>
              <label htmlFor="link" className="sr-only">
                Link
              </label>
              <input
                type="link"
                name="link"
                id="link"
                className="block w-[160px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 pl-2"
                placeholder="Link"
              />
            </div>
          </li>
        </ul>
      </div>
      <div className="border-t border-gray-200 w-full"></div>
      <div className="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6 w-full">
        <button
          type="button"
          className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Save
        </button>
      </div>
    </section>
  );
};

const CoverPhotos = () => {
  const [groups, setGroups] = useState(false);
  const [profile, setProfile] = useState(false);

  return (
    <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[844px] mt-5">
      <h2 className="text-2xl font-bold text-blue-500">Cover Photos</h2>
      <div className="border-t border-gray-200 mt-2"></div>
      <div className="w-full">
        <ul role="list" className="divide-y divide-gray-200">
          {[
            { label: 'Groups', state: groups, setState: setGroups },
            { label: 'Profile', state: profile, setState: setProfile },
          ].map(({ label, state, setState }) => (

            <li key={label} className="flex items-center justify-between py-4 w-full">
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-6 text-gray-900">{label}</p>
              </div>
              <Switch
                checked={state}
                onChange={setState}
                className={classNames(
                  state ? 'bg-blue-500' : 'bg-gray-200',
                  'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    state ? 'translate-x-5' : 'translate-x-0',
                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-200 w-full"></div>
      <div className="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6 w-full">
        <button
          type="button"
          className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Save
        </button>
      </div>
    </section>
  );
};

const MailSettings = () => {
  const [security, setSecurity] = useState('None');
  const [mail, setMail] = useState('PHP Mail');
  const [fileFolder, setFileFolder] = useState(false);
  const [authentication, setAuthentication] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);

  const handleSelect = (option, type, event) => {
    event.preventDefault(); // Prevent the default behavior
    if (type === 'mail') setMail(option);
    if (type === 'security') setSecurity(option);
  };

  return (
    <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[844px] mt-5">
      <h2 className="text-2xl font-bold text-blue-500">Mail Settings</h2>
      <div className="border-t border-gray-200 mt-2"></div>
      <div className="w-full">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="flex items-center justify-between py-4 w-full">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-6 text-gray-900">Mailer *</p>
            </div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {mail}
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
              </div>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {['Mail 1', 'Mail 2', 'Mail 3'].map(option => (
                      <Menu.Item key={option}>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={(event) => handleSelect(option, 'mail', event)}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
          <li className="flex items-center justify-between py-4 w-full">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-6 text-gray-900">Path to Files Folder</p>
            </div>
            <div className="flex flex-col -ml-64">
              <p className="text-sm font-light leading-6 text-gray-900">Allow members to invite</p>
            </div>
            <Switch
              checked={fileFolder}
              onChange={setFileFolder}
              className={classNames(
                fileFolder ? 'bg-blue-500' : 'bg-gray-200',
                'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  fileFolder ? 'translate-x-5' : 'translate-x-0',
                  'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </li>
          {[
            { label: 'From Email', placeholder: 'jomla@tourism.gov.my', type: 'email' },
            { label: 'From Name', placeholder: 'jomla!', type: 'text' },
            { label: 'Sendmail Path', placeholder: '', type: 'text' },
            { label: 'SMTP Port *', placeholder: '25', type: 'text' },
            { label: 'SMTP Username', placeholder: 'admin', type: 'text' },
            { label: 'SMTP Password', placeholder: '***********', type: 'password' },
            { label: 'SMTP Host', placeholder: 'localhost', type: 'text' },
          ].map(({ label, placeholder, type }) => (
            
            <li key={label} className="flex items-center justify-between py-4 w-full">
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-6 text-gray-900">{label}</p>
              </div>
              <div>
                <label htmlFor={label} className="sr-only">
                  {label}
                </label>
                <input
                  type={type}
                  name={label}
                  id={label}
                  className="block w-[160px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 pl-2"
                  placeholder={placeholder}
                />
              </div>
            </li>
          ))}
          <li className="flex items-center justify-between py-4 w-full">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-6 text-gray-900">SMTP Authentication</p>
            </div>
            <Switch
              checked={authentication}
              onChange={setAuthentication}
              className={classNames(
                authentication ? 'bg-blue-500' : 'bg-gray-200',
                'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  authentication ? 'translate-x-5' : 'translate-x-0',
                  'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </li>
          <li className="flex items-center justify-between py-4 w-full">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-6 text-gray-900">SMTP Security</p>
            </div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {security}
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
              </div>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {['Security 1', 'Security 2', 'Security 3'].map(option => (
                      <Menu.Item key={option}>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={(event) => handleSelect(option, 'security', event)}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
          <li className="flex items-center justify-between py-4 w-full">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-6 text-gray-900">Enable Email Notification</p>
            </div>
            <Switch
              checked={emailNotification}
              onChange={setEmailNotification}
              className={classNames(
                emailNotification ? 'bg-blue-500' : 'bg-gray-200',
                'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  emailNotification ? 'translate-x-5' : 'translate-x-0',
                  'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </li>
        </ul>
      </div>
      <div className="border-t border-gray-200 w-full"></div>
      <div className="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6 w-full">
        <button
          type="button"
          className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Save
        </button>
      </div>
    </section>
  );
};

// =============================================================================================================================================================

// Departments

const Departments = () => {
  const initialData = [
    { id: 1, name: 'Department 1', ordering: 1 },
    { id: 2, name: 'Department 2', ordering: 2 },
    { id: 3, name: 'Department 3', ordering: 3 },
    { id: 4, name: 'Department 4', ordering: 4 },
    { id: 5, name: 'Department 5', ordering: 5 },
    { id: 6, name: 'Department 6', ordering: 6 },
    { id: 7, name: 'Department 7', ordering: 7 },
    { id: 8, name: 'Department 8', ordering: 8 },
    { id: 9, name: 'Department 9', ordering: 9 },
  ];

  const [data, setData] = useState(initialData);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[844px]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-2xl font-bold text-gray-900 tracking-wider"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-2xl font-bold text-gray-900 tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-2xl font-bold text-gray-900 tracking-wider"
                >
                  Ordering
                </th>
              </tr>
            </thead>
            <Droppable droppableId="departments">
              {(provided) => (
                <tbody
                  className="bg-white divide-y divide-gray-200"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {data.map((department, index) => (
                    <Draggable key={department.id} draggableId={`${department.id}`} index={index}>
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {department.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex flex-col">
                              <input
                                type="text"
                                name={`name-${department.id}`}
                                id={`name-${department.id}`}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 pl-2"
                                placeholder={department.name}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex flex-col items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </div>
        <div className="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6 w-full">
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Save
          </button>
        </div>
      </section>
    </DragDropContext>
  );
}

// =============================================================================================================================================================


// For Settings Page

const SettingsPage = ({ currentPage }) => {
  const handleSave = (selectedImage) => {
    console.log('Selected image:', selectedImage);
  };

  return (
    <div>
      <h1 className="hidden">{currentPage}</h1>
      {currentPage === 'Basic Settings' && <LogoUploader onSave={handleSave} />}
      {currentPage === 'Themes' && <ThemeComponent onSave={handleSave} />}
      {currentPage === 'Advance Settings' && (
        <>
          <CoreFeatures onSave={handleSave} />
          <SizeLimit onSave={handleSave} />
          <Media onSave={handleSave} />
          <CoverPhotos onSave={handleSave} />
          <MailSettings onSave={handleSave} />
        </>
      )}
      {currentPage === 'Departments' && <Departments onSave={handleSave} />}
      {currentPage === 'Media' && <div></div>}
      {currentPage === 'Requests' && <div></div>}
      {currentPage === 'Audit Trail' && <div></div>}
      {currentPage === 'Feedback' && <div></div>}
      {currentPage === 'Birthday Template' && <div></div>}
      {currentPage === 'Pautan' && <div></div>}
    </div>
  );
};

export { SettingsPage, LogoUploader, ThemeComponent, CoreFeatures, SizeLimit, Media, CoverPhotos, MailSettings, Departments };
