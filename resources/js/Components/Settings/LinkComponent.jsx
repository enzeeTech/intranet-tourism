import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from '@heroicons/react/20/solid';

// const links = [
//   {
//     label: 'e-Library',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'ERMS (Electronic Record Management System)',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'Executive Information System (EIS)',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'HRMIS',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'MyFIS 2.0',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'MyFIS Lite 2.0: Pejabat Cawangan (Dalam Negeri/Luar Negeri)',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'MyFIS : Tuntutan Perjalanan dan Pendahuluan Ibu Pejabat',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'MyFIS : Portal Staf',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'MyFIS Core',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'MyFIS Lite : Pejabat Cawangan (Dalam Negeri/Luar Negeri)',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'Office 365',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'Sistem Kehadiran Pejabat',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'Sistem Keluar Pejabat',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'Sistem Pengurusan Aduan Integriti',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'Sistem Pengurusan Fasiliti',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
//   {
//     label: 'Sistem Pengurusan Helpdesk',
//     url: 'https://example.com/e-library' // Replace with actual URL
//   },
// ];

export default function Pautan() {
  const [extlink, setExtlink] = useState([]);

  useEffect(() => {
    const fetchExtlink = async () => {
        const url = 'http://localhost:8000/api/crud/external_links';
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data.data.data); // Log the fetched data to the console
            setExtlink(data.data.data);    // Update the state with fetched data
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    fetchExtlink(); // Call the fetchPosts function when the component mounts
}, []); // Empty dependency array means this effect runs only once on mount

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {extlink.map((refer) => (
        <li key={refer.label} className="relative flex justify-between gap-x-4 px-2 py-2 hover:bg-gray-50 sm:px-4">
          <a href={refer.url} target="_blank" rel="noopener noreferrer" className="flex min-w-0 gap-x-4 w-full">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-5 text-gray-900">
                {refer.label}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-x-2">
              <ChevronRightIcon className="h-4 w-4 flex-none text-gray-400" aria-hidden="true" />
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
