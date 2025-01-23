import React from 'react';
import PropTypes from 'prop-types';

const ProfileInfoItem = ({
  icon = '📚',
  label,
  value,
  onEdit,
  type = 'text',
  className = ''
}) => {
  return (
    <div 
      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${className}`}
      onClick={onEdit}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onEdit?.()}
    >
      {/* Icon Container */}
      <div className="text-2xl">
        {typeof icon === 'string' ? (
          <span>{icon}</span>
        ) : (
          React.isValidElement(icon) && icon
        )}
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-medium dark:text-white truncate">
          {value || 'Not specified'}
        </p>
      </div>

      {/* Edit Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-pencil w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors"
        aria-label={`Edit ${label}`}
      >
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
        <path d="m15 5 4 4"></path>
      </svg>
    </div>
  );
};

// PropTypes (if using TypeScript, you should create an interface instead)
ProfileInfoItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  type: PropTypes.string,
  className: PropTypes.string
};

export default ProfileInfoItem;