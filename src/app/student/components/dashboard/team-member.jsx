import React from 'react';

/**
 * TeamMember component displays a team member's information with their avatar and role.
 * Built with responsive grid/flexbox layout and minimal styling.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.name - The name of the team member.
 * @param {string} props.role - The role of the team member.
 * @returns {JSX.Element} The rendered TeamMember component.
 */
export const TeamMember = ({ name = '', role = '' }) => {
  const avatarUrl = `https://avatar.vercel.sh/${name}.png`;

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="grid grid-cols-[auto,1fr] gap-4 p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="relative w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16">
          <img
            src={avatarUrl}
            alt={name}
            className="rounded-full w-full h-full object-cover border border-gray-100 dark:border-gray-800"
          />
        </div>

        <div className="flex flex-col justify-center min-w-0 gap-1.5">
          <h3 className="text-sm xs:text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 truncate">
            {name || 'Anonymous User'}
          </h3>
          <div className="w-fit px-3 py-1 rounded-full text-xs xs:text-sm bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
            {role || 'Team Member'}
          </div>
        </div>
      </div>
    </div>
  );
};
