import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Context for managing accordion state
 * @private
 */
export const AccordionContext = createContext({});

/**
 * Main Accordion component that manages the state and behavior of accordion items
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Accordion items
 * @param {'single' | 'multiple'} props.type - Type of accordion (single item or multiple items can be open)
 * @param {boolean} props.collapsible - Whether the accordion items can all be closed
 * @param {boolean} props.flush - Remove borders and rounded corners
 * @param {'default' | 'colored'} props.variant - Visual style variant
 * @param {string} props.className - Additional CSS classes
 */
const Accordion = ({
  children,
  type = 'single',
  collapsible = false,
  flush = false,
  variant = 'default',
  className = '',
}) => {
  const [openItems, setOpenItems] = useState(new Set());
  const toggleItem = (value) => {
    setOpenItems((prev) => {
      const newItems = new Set(prev);
      if (type === 'single') {
        if (newItems.has(value)) {
          // If collapsible is true, we can close the item
          if (collapsible) {
            newItems.delete(value);
          }
        } else {
          // Clear other items and add the new one
          newItems.clear();
          newItems.add(value);
        }
      } else {
        // For multiple type, simply toggle the item
        if (newItems.has(value)) {
          newItems.delete(value);
        } else {
          newItems.add(value);
        }
      }
      return newItems;
    });
  };
  const baseClasses = 'transition-all duration-300 ease-in-out';
  const borderClasses = flush
    ? ''
    : 'rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md';
  const containerClasses = `${baseClasses} ${borderClasses} ${className}`;
  return (
    <AccordionContext.Provider
      value={{
        openItems,
        toggleItem,
        variant,
        flush,
      }}
      data-oid="ivt67sf"
    >
      <div
        className={containerClasses}
        data-accordion={type}
        role="tablist"
        aria-multiselectable={type === 'multiple'}
        data-oid="ni.a3ve"
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};
Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['single', 'multiple']),
  collapsible: PropTypes.bool,
  flush: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'colored']),
  className: PropTypes.string,
};
export default Accordion;
