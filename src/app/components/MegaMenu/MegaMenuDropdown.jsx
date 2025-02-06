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
    <a href={item.href} className={itemClasses} data-oid="04xpgqp">
      {item.icon && (
        <span
          className="me-2 h-5 w-5 text-gray-400 transition-colors duration-200 group-hover:text-blue-600 dark:text-gray-500 dark:group-hover:text-blue-500"
          data-oid="5:e815m"
        >
          {item.icon}
        </span>
      )}
      {item.label}
    </a>
  );
});
DropdownItem.displayName = 'DropdownItem';
const Section = memo(({ section }) => (
  <div className="space-y-4" data-oid="qbg6lf2">
    <h3 className="font-semibold text-gray-900 dark:text-white" data-oid="y2v:9yl">
      {section.title}
    </h3>
    <ul className="space-y-2" data-oid="m6m6ycz">
      {section.items.map((item, index) => (
        <li key={index} data-oid="q25m49:">
          <DropdownItem item={item} data-oid="tnfsn4h" />
        </li>
      ))}
    </ul>
  </div>
));
Section.displayName = 'Section';
const CTASection = memo(({ cta }) => (
  <div
    className="transform space-y-4 rounded-lg bg-gray-50 p-6 transition-transform duration-200 hover:scale-[1.02] dark:bg-gray-800 md:col-span-1"
    data-oid="zyqhilo"
  >
    <h3 className="font-semibold text-gray-900 dark:text-white" data-oid=".9xbtj5">
      {cta.title}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-400" data-oid="8yjna3:">
      {cta.description}
    </p>
    <a
      href={cta.href}
      className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
      data-oid="7p7s25q"
    >
      {cta.label}
      <svg
        className="ms-2 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
        data-oid="88_qh9p"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
          data-oid="wdmleh3"
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
          <DropdownItem key={index} item={item} variant="icons" data-oid="n0g8yp6" />
        ));
      case 'full-width':
      case 'full-width-cta':
        return (
          <>
            {content.sections?.map((section, index) => (
              <Section key={index} section={section} data-oid="stz6w.t" />
            ))}
            {variant === 'full-width-cta' && content.cta && (
              <CTASection cta={content.cta} data-oid=":ynb3ty" />
            )}
          </>
        );
      default:
        return content.items?.map((item, index) => (
          <DropdownItem key={index} item={item} data-oid="6yoglkt" />
        ));
    }
  };
  return (
    <div className={dropdownClasses} data-oid="8ycattk">
      <div className={contentClasses} data-oid="9_1z-k6">
        {renderContent()}
      </div>
    </div>
  );
};
export default memo(MegaMenuDropdown);
