import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
import logo from '../../../public/assets/logo.png';
import search from '../../../public/assets/search.png';
import notification from '../../../public/assets/notification.png';
import profileDummy from '../../../public/assets/profileDummy.png';
import './Reusable/css/General.css';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-50">
      <img src={logo} alt="Logo" className="h-12 ml-8" />

      <div className="relative flex items-center flex-grow mx-8">
        <img src={search} alt="Search" className="absolute w-6 h-6 transform -translate-y-1/2 left-3 top-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          style={{ width: '1000px', paddingLeft: '3rem', borderColor: 'black', borderRadius: '2rem', transition: 'border-color 0.3s' }}
          onFocus={(e) => { e.target.style.borderColor = 'blue'; }}
          onBlur={(e) => { e.target.style.borderColor = 'black'; }}
        />
      </div>

      <div className="flex items-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="focus:outline-none relative">
              <img src={notification} alt="Notification" className="w-5 h-6 mr-1  " />
              <div className="absolute top-0 left-0 w-10 h-10 bg-black opacity-0 transition duration-300 ease-in-out hover:opacity-5 rounded-sm  "></div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-96  max-h-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-4 px-4 ">

              <Menu.Item>
              {({ active }) => (
                <div className="flex items-center bg-gray">

              <div className=" relative"><img src={profileDummy} alt="Image" className="h-14 w-14 mr-2" />
                     <img src={profileDummy} alt="Additional Image" className="absolute h-5 w-5 bottom-2 left-10 " />
                </div>
                <div className="flex-col">
                  {/* Add an additional image here */}
                  <a
                    href="#"
                    className={`block px-2 py-1 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                  >
                    Thomas requested to join a group!
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500"> Check The Request</span>
                      <span className="text-xs text-gray-500">10 min ago</span>
                    </div> 
                  </a>
                </div>
              </div>
              
               
               
              )}
            </Menu.Item>


            <Menu.Item>
              {({ active }) => (
          <div className="flex items-center bg-gray">
              <div className=" relative"><img src={profileDummy} alt="Image" className="h-14 w-14 mr-2" />
                     <img src={profileDummy} alt="Additional Image" className="absolute h-5 w-5 bottom-2 left-10 " />
                    </div>
          <div className="flex-col">
            <a
              href="#"
              className={`block px-2 py-1 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
            >
              Lepp requested to join a group!
              <div className="flex flex-col">
                <span className="text-xs text-gray-500"> Check The Request</span>
                <span className="text-xs text-gray-500">10 min ago</span>
              </div> 
            </a>
          </div>
        </div>
        
               
              )}
            </Menu.Item>  
            <Menu.Item>
              {({ active }) => (
          <div className="flex items-center bg-gray">

                  <div className=" relative"><img src={profileDummy} alt="Image" className="h-14 w-14 mr-2" />
                     <img src="http://127.0.0.1:5173/public/assets/comment.png" alt="Comment Image" className="absolute h-5 w-5 bottom-2 left-10 " />
                    </div>  
                   <div className="flex-col">
                     {/* Add an additional image here */}
                     <a
                       href="#"
                       className={`block px-2 py-1 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                     >
                       Wan requested to join a group!
                       <div className="flex flex-col">
                         <span className="text-xs text-gray-500"> Check The Request</span>
                         <span className="text-xs text-gray-500">10 min ago</span>
                       </div> 
                     </a>
                   </div>
                 </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                   <div className="flex items-center bg-gray">

                  <div className=" relative"><img src={profileDummy} alt="Image" className="h-14 w-14 mr-2" />
                     <img src={profileDummy} alt="Additional Image" className="absolute h-5 w-5 bottom-2 left-10 " />
                    </div>
                   <div className="flex-col">
                     {/* Add an additional image here */}
                     <a
                       href="#"
                       className={`block px-2 py-1 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                     >
                       Lee requested to join a group!
                       <div className="flex flex-col">
                         <span className="text-xs text-gray-500"> Check The Request</span>
                         <span className="text-xs text-gray-500">10 min ago</span>
                       </div> 
                     </a>
                   </div>
                 </div>
               
              )}
            </Menu.Item>
                <form method="POST" action="#">
                <Menu.Item>
              {({ active }) => (
                   <div className="flex items-center bg-gray">

                    <div className=" relative"><img src={profileDummy} alt="Image" className="h-14 w-14 mr-2" />
                     <img src={profileDummy} alt="Additional Image" className="absolute h-5 w-5 bottom-2 left-10 " />
                    </div>
                   <div className="flex-col">
                     {/* Add an additional image here */}
                     <a
                       href="#"
                       className={`block px-2 py-1 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                     >
                       Brendo requested to join a group!
                       <div className="flex flex-col">
                         <span className="text-xs text-gray-500"> Check The Request</span>
                         <span className="text-xs text-gray-500">10 min ago</span>
                       </div> 
                     </a>
                   </div>
                   
                 </div>
              )}
            </Menu.Item>
            <div className="flex flex-row w-full h-10"></div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View All
          </button>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <table>
          <tr>
            <td>
              <a href='../profile'>
              <img src={profileDummy} alt="Profile" className="w-12 h-12 ml-4 mr-2 rounded-full" />
              </a>
            </td>
            <td>
              <span className="mr-2 font-semibold">Username</span>
            </td>
          </tr>
        </table>
      </div>
    </header>
  );
};

export default Header;
