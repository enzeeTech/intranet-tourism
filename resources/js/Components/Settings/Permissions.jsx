import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Reusable Row Component
const PermissionRow = ({ label, userState, setUserState, adminState, setAdminState }) => (
  <li className="grid grid-cols-12 items-center py-4 px-2">
    <div className="col-span-6 text-left">
      <p className="text-sm font-medium leading-6 text-gray-900">{label}</p>
    </div>
    <div className="col-span-2 flex justify-center">
      <Switch
        checked={userState}
        onChange={setUserState}
        className={classNames(
          userState ? 'bg-blue-500' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            userState ? 'translate-x-5' : 'translate-x-0',
            'inline-block h-5 w-5 transform rounded-full bg-white shadow-custom ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </div>
    <div className="col-span-2 flex justify-center">
      <Switch
        checked={adminState}
        onChange={setAdminState}
        className={classNames(
          adminState ? 'bg-blue-500' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            adminState ? 'translate-x-5' : 'translate-x-0',
            'inline-block h-5 w-5 transform rounded-full bg-white shadow-custom ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </div>
    <div className="col-span-2 flex justify-center opacity-50">
      <Switch
        checked={true} // Always on
        onChange={() => {}} // No action on change
        className="bg-blue-500 relative inline-flex h-6 w-11 flex-shrink-0 cursor-not-allowed rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
      >
        <span
          aria-hidden="true"
          className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow-custom ring-0 transition duration-200 ease-in-out"
        />
      </Switch>
    </div>
  </li>
);

// Separator Component
const ModuleSeparator = ({ title }) => (
  <div className="bg-blue-100 py-2 px-2">
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
  </div>
);

const Permissions = () => {
  // States for all permission rows
  const [loginUser, setLoginUser] = useState(false);
  const [loginAdmin, setLoginAdmin] = useState(false);

  const [createPostsUser, setCreatePostsUser] = useState(false);
  const [createPostsAdmin, setCreatePostsAdmin] = useState(false);

  const [adminViewUser, setAdminViewUser] = useState(false);
  const [adminViewAdmin, setAdminViewAdmin] = useState(false);

  const [postTypeUser, setPostTypeUser] = useState(false);
  const [postTypeAdmin, setPostTypeAdmin] = useState(false);

  // List of permissions
  const permissions = [
    {
      label: 'Single Sign-On (SSO) login',
      userState: loginUser,
      setUserState: setLoginUser,
      adminState: loginAdmin,
      setAdminState: setLoginAdmin,
    },
    {
      label: 'Create post (Upload Media & Add Tag)',
      userState: createPostsUser,
      setUserState: setCreatePostsUser,
      adminState: createPostsAdmin,
      setAdminState: setCreatePostsAdmin,
    },
    {
      label: 'View the name of Admin who create the post',
      userState: adminViewUser,
      setUserState: setAdminViewUser,
      adminState: adminViewAdmin,
      setAdminState: setAdminViewAdmin,
    },
    {
      label: 'Post as a different type of user',
      userState: postTypeUser,
      setUserState: setPostTypeUser,
      adminState: postTypeAdmin,
      setAdminState: setPostTypeAdmin,
    },
  ];

  return (
    <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom w-full">
      <div className="grid grid-cols-12 text-center mt-4">
        <div className="col-span-6 text-2xl font-bold text-blue-500">Actions</div>
        <div className="col-span-2 text-2xl font-bold text-blue-500">User</div>
        <div className="col-span-2 text-2xl font-bold text-blue-500">Admin</div>
        <div className="col-span-2 text-2xl font-bold text-blue-500 opacity-50">Jomla! Admin</div>
      </div>
      <div className="mt-2 border-t border-gray-200"></div>
      <div className="w-full">
        <ModuleSeparator title="Login" />
        <ul role="list" className="divide-y divide-gray-200">
          {permissions.slice(0, 1).map((permission) => (
            <PermissionRow key={permission.label} {...permission} />
          ))}
        </ul>
        <ModuleSeparator title="Wall Posting" />
        <ul role="list" className="divide-y divide-gray-200">
          {permissions.slice(1).map((permission) => (
            <PermissionRow key={permission.label} {...permission} />
          ))}
        </ul>
      </div>
      <div className="w-full border-t border-gray-200"></div>
    </section>
  );
};

export default Permissions;
