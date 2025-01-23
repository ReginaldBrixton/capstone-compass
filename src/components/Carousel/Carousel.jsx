/**
 * A responsive and accessible carousel component
 * @component
 */
'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { cn } from '@/app/utils/cn';
import { CarouselControls } from './CarouselControls';
import { CarouselIndicators } from './CarouselIndicators';

export const CarouselContext = createContext(null);

/**
 * @typedef {Object} CarouselProps
 * @property {Array<{src?: string, alt?: string, content?: React.ReactNode}>} [items] - Array of items to display
 * @property {'static' | 'slide'} [type='slide'] - The type of carousel
 * @property {number} [interval=5000] - Auto-slide interval in milliseconds
 * @property {boolean} [showIndicators=true] - Show slide indicators
 * @property {boolean} [showControls=true] - Show next/prev controls
 * @property {boolean} [autoPlay=false] - Enable auto-sliding
 * @property {string} [className] - Additional CSS classes
 * @property {(index: number) => void} [onSlideChange] - Callback when slide changes
 * @property {React.ReactNode} [children] - Optional custom content using CarouselItem components
 */

export function Carousel({
  items = [],
  type = 'slide',
  interval = 5000,
  showIndicators = true,
  showControls = true,
  autoPlay = false,
  className,
  onSlideChange,
  children,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);

  const itemsCount = children ? React.Children.count(children) : items.length;

  // Handle slide change with transition
  const goToSlide = useCallback(
    (index) => {
      setActiveIndex(index);
      onSlideChange?.(index);
    },
    [onSlideChange]
  );

  // Handle next slide
  const nextSlide = useCallback(() => {
    goToSlide((activeIndex + 1) % itemsCount);
  }, [activeIndex, itemsCount, goToSlide]);

  // Handle previous slide
  const prevSlide = useCallback(() => {
    goToSlide((activeIndex - 1 + itemsCount) % itemsCount);
  }, [activeIndex, itemsCount, goToSlide]);

  // Auto-play effect
  useEffect(() => {
    let timer;
    if (isPlaying && !isPaused && itemsCount > 1) {
      timer = setInterval(nextSlide, interval);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isPaused, interval, itemsCount, nextSlide]);

  // Update isPlaying when autoPlay prop changes
  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  // Handle mouse events for auto-play pause
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Handle both items prop and children
  const content =
    children ||
    items.map((item, index) => (
      <div
        key={index}
        className={cn(
          'absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out',
          {
            'translate-x-full': type === 'slide' && activeIndex < index,
            '-translate-x-full': type === 'slide' && activeIndex > index,
            'translate-x-0': type === 'slide' && activeIndex === index,
            'opacity-0 pointer-events-none': type === 'static' && activeIndex !== index,
            'opacity-100': type === 'static' && activeIndex === index,
          }
        )}
        data-carousel-item={activeIndex === index ? 'active' : ''}
        aria-hidden={activeIndex !== index}
      >
        {item.content ? (
          item.content
        ) : (
          <div className="relative w-full h-full">
            <img
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    ));

  const contextValue = {
    activeIndex,
    setActiveIndex: goToSlide,
    isPlaying,
    setIsPlaying,
    itemsCount,
    type,
    onSlideChange,
    nextSlide,
    prevSlide,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        className={cn('relative w-full', className)}
        data-carousel={type}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {/* Carousel wrapper */}
          <div className="relative h-full overflow-hidden">{content}</div>
        </div>

        {showControls && itemsCount > 1 && <CarouselControls />}
        {showIndicators && itemsCount > 1 && <CarouselIndicators />}
      </div>
    </CarouselContext.Provider>
  );
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      content: PropTypes.node,
    })
  ),
  type: PropTypes.oneOf(['static', 'slide']),
  interval: PropTypes.number,
  showIndicators: PropTypes.bool,
  showControls: PropTypes.bool,
  autoPlay: PropTypes.bool,
  className: PropTypes.string,
  onSlideChange: PropTypes.func,
  children: PropTypes.node,
};

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel component');
  }
  return context;
};
