import React from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';

const STATUS_COLORS = {
  online: 'bg-green-400',
  offline: 'bg-gray-400',
  busy: 'bg-red-400',
  away: 'bg-yellow-400',
};

const STATUS_POSITIONS = {
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0',
};

const AvatarStatus = ({
  src,
  alt,
  size = 'md',
  rounded = true,
  bordered = false,
  status,
  statusPosition = 'bottom-right',
  className = '',
  ...props
}) => {
  return (
    <div className={`avatar-status-wrapper relative inline-block ${className}`}>
      <Avatar src={src} alt={alt} size={size} rounded={rounded} bordered={bordered} {...props} />
      {status && (
        <span
          className={`
            avatar-status-indicator
            absolute w-3.5 h-3.5
            ${STATUS_COLORS[status]}
            ${STATUS_POSITIONS[statusPosition]}
            border-2 border-white dark:border-gray-800
            rounded-full
          `}
        />
      )}
    </div>
  );
};

AvatarStatus.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.bool,
  bordered: PropTypes.bool,
  status: PropTypes.oneOf(['online', 'offline', 'busy', 'away']),
  statusPosition: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
  className: PropTypes.string,
};

export default AvatarStatus;
