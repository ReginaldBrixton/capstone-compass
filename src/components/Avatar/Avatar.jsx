import React from 'react';
import PropTypes from 'prop-types';

const SIZES = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-20 h-20',
  xl: 'w-36 h-36',
};

const Avatar = ({
  src,
  alt = '',
  size = 'md',
  rounded = true,
  bordered = false,
  initials,
  onClick,
  className = '',
}) => {
  const getAvatarClasses = () => {
    const classes = [SIZES[size]];

    if (rounded) {
      classes.push('rounded-full');
    } else {
      classes.push('rounded');
    }

    if (bordered) {
      classes.push('p-1 ring-2 ring-gray-300 dark:ring-gray-500');
    }

    if (onClick) {
      classes.push('cursor-pointer');
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={getAvatarClasses()}
        onClick={onClick}
      />
    );
  }

  if (initials) {
    return (
      <div
        className={`${getAvatarClasses()} flex items-center justify-center bg-gray-100 dark:bg-gray-600`}
        onClick={onClick}
      >
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${getAvatarClasses()} relative overflow-hidden bg-gray-100 dark:bg-gray-600`}
      onClick={onClick}
    >
      <svg
        className="absolute -left-1 h-12 w-12 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.bool,
  bordered: PropTypes.bool,
  initials: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Avatar;
