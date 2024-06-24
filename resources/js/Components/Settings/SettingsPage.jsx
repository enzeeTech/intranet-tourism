import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  subDays
} from 'date-fns';
import { Switch, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon, ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import moment from 'moment';
import aishaImage from '../../../../public/assets/aishaImage.png';
import benImage from '../../../../public/assets/benImage.png';
import thomasImage from '../../../../public/assets/thomasImage.png';
import community1 from  '../../../../public/assets/community1.png';
import community2 from '../../../../public/assets/community2.png';
import community3 from '../../../../public/assets/community3.png';
import changeImage1 from '../../../../public/assets/lambo5.jpeg';
import changeImage2 from '../../../../public/assets/lambo2.jpeg';

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
      <span className="flex-auto my-auto text-xs font-medium text-opacity-50 text-neutral-800">
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
            className="object-cover w-full h-full"
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
        className="self-center px-4 py-2 mt-5 text-white bg-blue-500 rounded-full"
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
              className="object-cover w-full h-full"
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
          className="w-full aspect-square"
        />
        {selectedImage === src && (
          <img
            src="assets/red-tick-select.svg"
            alt="Selected"
            className="absolute w-4 h-4 top-2 right-3"
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
        className="px-4 py-2 mt-5 text-white bg-blue-500 rounded hover:bg-blue-700"
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
      <div className="mt-2 border-t border-gray-200"></div>
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

            <li key={label} className="flex items-center justify-between w-full py-4">
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
                    'inline-block h-5 w-5 transform rounded-full bg-white shadow-custom ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full border-t border-gray-200"></div>
      <div className="flex justify-end w-full px-4 py-4 mt-4 gap-x-3 sm:px-6">
        <button
          type="button"
          className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-custom ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-custom hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
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
      <div className="mt-2 border-t border-gray-200"></div>
      <div className="w-full">
        <ul role="list" className="divide-y divide-gray-200">
          {[
            { label: 'File', limit: fileLimit, setLimit: setFileLimit, type: 'file' },
            { label: 'Video', limit: videoLimit, setLimit: setVideoLimit, type: 'video' },
            { label: 'Photo', limit: photoLimit, setLimit: setPhotoLimit, type: 'photo' },
          ].map(({ label, limit, setLimit, type }) => (

            <li key={label} className="flex items-center justify-between w-full py-4">
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-6 text-gray-900">{label}</p>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-custom ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {limit}
                    <ChevronDownIcon className="w-5 h-5 -mr-1 text-gray-400" aria-hidden="true" />
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
                  <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-custom ring-1 ring-black ring-opacity-5 focus:outline-none">
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
      <div className="w-full border-t border-gray-200"></div>
      <div className="flex justify-end w-full px-4 py-4 mt-4 gap-x-3 sm:px-6">
        <button
          type="button"
          className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-custom ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-custom hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
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
      <div className="mt-2 border-t border-gray-200"></div>
      <div className="w-full">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="flex items-center justify-between w-full py-4">
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
                  'inline-block h-5 w-5 transform rounded-full bg-white shadow-custom ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </li>
          <li className="flex items-center justify-between w-full py-4">
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
                className="block w-[160px] rounded-md border-0 py-1.5 text-gray-900 shadow-custom ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 pl-2"
                placeholder="Link"
              />
            </div>
          </li>
        </ul>
      </div>
      <div className="w-full border-t border-gray-200"></div>
      <div className="flex justify-end w-full px-4 py-4 mt-4 gap-x-3 sm:px-6">
        <button
          type="button"
          className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-custom ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-custom hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
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
      <div className="mt-2 border-t border-gray-200"></div>
      <div className="w-full">
        <ul role="list" className="divide-y divide-gray-200">
          {[
            { label: 'Groups', state: groups, setState: setGroups },
            { label: 'Profile', state: profile, setState: setProfile },
          ].map(({ label, state, setState }) => (

            <li key={label} className="flex items-center justify-between w-full py-4">
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
                    'inline-block h-5 w-5 transform rounded-full bg-white shadow-custom ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full border-t border-gray-200"></div>
      <div className="flex justify-end w-full px-4 py-4 mt-4 gap-x-3 sm:px-6">
        <button
          type="button"
          className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-custom ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-custom hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
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
      <div className="mt-2 border-t border-gray-200"></div>
      <div className="w-full">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="flex items-center justify-between w-full py-4">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-6 text-gray-900">Mailer *</p>
            </div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-custom ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {mail}
                  <ChevronDownIcon className="w-5 h-5 -mr-1 text-gray-400" aria-hidden="true" />
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
                <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-custom ring-1 ring-black ring-opacity-5 focus:outline-none">
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
          <li className="flex items-center justify-between w-full py-4">
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
                  'inline-block h-5 w-5 transform rounded-full bg-white shadow-custom ring-0 transition duration-200 ease-in-out'
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
            <li key={label} className="flex items-center justify-between w-full py-4">
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
                  className="block w-[160px] rounded-md border-0 py-1.5 text-gray-900 shadow-custom ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 pl-2"
                  placeholder={placeholder}
                />
              </div>
            </li>
          ))}
          <li className="flex items-center justify-between w-full py-4">
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
                  'inline-block h-5 w-5 transform rounded-full bg-white shadow-custom ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </li>
          <li className="flex items-center justify-between w-full py-4">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-6 text-gray-900">SMTP Security</p>
            </div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-custom ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {security}
                  <ChevronDownIcon className="w-5 h-5 -mr-1 text-gray-400" aria-hidden="true" />
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
                <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-custom ring-1 ring-black ring-opacity-5 focus:outline-none">
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
          <li className="flex items-center justify-between w-full py-4">
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
                  'inline-block h-5 w-5 transform rounded-full bg-white shadow-custom ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </li>
        </ul>
      </div>
      <div className="w-full border-t border-gray-200"></div>
      <div className="flex justify-end w-full px-4 py-4 mt-4 gap-x-3 sm:px-6">
        <button
          type="button"
          className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-custom ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-custom hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
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

  const handleSortUp = (index) => {
    if (index === 0) return;
    const items = Array.from(data);
    const temp = items[index - 1];
    items[index - 1] = items[index];
    items[index] = temp;
    setData(items);
  };

  const handleSortDown = (index) => {
    if (index === data.length - 1) return;
    const items = Array.from(data);
    const temp = items[index + 1];
    items[index + 1] = items[index];
    items[index] = temp;
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
                  className="px-6 py-3 text-2xl font-bold tracking-wider text-left text-gray-900"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-2xl font-bold tracking-wider text-left text-gray-900"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-2xl font-bold tracking-wider text-left text-gray-900"
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
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {department.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 pt-2 -ml-10 cursor-grab" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7 5a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-6 4a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-6 4a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                              </svg>
                              <input
                                type="text"
                                name={`name-${department.id}`}
                                id={`name-${department.id}`}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-custom ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 pl-2"
                                placeholder={department.name}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            <div className="flex items-center justify-left">
                              <img
                                src="assets/orderingup.svg"
                                alt="Up Arrow"
                                className="mr-3 cursor-pointer h-7 w-7"
                                onClick={() => handleSortUp(index)}
                              />
                              <img
                                src="assets/orderingdown.svg"
                                alt="Down Arrow"
                                className="ml-1 cursor-pointer h-7 w-7"
                                onClick={() => handleSortDown(index)}
                              />
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
        <div className="flex justify-end w-full px-4 py-4 mt-4 gap-x-3 sm:px-6">
          <button
            type="button"
            className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-custom ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-custom hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Save
          </button>
        </div>
      </section>
    </DragDropContext>
  );
};


// =============================================================================================================================================================

// Requests

// Sample data for demonstration purposes
const groupJoinData = [
  { name: 'Aisha Binti', department: 'Department', time: '2024-06-20T04:00:00Z', group: "Malaysia's spots", followers: '12,543 followers', profileImage: aishaImage, groupImage: community2 },
  { name: 'Thomas', department: 'Department', time: '2024-06-17T12:00:00Z', group: 'Around KL', followers: '13,983 followers', profileImage: thomasImage, groupImage: community3 },
  { name: 'Ben', department: 'Department', time: '2024-06-15T12:00:00Z', group: 'Where to Go', followers: '14,567 followers', profileImage: benImage, groupImage: community1 },
  { name: 'Thomas', department: 'Department', time: '2024-06-14T12:00:00Z', group: "Malaysia's spots", followers: '12,543 followers', profileImage: thomasImage, groupImage: community2 },
  { name: 'Aisha Binti', department: 'Department', time: '2024-06-10T12:00:00Z', group: 'Where to Go', followers: '14,567 followers', profileImage: aishaImage, groupImage: community1 }
];

const communityCreationData = [
  { name: 'Thomas', department: 'Department', time: '2024-06-20T02:00:00Z', group: "Malaysia's spots", followers: '12,543 followers', profileImage: thomasImage, groupImage: community1},
  { name: 'Aisha Binti', department: 'Department', time: '2024-06-19T04:00:00Z', group: 'Where to Go', followers: '14,567 followers', profileImage: aishaImage, groupImage: community1}
];

const orgChartPhotoChangeData = [
  { name: 'Thomas', department: 'Department', time: '2024-06-20T02:00:00Z', currentImage: thomasImage, changeImage: changeImage1 },
  { name: 'Aisha Binti', department: 'Department', time: '2024-06-19T04:00:00Z', currentImage: aishaImage, changeImage: changeImage2 }
];

const profileInformationData = [
  { name: 'Thomas', department: 'Department', time: '2024-06-19T04:00:00Z', profileImage: thomasImage, changeType: 'Email', currentValue: 'thomas@tourism.com.my', newValue: 'thomas.thomas@tourism.com.my'},
  { name: 'Aisha Binti', department: 'Department', time: '2024-06-10T12:00:00Z', profileImage: aishaImage, changeType: 'Location', currentValue: 'Tingkat 18', newValue: 'Tingkat 22'}
];

// Helper function to format time
const formatTime = (time) => {
  const now = moment();
  const date = moment(time);
  const diffInHours = now.diff(date, 'hours');
  const diffInDays = now.diff(date, 'days');

  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 2) {
    return '1 hour ago';
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 2) {
    return '1 day ago';
  } else if (diffInDays < 3) {
    return `${diffInDays} days ago`;
  } else {
    return date.format('DD/MM/YYYY');
  }
};

// Reusable Row Components
const GroupJoinRow = ({ name, department, time, group, followers, profileImage, groupImage }) => (
  <div className="flex items-center justify-between py-4 border-t border-gray-200">
    <div className="flex items-center w-1/4">
      <img className="w-10 h-10 rounded-full" src={profileImage} alt="User profile" />
      <div className="ml-3">
        <p className="text-sm font-bold text-black">{name} ({department})</p>
        <p className="text-xs font-semibold text-black">{formatTime(time)}</p>
      </div>
    </div>
    <p className="w-1/4 text-xs font-semibold text-center text-black">to join</p>
    <div className="flex items-center w-1/4">
      <img className="w-10 h-10 rounded-full" src={groupImage} alt="Group" />
      <div className="ml-3">
        <p className="text-sm font-bold text-black">{group}</p>
        <p className="text-xs text-gray-400">{followers}</p>
      </div>
    </div>
    <div className="flex justify-end w-1/4">
      <button className="px-4 py-1 text-sm font-bold text-white bg-blue-500 rounded-full">Approve</button>
      <button className="px-4 py-1 ml-2 text-sm font-bold text-white bg-red-500 rounded-full">Reject</button>
    </div>
  </div>
);

const CommunityCreationRow = ({ name, department, time, group, followers, profileImage, groupImage }) => (
  <div className="flex items-center justify-between py-4 border-t border-gray-200">
    <div className="flex items-center w-1/4">
      <img className="w-10 h-10 rounded-full" src={profileImage} alt="User profile" />
      <div className="ml-3">
        <p className="text-sm font-bold text-black">{name} ({department})</p>
        <p className="text-xs font-semibold text-black">{formatTime(time)}</p>
      </div>
    </div>
    <p className="w-1/4 text-xs font-semibold text-center text-black">wants to create</p>
    <div className="flex items-center w-1/4">
      <img className="w-10 h-10 rounded-full" src={groupImage} alt="Group" />
      <div className="ml-3">
        <p className="text-sm font-bold text-black">{group}</p>
        <p className="text-xs text-gray-400">{followers}</p>
      </div>
    </div>
    <div className="flex justify-end w-1/4">
      <button className="px-4 py-1 text-sm font-bold text-white bg-blue-500 rounded-full">Approve</button>
      <button className="px-4 py-1 ml-2 text-sm font-bold text-white bg-red-500 rounded-full">Reject</button>
    </div>
  </div>
);

const OrgChartPhotoChangeRow = ({ name, department, time, currentImage, changeImage }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <>
      <div className="relative flex items-center justify-between py-4 border-t border-gray-200">
        <div className="flex items-center w-1/4">
          <img className="w-10 h-10 rounded-full" src={currentImage} alt="User profile" />
          <div className="ml-3">
            <p className="text-sm font-bold text-black">{name} ({department})</p>
            <p className="text-xs font-semibold text-black">{formatTime(time)}</p>
          </div>
        </div>
        <p className="w-1/4 text-xs font-semibold text-center text-black">change to</p>
        <div className="flex items-center w-1/4">
          <img
            className="w-10 h-10 rounded-full cursor-pointer"
            src={changeImage}
            alt="Change"
            onClick={() => setIsPopupVisible(true)}
          />
        </div>
        <div className="flex justify-end w-1/4">
          <button className="px-4 py-1 text-sm font-bold text-white bg-blue-500 rounded-full">Approve</button>
          <button className="px-4 py-1 ml-2 text-sm font-bold text-white bg-red-500 rounded-full">Reject</button>
        </div>
      </div>

      {isPopupVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-grey-100 backdrop-blur-sm"
          onClick={() => setIsPopupVisible(false)}
        >
          <div
            className="relative p-4 bg-white rounded-lg shadow-custom"
            onClick={(e) => e.stopPropagation()}
          >
            <img className="object-cover rounded-lg w-96 h-96" src={changeImage} alt="Change" />
          </div>
        </div>
      )}
    </>
  );
};

const ProfileInformationRow = ({ name, department, time, profileImage, changeType, currentValue, newValue }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <>
      <div className="relative flex items-center justify-between py-4 border-t border-gray-200">
        <div className="flex items-center w-1/4">
          <img className="w-10 h-10 rounded-full" src={profileImage} alt="User profile" />
          <div className="ml-3">
            <p className="text-sm font-bold text-black">{name} ({department})</p>
            <p className="text-xs font-semibold text-black">{formatTime(time)}</p>
          </div>
        </div>
        <p className="w-1/4 text-xs font-semibold text-center text-black">change of</p>
        <div className="flex items-center w-1/4">
          <p className="font-medium text-blue-500 cursor-pointer" onClick={() => setIsPopupVisible(true)}>
            {changeType}
          </p>
        </div>
        <div className="flex justify-end w-1/4">
          <button className="px-4 py-1 text-sm font-bold text-white bg-blue-500 rounded-full">Approve</button>
          <button className="px-4 py-1 ml-2 text-sm font-bold text-white bg-red-500 rounded-full">Reject</button>
        </div>
      </div>

      {isPopupVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-grey-100 backdrop-blur-sm"
          onClick={() => setIsPopupVisible(false)}
        >
          <div
            className="relative p-8 bg-white shadow-custom rounded-xl w-120"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h2 className="mb-4 text-lg font-bold">{name} wants to change</h2>
              <hr className="border-t border-gray-300" style={{ borderColor: '#E4E4E4', width: '100%' }} />
              <p className="mt-4 mb-2 text-xl font-bold text-left">{changeType}: {currentValue}</p>
              <p className="mb-4 text-xl font-bold text-left">To: <a className="text-xl font-bold text-blue-500">{newValue}</a></p>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-full" onClick={() => setIsPopupVisible(false)}>Back</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};



// Main Component
const Requests = () => (
  <div>
    <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[900px] mb-5">
      <h2 className="mb-4 text-2xl font-bold text-blue-500">Group Join</h2>
      {groupJoinData.map((data, index) => (
        <GroupJoinRow key={index} {...data} />
      ))}
    </section>
    <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[900px] mb-5">
      <h2 className="mb-4 text-2xl font-bold text-blue-500">Community Creation</h2>
      {communityCreationData.map((data, index) => (
        <CommunityCreationRow key={index} {...data} />
      ))}
    </section>
    <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[900px] mb-5">
      <h2 className="mb-4 text-2xl font-bold text-blue-500">Organisational Chart Photo Change</h2>
      {orgChartPhotoChangeData.map((data, index) => (
        <OrgChartPhotoChangeRow key={index} {...data} />
      ))}
    </section>
    <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[900px]">
      <h2 className="mb-4 text-2xl font-bold text-blue-500">Profile Information</h2>
      {profileInformationData.map((data, index) => (
        <ProfileInformationRow key={index} {...data} />
      ))}
    </section>
  </div>
);


// =============================================================================================================================================================

// Audit Trail

function SearchButton({ children }) {
  return (
    <button className="justify-center px-11 py-5 bg-blue-500 rounded-3xl text-white font-bold max-md:px-5">
      {children}
    </button>
  );
}

function DateRangePicker({ startDate, endDate, onClick }) {
  return (
    <div
      className="relative flex flex-col justify-center px-5 py-1.5 text-xs text-center text-black bg-white rounded-md border border-solid border-zinc-300 cursor-pointer w-[200px]"
      onClick={onClick}
    >
      <div className="justify-center px-1.5 py-1 rounded-sm bg-sky-500 bg-opacity-10">
        {startDate} - {endDate}
      </div>
    </div>
  );
}

function generateDays(month, year, startDate, endDate, today) {
  const firstDayOfMonth = startOfMonth(new Date(year, month));
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);
  const startOfWeekDay = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  const endOfWeekDay = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startOfWeekDay, end: endOfWeekDay }).map((date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return {
      date: dateString,
      isCurrentMonth: isSameMonth(date, firstDayOfMonth),
      isSelected:
        (startDate && dateString === startDate) ||
        (endDate && dateString === endDate) ||
        (startDate && endDate && date >= parseISO(startDate) && date <= parseISO(endDate)),
      isToday: isSameDay(date, today),
    };
  });

  console.log('Generated days:', days);
  return days;
}

function Dropdown({ label }) {
  return (
    <div className="flex flex-col justify-center text-xs whitespace-nowrap text-neutral-800 w-[130px]">
      <div className="flex gap-5 justify-between px-3.5 py-2.5 bg-white rounded-2xl shadow-custom">
        <div>{label}</div>
        <img
          loading="lazy"
          src="/assets/Dropdownarrow.svg"
          className="shrink-0 self-start self-center border-black border-solid aspect-[1.85] stroke-[2px] stroke-black w-auto"
          alt=""
        />
      </div>
    </div>
  );
}

function AuditSearch() {
  return (
    <main className="flex flex-col px-8 py-6 bg-white rounded-2xl shadow-custom w-10/12 max-md:px-5">
      <form className="flex gap-5 text-sm whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <label htmlFor="searchInput" className="sr-only">
          Search
        </label>
        <input
          id="searchInput"
          type="search"
          placeholder="Search"
          className="grow justify-center items-start self-start p-5 rounded-3xl border border-solid border-neutral-200 text-neutral-800 text-opacity-50 w-fit max-md:pr-5 max-md:max-w-full"
        />
        <SearchButton>Search</SearchButton>
      </form>
      <section className="flex gap-5 justify-between self-start mt-6">
        <AuditCalendar startDate="April, 2024" endDate="April, 2024" />
        <Dropdown label="All" />
      </section>
    </main>
  );
}

export default function AuditCalendar() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: 'Start Date', endDate: 'End Date' });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [today, setToday] = useState(new Date());

  const fetchCurrentTime = async () => {
    try {
      const response = await axios.get('https://cors-anywhere.herokuapp.com/http://worldtimeapi.org/api/timezone/Asia/Kuala_Lumpur');
      console.log('API response:', response.data); // Log the API response
      const localDate = new Date(response.data.datetime);
      setToday(localDate);
      setCurrentMonth(localDate.getMonth());
      setCurrentYear(localDate.getFullYear());
      console.log('State updated:', localDate); // Log the updated date
    } catch (error) {
      console.error('Error fetching current time:', error);
    }
  };

  useEffect(() => {
    fetchCurrentTime();

    const interval = setInterval(fetchCurrentTime, 1000 * 60); // Update every minute to keep the calendar live
    return () => clearInterval(interval);
  }, []);

  const days = generateDays(currentMonth, currentYear, startDate, endDate, today);

  const handleDateRangeClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    if (isSelectingStartDate) {
      setStartDate(date);
      setEndDate(null);
      setIsSelectingStartDate(false);
    } else {
      if (new Date(date) < new Date(startDate)) {
        alert('End date must be after start date.');
        return;
      }
      setEndDate(date);
      setSelectedDateRange({ startDate, endDate: date });
      setShowCalendar(false);
      setIsSelectingStartDate(true);
    }
  };

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      const newMonth = subMonths(new Date(currentYear, currentMonth), 1);
      setCurrentMonth(newMonth.getMonth());
      setCurrentYear(newMonth.getFullYear());
    } else if (direction === 'next') {
      const newMonth = addMonths(new Date(currentYear, currentMonth), 1);
      setCurrentMonth(newMonth.getMonth());
      setCurrentYear(newMonth.getFullYear());
    }
  };

  const isSelectedDate = (date) => {
    if (!startDate || !endDate) return false;
    return new Date(date) >= new Date(startDate) && new Date(date) <= new Date(endDate);
  };

  return (
    <div className="relative">
      <DateRangePicker
        startDate={selectedDateRange.startDate}
        endDate={selectedDateRange.endDate}
        onClick={handleDateRangeClick}
      />
      {showCalendar && (
        <div className="absolute top-12 left-0 z-50 w-[300px] h-auto bg-white border border-gray-300 rounded-md shadow-custom">
          <div className="text-center lg:mt-2">
            <div className="flex items-center text-gray-900">
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={() => handleMonthChange('prev')}
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="flex-auto text-sm font-semibold">
                {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
              </div>
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={() => handleMonthChange('next')}
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-2 grid grid-cols-7 text-xs leading-6 text-gray-500">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow-custom ring-1 ring-gray-200">
              {days.map((day, dayIdx) => (
                <button
                  key={day.date}
                  type="button"
                  className={classNames(
                    'py-1.5 hover:bg-gray-100 focus:z-10',
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                    (day.isSelected || day.isToday) && 'font-semibold',
                    day.isSelected && 'text-white',
                    !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                    !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                    day.isToday && !day.isSelected && 'text-indigo-600',
                    isSelectedDate(day.date) && 'bg-indigo-200',
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === 6 && 'rounded-tr-lg',
                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                    dayIdx === days.length - 1 && 'rounded-br-lg',
                  )}
                  onClick={() => handleDateSelect(day.date)}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                      day.isToday && 'bg-indigo-600 text-white', // Styling for today
                      day.isSelected && !day.isToday && 'bg-indigo-500 text-white', // Styling for selected date
                      !day.isSelected && isSelectedDate(day.date) && 'bg-indigo-200', // Highlight selected range with lighter color
                    )}
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Function to generate a random action
const generateRandomAction = (username) => {
  const actions = [
    'Logged in to the system',
    'Added new file',
    'Deleted a record',
    'Updated user permissions',
    'Viewed audit log',
    'Changed system settings',
    'Logged out',
    'Generated report'
  ];
  const action = actions[Math.floor(Math.random() * actions.length)];
  return `${action} by ${username}`;
};

// Function to generate a random date/time
const generateRandomDateTime = (index) => {
  const randomDate = subDays(new Date(), index);
  return format(randomDate, 'yyyy-MM-dd HH:mm:ss');
};

const items = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  dateTime: generateRandomDateTime(index),
  username: index % 2 === 0 ? 'Admin' : 'Super Admin',
  action: generateRandomAction(index % 2 === 0 ? 'Admin' : 'Super Admin')
}));

const ITEMS_PER_PAGE = 25;

function AuditTrailTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(items.length / ITEMS_PER_PAGE)) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col px-5 py-4 bg-white rounded-2xl mt-5 shadow-custom w-10/12">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed border border-gray-300">
          <thead>
            <tr>
              <th scope="col" className="w-1/12 px-2 py-3 text-left text-md font-medium text-neutral-900 border border-gray-300">
                #
              </th>
              <th scope="col" className="w-2/12 px-2 py-3 text-left text-md font-medium text-neutral-900 border border-gray-300">
                Date/Time
              </th>
              <th scope="col" className="w-2/12 px-2 py-3 text-left text-md font-medium text-neutral-900 border border-gray-300">
                Username
              </th>
              <th scope="col" className="w-7/12 px-2 py-3 text-left text-md font-medium text-neutral-900 border border-gray-300">
                Action made
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedItems.map((item) => (
              <tr key={item.id}>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-neutral-900 border border-gray-300">{item.id}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-neutral-900 border border-gray-300">{item.dateTime}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-neutral-900 border border-gray-300">{item.username}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-neutral-900 border border-gray-300">{item.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-4">
        <div className="-mt-px flex w-0 flex-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-neutral-900 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Previous
          </button>
        </div>
        <div className="hidden md:-mt-px md:flex">
          {[...Array(Math.ceil(items.length / ITEMS_PER_PAGE)).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                currentPage === page + 1 ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-neutral-900 hover:text-gray-700 hover:border-gray-300'
              }`}
              aria-current={currentPage === page + 1 ? 'page' : undefined}
            >
              {page + 1}
            </button>
          ))}
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-neutral-900 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </div>
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
      {currentPage === 'Requests' && <Requests/>}
      {currentPage === 'Audit Trail' &&
        <>
          <AuditSearch onSave={handleSave} />
          <AuditTrailTable onSave={handleSave} />
        </>}
      {currentPage === 'Feedback' && <div></div>}
      {currentPage === 'Birthday Template' && <div></div>}
      {currentPage === 'Pautan' && <div></div>}
    </div>
  );
};

export { SettingsPage, LogoUploader, ThemeComponent, CoreFeatures, SizeLimit, Media, CoverPhotos, MailSettings, Departments, Requests, AuditSearch, AuditCalendar, AuditTrailTable };
