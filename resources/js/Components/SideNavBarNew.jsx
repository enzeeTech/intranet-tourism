import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, HomeIcon, UserGroupIcon, CalendarIcon, BuildingOfficeIcon, GlobeAltIcon, FolderIcon, LinkIcon, Cog6ToothIcon, PlayCircleIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { useState, Fragment } from 'react'


const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
  { name: 'StaffDirectory', href: '/staffDirectory', icon: UserGroupIcon, current: false },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon, current: false },
  { name: 'Department', href: '/departments', icon: BuildingOfficeIcon, current: false },
  { name: 'Community Groups', href: '/community', icon: GlobeAltIcon, current: false },
  { name: 'File Management', href: '/fileManagement', icon: FolderIcon, current: true },
  { name: 'Links', href: '#', icon: LinkIcon, current: false },
  { name: 'Media', href: '/media', icon: PlayCircleIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
  { name: 'Logout', href: '/logout', icon: ArrowLeftStartOnRectangleIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <Transition show={sidebarOpen} as={Fragment}>
        <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white shadow-sm px-6 pb-2 ring-1 ring-gray-200 border-r border-gray-200">
                  <div className="flex h-16 shrink-0 items-center lg:hidden">
                    <img
                      className="h-8 w-[70px]"
                      src="assets/Jomla logo red.svg"
                      alt="Jomla Logo"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="-mx-2 flex-1 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-white lg:shadow-sm lg:border-r lg:border-gray-200 lg:pb-4">
        <div className="flex h-16 shrink-0 items-center justify-center">
          {/* Removed Jomla Logo from here */}
        </div>
        <nav className="mt-8">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 stroke-blue-500',
                    'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold'
                  )}
                >
                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <span className="sr-only">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
