/**
 * CarouselIndicators Component
 *
 * A component that displays navigation dots/indicators for the carousel slides.
 * Each dot represents a slide and shows the current active position.
 *
 * Features:
 * - Interactive dots that allow direct navigation to any slide
 * - Visual indication of current active slide
 * - Hover effects for better user interaction
 * - Dark mode support
 * - Fully accessible with ARIA labels
 * - RTL language support
 * - Customizable styling through className props
 *
 * @component
 * @example
 * // Basic usage in Carousel
 * <Carousel>
 *   <CarouselIndicators
 *     className="custom-indicators"
 *     activeClassName="bg-blue-500"
 *     inactiveClassName="bg-gray-300"
 *   />
 * </Carousel>
 */
'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/app/utils/cn';
import { useCarousel } from './Carousel';

/**
 * Props for the CarouselIndicators component
 * @typedef {Object} CarouselIndicatorsProps
 * @property {string} [className] - Optional CSS classes to style the indicators container
 * @property {string} [activeClassName] - CSS classes applied to the currently active indicator dot
 * @property {string} [inactiveClassName] - CSS classes applied to inactive indicator dots
 */

export function CarouselIndicators({
  className,
  // Default styles for active indicator - solid background
  activeClassName = 'bg-white dark:bg-gray-800',
  // Default styles for inactive indicators - semi-transparent with hover effect
  inactiveClassName = 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
}) {
  // Get carousel context values for navigation
  const { activeIndex, setActiveIndex, itemsCount } = useCarousel();
  return (
    <div
      className={cn(
        // Position indicators at bottom center of carousel
        'absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse',
        'bottom-5 left-1/2',
        className
      )}
      data-oid="d.770t."
    >
      {/* Generate indicator dots based on number of slides */}
      {Array.from({
        length: itemsCount,
      }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            // Base styles for indicator dots
            'h-3 w-3 rounded-full transition-colors',
            // Apply active/inactive styles based on current index
            index === activeIndex ? activeClassName : inactiveClassName
          )}
          aria-current={index === activeIndex}
          aria-label={`Navigate to slide ${index + 1}`}
          onClick={() => setActiveIndex(index)}
          data-carousel-slide-to={index}
          data-oid="dqv5en4"
        />
      ))}
    </div>
  );
}
CarouselIndicators.propTypes = {
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  inactiveClassName: PropTypes.string,
};
