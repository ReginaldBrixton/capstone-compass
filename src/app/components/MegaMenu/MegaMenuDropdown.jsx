/**
 * @typedef {Object} MegaMenuDropdownProps
 * @property {'default' | 'icons' | 'full-width' | 'full-width-cta'} variant
 * @property {Object} content - The content to display in the dropdown
 */

import React, { memo, useMemo } from 'react';

const DropdownItem = memo(({ item, variant }) => {
  const itemClasses = useMemo(() => {
    const baseClasses =
      'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200';
    return variant === 'icons' ? `flex items-center ${baseClasses} group` : baseClasses;
  }, [variant]);

  return (
    <a href={item.href} className={itemClasses}>
      {item.icon && (
        <span className="w-5 h-5 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-200">
          {item.icon}
        </span>
      )}
      {item.label}
    </a>
  );
});

DropdownItem.displayName = 'DropdownItem';

const Section = memo(({ section }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-gray-900 dark:text-white">{section.title}</h3>
    <ul className="space-y-2">
      {section.items.map((item, index) => (
        <li key={index}>
          <DropdownItem item={item} />
        </li>
      ))}
    </ul>
  </div>
));

Section.displayName = 'Section';

const CTASection = memo(({ cta }) => (
  <div className="md:col-span-1 space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg transform hover:scale-[1.02] transition-transform duration-200">
    <h3 className="font-semibold text-gray-900 dark:text-white">{cta.title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{cta.description}</p>
    <a
      href={cta.href}
      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
    >
      {cta.label}
      <svg
        className="w-4 h-4 ms-2 rtl:rotate-180 transform group-hover:translate-x-1 transition-transform duration-200"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a>
  </div>
));

CTASection.displayName = 'CTASection';

const MegaMenuDropdown = ({ variant, content }) => {
  const dropdownClasses = useMemo(() => {
    const baseClasses =
      'z-10 bg-white border border-gray-100 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 backdrop-blur-lg backdrop-filter';

    switch (variant) {
      case 'icons':
        return `${baseClasses} grid grid-cols-2 text-sm md:grid-cols-3 absolute w-auto min-w-[300px]`;
      case 'full-width':
      case 'full-width-cta':
        return `${baseClasses} w-screen left-0 right-0 mt-1`;
      default:
        return `${baseClasses} absolute w-auto grid grid-cols-2 text-sm md:grid-cols-3 min-w-[300px]`;
    }
  }, [variant]);

  const contentClasses = useMemo(() => {
    const baseClasses = 'p-6 grid gap-6';
    return variant === 'icons'
      ? `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
      : `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl mx-auto`;
  }, [variant]);

  const renderContent = () => {
    switch (variant) {
      case 'icons':
        return content.items?.map((item, index) => (
          <DropdownItem key={index} item={item} variant="icons" />
        ));

      case 'full-width':
      case 'full-width-cta':
        return (
          <>
            {content.sections?.map((section, index) => (
              <Section key={index} section={section} />
            ))}
            {variant === 'full-width-cta' && content.cta && <CTASection cta={content.cta} />}
          </>
        );

      default:
        return content.items?.map((item, index) => <DropdownItem key={index} item={item} />);
    }
  };

  return (
    <div className={dropdownClasses}>
      <div className={contentClasses}>{renderContent()}</div>
    </div>
  );
};

export default memo(MegaMenuDropdown);
