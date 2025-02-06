/**
 * Individual carousel item component that handles slide transitions and animations
 * @component
 */
'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/app/utils/cn';
import { useCarousel } from './Carousel';

/**
 * @typedef {Object} CarouselItemProps
 * @property {string} [id] - Unique identifier for the carousel item
 * @property {number} [value] - The index of this item in the carousel (auto-calculated if not provided)
 * @property {string} [className] - Additional CSS classes
 * @property {React.ReactNode} children - Content of the carousel item
 */

export function CarouselItem({ id, value: providedValue, className, children }) {
  const { activeIndex, type } = useCarousel();
  const value = providedValue ?? parseInt(id?.split('-')[1]) - 1 ?? 0;
  const isActive = activeIndex === value;
  return (
    <div
      id={id}
      className={cn(
        'absolute inset-0 h-full w-full transition-all duration-700 ease-in-out',
        {
          'translate-x-full': type === 'slide' && activeIndex < value,
          '-translate-x-full': type === 'slide' && activeIndex > value,
          'translate-x-0': type === 'slide' && isActive,
          'opacity-0': type === 'static' && !isActive,
          'opacity-100': type === 'static' && isActive,
        },
        className
      )}
      data-carousel-item={isActive ? 'active' : ''}
      aria-hidden={!isActive}
      data-oid="cv1pcsw"
    >
      {React.isValidElement(children) && children.type === 'img' ? (
        <div className="relative h-full w-full" data-oid="ve39oqg">
          {React.cloneElement(children, {
            className: cn('absolute inset-0 w-full h-full object-cover', children.props.className),
          })}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
CarouselItem.propTypes = {
  id: PropTypes.string,
  value: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
