import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AccordionContext } from './Accordion';

/**
 * Trigger component for accordion items that handles expanding/collapsing
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Trigger content
 * @param {string} props.value - Value of the parent accordion item
 * @param {boolean} props.isOpen - Whether the accordion item is open
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.icon - Optional icon to display
 */
const AccordionTrigger = ({ children, value, isOpen, className = '', icon }) => {
  const { toggleItem, variant } = useContext(AccordionContext);
  const baseClasses =
    'flex items-center justify-between w-full p-4 text-left transition-all duration-200';
  const textClasses = 'text-sm font-medium text-gray-700 dark:text-gray-200';
  const variantClasses =
    variant === 'colored'
      ? `${isOpen ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300' : 'hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:text-blue-600 dark:hover:text-blue-300'} active:bg-blue-100 dark:active:bg-blue-900/30`
      : `${isOpen ? 'bg-gray-50 dark:bg-gray-800/50' : 'hover:bg-gray-50/50 dark:hover:bg-gray-800/25'} active:bg-gray-100 dark:active:bg-gray-800/75`;
  const focusClasses =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 focus-visible:ring-blue-500/50 dark:focus-visible:ring-blue-400/50';
  const triggerClasses = `${baseClasses} ${textClasses} ${variantClasses} ${focusClasses} ${className}`;
  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      className={triggerClasses}
      aria-expanded={isOpen}
      data-oid="wsno88k"
    >
      <div className="flex items-center gap-3" data-oid="roeubfr">
        {icon && (
          <span
            className={`flex-shrink-0 transition-colors duration-200 ${isOpen ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}
            data-oid="e0ib9se"
          >
            {icon}
          </span>
        )}
        <span data-oid="pgfbgti">{children}</span>
      </div>
      <svg
        className={`h-4 w-4 text-gray-400 transition-transform duration-200 dark:text-gray-500 ${isOpen ? 'rotate-180 text-blue-500 dark:text-blue-400' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        data-oid="tn:i3k_"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" data-oid="-z8cbvr" />
      </svg>
    </button>
  );
};
AccordionTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
};
export default AccordionTrigger;
