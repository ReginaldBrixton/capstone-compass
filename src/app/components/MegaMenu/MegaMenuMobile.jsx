/**
 * @typedef {Object} MegaMenuMobileProps
 * @property {Array<MenuItem>} menuItems - Array of menu items
 * @property {Function} onClose - Function to call when menu should close
 * @property {'default' | 'icons' | 'full-width' | 'full-width-cta'} variant
 */

import React, { memo, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
const MobileMenuItem = memo(({ item, isActive, onToggle, onClose, variant }) => {
  const dropdownVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
          ease: 'easeInOut',
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: {
          duration: 0.3,
          ease: 'easeInOut',
        },
        opacity: {
          duration: 0.2,
          delay: 0.1,
        },
      },
    },
  };
  const renderDropdownContent = () => {
    if (variant === 'icons' && item.dropdown?.items) {
      return item.dropdown.items.map((dropdownItem, index) => (
        <a
          key={index}
          href={dropdownItem.href}
          className="flex items-center py-3 text-gray-600 transition-colors duration-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
          onClick={onClose}
          data-oid="8tfho4c"
        >
          {dropdownItem.icon && (
            <span
              className="mr-3 h-5 w-5 text-gray-400 transition-colors duration-200 group-hover:text-blue-600 dark:text-gray-500 dark:group-hover:text-blue-500"
              data-oid="8y-swy3"
            >
              {dropdownItem.icon}
            </span>
          )}
          {dropdownItem.label}
        </a>
      ));
    }
    if ((variant === 'full-width' || variant === 'full-width-cta') && item.dropdown?.sections) {
      return (
        <>
          {item.dropdown.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6" data-oid="j41uulv">
              <h3 className="mb-3 font-medium text-gray-900 dark:text-white" data-oid="e_n_91q">
                {section.title}
              </h3>
              <ul className="space-y-3" data-oid="-s_zwj8">
                {section.items.map((dropdownItem, itemIndex) => (
                  <li key={itemIndex} data-oid="f-o6z8h">
                    <a
                      href={dropdownItem.href}
                      className="text-gray-600 transition-colors duration-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                      onClick={onClose}
                      data-oid="vtt6h3t"
                    >
                      {dropdownItem.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {variant === 'full-width-cta' && item.dropdown.cta && (
            <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800" data-oid="f34_m43">
              <h3 className="mb-2 font-medium text-gray-900 dark:text-white" data-oid="f3_z_3o">
                {item.dropdown.cta.title}
              </h3>
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-400" data-oid="q:ga26v">
                {item.dropdown.cta.description}
              </p>
              <a
                href={item.dropdown.cta.href}
                className="inline-flex items-center text-blue-600 transition-colors duration-200 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                onClick={onClose}
                data-oid="1kzbzpc"
              >
                {item.dropdown.cta.label}
                <svg
                  className="ml-2 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  data-oid="tq0stn."
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                    data-oid="rx1cd9v"
                  />
                </svg>
              </a>
            </div>
          )}
        </>
      );
    }
    return null;
  };
  return (
    <div className="border-b border-gray-200 last:border-0 dark:border-gray-700" data-oid="11z3zrk">
      {item.dropdown ? (
        <>
          <button
            onClick={onToggle}
            className="flex w-full items-center justify-between py-4 text-gray-900 transition-colors duration-200 hover:text-blue-600 dark:text-white dark:hover:text-blue-500"
            data-oid="a:9ue8i"
          >
            <span className="text-lg font-medium" data-oid="06zvgyy">
              {item.label}
            </span>
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="y9m-s58"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
                data-oid="1jinuz:"
              />
            </svg>
          </button>
          <AnimatePresence data-oid="mg1hos3">
            {isActive && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="overflow-hidden"
                data-oid="qdt_uo1"
              >
                <div className="space-y-2 py-2 pl-4" data-oid="blfkvq3">
                  {renderDropdownContent()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <a
          href={item.href}
          className="block py-4 text-lg font-medium text-gray-900 transition-colors duration-200 hover:text-blue-600 dark:text-white dark:hover:text-blue-500"
          onClick={onClose}
          data-oid="1682bhq"
        >
          {item.label}
        </a>
      )}
    </div>
  );
});
MobileMenuItem.displayName = 'MobileMenuItem';
const MegaMenuMobile = ({ menuItems, onClose, variant }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleToggle = useCallback(
    (index) => {
      setActiveDropdown(activeDropdown === index ? null : index);
    },
    [activeDropdown]
  );
  const menuVariants = {
    hidden: {
      x: '-100%',
      opacity: 0,
      transition: {
        x: {
          duration: 0.3,
          ease: 'easeInOut',
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: {
          duration: 0.3,
          ease: 'easeInOut',
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: {
        x: {
          duration: 0.3,
          ease: 'easeInOut',
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  };
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-white/95 backdrop-blur-lg dark:bg-gray-900/95 md:hidden"
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-oid="spe5i47"
    >
      <div className="p-4" data-oid="xvyc-kl">
        <div className="mb-6 flex items-center justify-between" data-oid="yyqg3dg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" data-oid="3.swq5z">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="Close menu"
            data-oid="-0hvqf3"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="2.bv5:e"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                data-oid="frfesvw"
              />
            </svg>
          </button>
        </div>

        <nav className="space-y-1" data-oid="d.kbjet">
          {menuItems.map((item, index) => (
            <MobileMenuItem
              key={index}
              item={item}
              isActive={activeDropdown === index}
              onToggle={() => handleToggle(index)}
              onClose={onClose}
              variant={variant}
              data-oid="bemga6x"
            />
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
export default memo(MegaMenuMobile);
