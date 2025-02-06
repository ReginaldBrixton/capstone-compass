import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Content component for accordion items that shows/hides based on trigger state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display
 * @param {boolean} props.isOpen - Whether the content should be visible
 * @param {string} props.className - Additional CSS classes
 */
const AccordionContent = ({ children, isOpen, className = '' }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(isOpen ? contentHeight : 0);
    }
  }, [isOpen, children]);
  const baseClasses = 'overflow-hidden transition-all duration-200 ease-out';
  const contentClasses = `${baseClasses} ${className}`;
  return (
    <div
      ref={contentRef}
      className={contentClasses}
      data-state={isOpen ? 'open' : 'closed'}
      style={{
        height,
        opacity: isOpen ? 1 : 0,
        transform: `translateY(${isOpen ? 0 : -4}px)`,
      }}
      data-oid="93huno8"
    >
      <div
        className="p-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
        data-oid="cyygpba"
      >
        {children}
      </div>
    </div>
  );
};
AccordionContent.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
};
export default AccordionContent;
