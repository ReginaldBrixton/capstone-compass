import React from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';

const AvatarGroup = ({
  avatars,
  max = 4,
  size = 'md',
  rounded = true,
  bordered = true,
  className = '',
  counterClassName = '',
  showCounter = true,
  overlap = 'md',
  direction = 'row',
}) => {
  const getOverlapClass = () => {
    switch (overlap) {
      case 'sm':
        return '-space-x-3';
      case 'md':
        return '-space-x-4';
      case 'lg':
        return '-space-x-6';
      default:
        return '-space-x-4';
    }
  };

  const getUIAvatarUrl = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=512`;
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs':
        return 'w-6 h-6';
      case 'sm':
        return 'w-8 h-8';
      case 'md':
        return 'w-10 h-10';
      case 'lg':
        return 'w-20 h-20';
      case 'xl':
        return 'w-36 h-36';
      default:
        return 'w-10 h-10';
    }
  };

  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;
  const hasMore = remainingCount > 0;

  return (
    <div
      className={`flex ${direction === 'row' ? 'flex-row' : 'flex-col'} ${direction === 'row' ? getOverlapClass() : '-space-y-4'} group rtl:space-x-reverse ${className} `}
    >
      {visibleAvatars.map((avatar, index) => (
        <div
          key={avatar.id || index}
          className={`relative inline-block ${direction === 'row' ? '' : 'ml-4'} ${getSizeClass()} transform transition-all duration-300 group-hover:translate-x-[${index * 10}px] hover:z-50 hover:scale-125`}
          style={{ zIndex: visibleAvatars.length - index }}
          title={avatar.name || avatar.alt}
        >
          <img
            src={avatar.src || getUIAvatarUrl(avatar.name || avatar.alt)}
            alt={avatar.name || avatar.alt}
            className={`h-full w-full object-cover ${rounded ? 'rounded-full' : 'rounded-lg'} ${bordered ? 'border-2 border-white shadow-lg dark:border-gray-800' : ''} ${avatar.className || ''} filter transition-all duration-300 hover:border-transparent hover:ring-2 hover:ring-blue-500 hover:brightness-110 dark:hover:ring-blue-400`}
          />
          {avatar.status && (
            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-110 dark:border-gray-800 ${
                avatar.status === 'online'
                  ? 'animate-pulse bg-green-400'
                  : avatar.status === 'away'
                    ? 'bg-yellow-400'
                    : avatar.status === 'busy'
                      ? 'bg-red-400'
                      : 'bg-gray-400'
              } `}
            />
          )}
        </div>
      ))}
      {hasMore && showCounter && (
        <div
          className={`relative inline-flex items-center justify-center ${getSizeClass()} border-2 border-white bg-gradient-to-br from-gray-700 to-gray-900 font-semibold text-white dark:border-gray-800 ${rounded ? 'rounded-full' : 'rounded-lg'} text-xs shadow-lg transition-all duration-300 hover:z-50 hover:scale-110 hover:from-gray-600 hover:to-gray-800 ${size === 'lg' && 'text-base'} ${size === 'xl' && 'text-lg'} ${counterClassName} `}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

AvatarGroup.propTypes = {
  avatars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      src: PropTypes.string,
      name: PropTypes.string,
      alt: PropTypes.string,
      status: PropTypes.oneOf(['online', 'offline', 'away', 'busy']),
      className: PropTypes.string,
    })
  ).isRequired,
  max: PropTypes.number,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.bool,
  bordered: PropTypes.bool,
  className: PropTypes.string,
  counterClassName: PropTypes.string,
  showCounter: PropTypes.bool,
  overlap: PropTypes.oneOf(['sm', 'md', 'lg']),
  direction: PropTypes.oneOf(['row', 'column']),
};

export default AvatarGroup;
