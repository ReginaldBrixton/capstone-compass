import React from 'react';
import PropTypes from 'prop-types';
export const AlertIcon = ({ variant, className }) => {
  const baseClasses = className || '';

  // Common SVG path for all variants
  const commonPath =
    'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z';
  return (
    <svg
      className={`${baseClasses} ${variant === 'dark' ? 'dark:text-gray-300' : ''}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
      data-oid="cta0tdi"
    >
      <path d={commonPath} data-oid="vipuy_s" />
    </svg>
  );
};
AlertIcon.propTypes = {
  variant: PropTypes.oneOf(['info', 'danger', 'success', 'warning', 'dark']).isRequired,
  className: PropTypes.string,
};
export default AlertIcon;
