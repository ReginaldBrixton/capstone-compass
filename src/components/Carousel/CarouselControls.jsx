/**
 * Navigation controls for the carousel
 * @component
 */
'use client';

import React from 'react';
import PropTypes from 'prop-types';

import { cn } from '@/app/utils/cn';
import { useCarousel } from './Carousel';

/**
 * @typedef {Object} CarouselControlsProps
 * @property {string} [className] - Additional CSS classes for the controls wrapper
 * @property {React.ReactNode} [prevIcon] - Custom previous button icon
 * @property {React.ReactNode} [nextIcon] - Custom next button icon
 */

export function CarouselControls({
  className,
  prevIcon = (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 1 1 5l4 4"
      />
    </svg>
  ),
  nextIcon = (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 9 4-4-4-4"
      />
    </svg>
  ),
}) {
  const { prevSlide, nextSlide } = useCarousel();

  const buttonClasses = cn(
    'absolute top-0 z-30 flex h-full items-center justify-center px-4',
    'cursor-pointer group focus:outline-none'
  );

  const iconWrapperClasses = cn(
    'inline-flex h-10 w-10 items-center justify-center rounded-full',
    'bg-white/30 group-hover:bg-white/50 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60',
    'group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70',
    'transition-all duration-300 ease-in-out'
  );

  return (
    <div className={cn('absolute inset-0', className)}>
      <button
        type="button"
        className={cn(buttonClasses, 'start-0')}
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <span className={iconWrapperClasses}>{prevIcon}</span>
      </button>
      <button
        type="button"
        className={cn(buttonClasses, 'end-0')}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <span className={iconWrapperClasses}>{nextIcon}</span>
      </button>
    </div>
  );
}

CarouselControls.propTypes = {
  className: PropTypes.string,
  prevIcon: PropTypes.node,
  nextIcon: PropTypes.node,
};
