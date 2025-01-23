/**
 * @typedef {Object} MegaMenuProps
 * @property {'default' | 'icons' | 'full-width' | 'full-width-cta'} variant - The variant of the mega menu
 * @property {React.ReactNode} logo - Logo component or image
 * @property {string} brandName - Name of the brand/company
 * @property {Array<MenuItem>} menuItems - Array of menu items
 * @property {boolean} [rtl=false] - Enable RTL support
 * @property {string} [className] - Additional CSS classes
 */

'use client';

import React, { memo, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

import MegaMenuDropdown from './MegaMenuDropdown';
import MegaMenuMobile from './MegaMenuMobile';

// Memoized MenuItem component for better performance
const MenuItem = memo(
  ({ item, index, activeDropdown, setActiveDropdown, variant }) => {
    const handleDropdownClick = useCallback(() => {
      setActiveDropdown(activeDropdown === index ? null : index);
    }, [activeDropdown, index, setActiveDropdown]);

    const dropdownVariants = {
      hidden: { opacity: 0, y: -5 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.2,
          ease: 'easeOut',
        },
      },
      exit: {
        opacity: 0,
        y: -5,
        transition: {
          duration: 0.2,
          ease: 'easeIn',
        },
      },
    };

    return (
      <li className="group relative">
        {item.dropdown ? (
          <>
            <button
              onClick={handleDropdownClick}
              className="flex w-full items-center justify-between px-3 py-2 font-medium text-gray-900 hover:text-blue-600 group-hover:text-blue-600 dark:text-white md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:text-blue-500"
              aria-expanded={activeDropdown === index}
            >
              {item.label}
              <svg
                className={`ms-3 h-2.5 w-2.5 transition-transform duration-200 ${
                  activeDropdown === index ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <AnimatePresence>
              {activeDropdown === index && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute left-0 w-full md:w-auto"
                >
                  <MegaMenuDropdown
                    variant={variant}
                    content={item.dropdown}
                    onClose={() => setActiveDropdown(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <a
            href={item.href}
            className="block px-3 py-2 text-gray-900 transition-colors duration-200 hover:text-blue-600 group-hover:text-blue-600 dark:text-white md:p-0 md:dark:hover:text-blue-500"
          >
            {item.label}
          </a>
        )}
      </li>
    );
  }
);

MenuItem.displayName = 'MenuItem';

const MegaMenu = ({
  variant = 'default',
  logo,
  brandName,
  menuItems = [],
  rtl = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMobileToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const baseClasses = useMemo(
    () => `
    fixed top-0 left-0 right-0 z-50
    bg-white/90 backdrop-blur-md border-b border-gray-200 
    dark:bg-gray-900/90 dark:border-gray-700
    ${rtl ? 'rtl' : 'ltr'}
    ${className}
  `,
    [rtl, className]
  );

  return (
    <nav className={baseClasses}>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        {/* Brand/Logo Section */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {logo && (
            <div className="h-8 w-auto transition-transform duration-200 hover:scale-105">
              {logo}
            </div>
          )}
          {brandName && (
            <span className="self-center whitespace-nowrap text-2xl font-semibold transition-colors duration-200 hover:text-blue-600 dark:text-white dark:hover:text-blue-500">
              {brandName}
            </span>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={handleMobileToggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:order-1 md:flex md:w-auto">
          <ul className="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8 rtl:space-x-reverse">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                index={index}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                variant={variant}
              />
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <MegaMenuMobile
              menuItems={menuItems}
              onClose={handleClose}
              variant={variant}
            />
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default memo(MegaMenu);
