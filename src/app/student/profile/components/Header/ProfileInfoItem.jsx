import React from 'react';
import PropTypes from 'prop-types';
const ProfileInfoItem = ({ icon = '📚', label, value, onEdit, type = 'text', className = '' }) => {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${className}`}
      onClick={onEdit}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onEdit?.()}
      data-oid="outl.v9"
    >
      {/* Icon Container */}
      <div className="text-2xl" data-oid="a8dakaj">
        {typeof icon === 'string' ? (
          <span data-oid="k238:tm">{icon}</span>
        ) : (
          React.isValidElement(icon) && icon
        )}
      </div>

      {/* Text Content */}
      <div className="min-w-0 flex-1" data-oid="kdw3a30">
        <p className="text-sm text-gray-500 dark:text-gray-400" data-oid="wuy-g4p">
          {label}
        </p>
        <p className="truncate font-medium dark:text-white" data-oid="zs9ey:9">
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
        className="lucide lucide-pencil h-5 w-5 text-gray-400 transition-colors hover:text-blue-600"
        aria-label={`Edit ${label}`}
        data-oid="pp3:ki0"
      >
        <path
          d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
          data-oid="m6ku098"
        ></path>
        <path d="m15 5 4 4" data-oid="l-he-_9"></path>
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
  className: PropTypes.string,
};
export default ProfileInfoItem;
