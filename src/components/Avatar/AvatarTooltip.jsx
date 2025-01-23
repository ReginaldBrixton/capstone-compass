import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';

const AvatarTooltip = ({
  src,
  alt,
  size = 'md',
  rounded = true,
  bordered = false,
  tooltipId,
  tooltipText,
  placement = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getTooltipPosition = () => {
    switch (placement) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  const getArrowPosition = () => {
    switch (placement) {
      case 'top':
        return 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700';
      case 'bottom':
        return 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-700';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-700';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-700';
      default:
        return 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700';
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        <Avatar
          src={src}
          alt={alt}
          size={size}
          rounded={rounded}
          bordered={bordered}
          className="cursor-default"
          aria-describedby={tooltipId}
        />
      </div>

      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={`absolute ${getTooltipPosition()} z-10 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-opacity duration-300 dark:bg-gray-700`}
        >
          {tooltipText}
          <div
            className={`absolute h-2 w-2 ${getArrowPosition()} border-4 border-transparent`}
          />
        </div>
      )}
    </div>
  );
};

AvatarTooltip.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.bool,
  bordered: PropTypes.bool,
  tooltipId: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  className: PropTypes.string,
};

export default AvatarTooltip;
