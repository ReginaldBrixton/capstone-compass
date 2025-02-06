import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
const AvatarDropdown = ({
  src,
  alt,
  size = 'md',
  placement = 'bottom-start',
  userInfo,
  menuItems,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !avatarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const getDropdownPosition = () => {
    switch (placement) {
      case 'bottom-start':
        return 'left-0 top-full mt-2';
      case 'bottom-end':
        return 'right-0 top-full mt-2';
      case 'top-start':
        return 'left-0 bottom-full mb-2';
      case 'top-end':
        return 'right-0 bottom-full mb-2';
      default:
        return 'left-0 top-full mt-2';
    }
  };
  return (
    <div className={`relative inline-block ${className}`} data-oid="adr1gb2">
      <div ref={avatarRef} data-oid="6i508tj">
        <Avatar
          src={src}
          alt={alt}
          size={size}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer"
          data-oid="m1yvf4e"
        />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute ${getDropdownPosition()} z-10 w-60 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700`}
          data-oid="-oydcx2"
        >
          {userInfo && (
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white" data-oid=":4guvr4">
              <div className="font-semibold" data-oid="s7wjl8m">
                {userInfo.name}
              </div>
              <div className="truncate" data-oid="xmy3s3t">
                {userInfo.email}
              </div>
            </div>
          )}

          {menuItems?.length > 0 && (
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" data-oid="nmr9coh">
              {menuItems.map((item, index) => (
                <li key={index} data-oid="v4gg:gj">
                  {item.divider ? (
                    <hr className="my-1 border-gray-200 dark:border-gray-600" data-oid="eihrnja" />
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                          setIsOpen(false);
                        }
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      data-oid="nlaik:w"
                    >
                      <div className="flex items-center gap-2" data-oid="w0nmid6">
                        {item.icon && (
                          <span className="h-4 w-4" data-oid="96j7415">
                            {item.icon}
                          </span>
                        )}
                        {item.label}
                      </div>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
AvatarDropdown.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  placement: PropTypes.oneOf(['bottom-start', 'bottom-end', 'top-start', 'top-end']),
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.node,
      divider: PropTypes.bool,
    })
  ),
  className: PropTypes.string,
};
export default AvatarDropdown;
