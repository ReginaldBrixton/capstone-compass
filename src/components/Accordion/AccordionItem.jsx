import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AccordionContext } from './Accordion';

/**
 * Individual accordion item component that contains a trigger and content
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Trigger and content components
 * @param {string} props.value - Unique identifier for the accordion item
 * @param {string} props.className - Additional CSS classes
 */
const AccordionItem = ({ children, value, className = '' }) => {
  const { openItems, variant, flush } = useContext(AccordionContext);
  const isOpen = openItems.has(value);
  const baseClasses = 'transition-colors duration-200';
  const borderClasses = flush
    ? 'border-b last:border-b-0'
    : 'first:rounded-t-lg last:rounded-b-lg border-b last:border-b-0';
  const variantClasses =
    variant === 'colored'
      ? 'border-blue-100 dark:border-blue-900/30'
      : 'border-gray-200 dark:border-gray-700/50';
  const containerClasses = `${baseClasses} ${borderClasses} ${variantClasses} ${className}`;
  return (
    <div className={containerClasses} data-state={isOpen ? 'open' : 'closed'} data-oid="g5rgzg:">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          value,
          isOpen,
        })
      )}
    </div>
  );
};
AccordionItem.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default AccordionItem;
