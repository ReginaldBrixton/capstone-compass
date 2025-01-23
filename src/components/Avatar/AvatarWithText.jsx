import React from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';

const AvatarWithText = ({
  src,
  alt,
  size = 'md',
  rounded = true,
  name,
  description,
  className = '',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Avatar src={src} alt={alt} size={size} rounded={rounded} />
      <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <div>{name}</div>
        {description && (
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

AvatarWithText.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.bool,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
};

export default AvatarWithText;
