import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid'; // Assuming you're using Heroicons

const links = [
  {
    linkname: 'e-Library',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'ERMS (Electronic Record Management System)',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'Executive Information System (EIS)',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'HRMIS',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'MyFIS 2.0',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'MyFIS Lite 2.0: Pejabat Cawangan (Dalam Negeri/Luar Negeri)',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'MyFIS : Tuntutan Perjalanan dan Pendahuluan Ibu Pejabat',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'MyFIS : Portal Staf',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'MyFIS Core',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'MyFIS Lite : Pejabat Cawangan (Dalam Negeri/Luar Negeri)',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'Office 365',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'Sistem Kehadiran Pejabat',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'Sistem Keluar Pejabat',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'Sistem Pengurusan Aduan Integriti',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'Sistem Pengurusan Fasiliti',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
  {
    linkname: 'Sistem Pengurusan Helpdesk',
    url: 'https://example.com/e-library' // Replace with actual URL
  },
];

export default function Pautan() {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {links.map((refer) => (
        <li key={refer.url} className="relative flex justify-between gap-x-4 px-2 py-2 hover:bg-gray-50 sm:px-4">
          <a href={refer.url} target="_blank" rel="noopener noreferrer" className="flex min-w-0 gap-x-4 w-full">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-5 text-gray-900">
                {refer.linkname}
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
