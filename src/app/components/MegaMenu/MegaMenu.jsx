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
const MenuItem = memo(({ item, index, activeDropdown, setActiveDropdown, variant }) => {
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
    <li className="relative group">
      {item.dropdown ? (
        <>
          <button
            onClick={handleDropdownClick}
            className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 hover:text-blue-600 md:w-auto md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 group-hover:text-blue-600"
            aria-expanded={activeDropdown === index}
          >
            {item.label}
            <svg
              className={`w-2.5 h-2.5 ms-3 transition-transform duration-200 ${
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
          className="block py-2 px-3 text-gray-900 hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 group-hover:text-blue-600 transition-colors duration-200"
        >
          {item.label}
        </a>
      )}
    </li>
  );
});

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
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
        {/* Brand/Logo Section */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {logo && (
            <div className="h-8 w-auto transition-transform duration-200 hover:scale-105">
              {logo}
            </div>
          )}
          {brandName && (
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200">
              {brandName}
            </span>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={handleMobileToggle}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors duration-200"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="w-5 h-5"
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
        <div className="hidden md:flex md:w-auto md:order-1">
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
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
            <MegaMenuMobile menuItems={menuItems} onClose={handleClose} variant={variant} />
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default memo(MegaMenu);
