import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pautan() {
  const [extlink, setExtlink] = useState([]);

  useEffect(() => {
    const fetchExtlink = async () => {
      const url = '/api/crud/external_links';
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const sortedLinks = data.data.data.sort((a, b) => a.order - b.order); // Sort by 'order'
        setExtlink(sortedLinks); // Update state with sorted data
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchExtlink();
  }, []);

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
