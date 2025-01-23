/**
 * Demo component showcasing different Carousel implementations
 * @component
 */
'use client';

import React from 'react';

import { Carousel, CarouselItem } from './';

const BasicCarousel = () => {
  return (
    <div className="carousel-basic">
      <h3 className="mb-2 text-xl font-semibold">Basic Image Carousel</h3>
      <Carousel interval={5000} type="static">
        <CarouselItem id="basic-1">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="First slide"
          />
        </CarouselItem>
        <CarouselItem id="basic-2">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="Second slide"
          />
        </CarouselItem>
        <CarouselItem id="basic-3">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="Third slide"
          />
        </CarouselItem>
      </Carousel>
    </div>
  );
};

const AutoPlayCarousel = () => {
  return (
    <div className="carousel-autoplay">
      <h3 className="mb-2 text-xl font-semibold">Auto-playing Carousel</h3>
      <Carousel
        interval={3000}
        autoPlay
        className="bg-gray-50 dark:bg-gray-900"
      >
        <CarouselItem id="auto-1">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="First slide"
          />
        </CarouselItem>
        <CarouselItem id="auto-2">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="Second slide"
          />
        </CarouselItem>
        <CarouselItem id="auto-3">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="Third slide"
          />
        </CarouselItem>
      </Carousel>
    </div>
  );
};

const CustomContentCarousel = () => {
  return (
    <div className="carousel-custom">
      <h3 className="mb-2 text-xl font-semibold">Custom Content Carousel</h3>
      <Carousel interval={5000} type="slide">
        <CarouselItem id="custom-1">
          <div className="flex h-full items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
            <div className="p-8 text-center">
              <h4 className="mb-4 text-2xl font-bold">Custom Slide 1</h4>
              <p className="text-gray-600 dark:text-gray-300">
                This is a custom content slide with any React components.
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem id="custom-2">
          <div className="flex h-full items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-800">
            <div className="p-8 text-center">
              <h4 className="mb-4 text-2xl font-bold">Custom Slide 2</h4>
              <p className="text-gray-600 dark:text-gray-300">
                You can put any React component here.
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem id="custom-3">
          <div className="flex h-full items-center justify-center rounded-lg bg-green-100 dark:bg-green-800">
            <div className="p-8 text-center">
              <h4 className="mb-4 text-2xl font-bold">Custom Slide 3</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Fully customizable content area.
              </p>
            </div>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  );
};

const MinimalCarousel = () => {
  return (
    <div className="carousel-minimal">
      <h3 className="mb-2 text-xl font-semibold">Minimal Carousel</h3>
      <Carousel showIndicators={false} className="rounded-xl shadow-lg">
        <CarouselItem id="minimal-1">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="First slide"
          />
        </CarouselItem>
        <CarouselItem id="minimal-2">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="Second slide"
          />
        </CarouselItem>
        <CarouselItem id="minimal-3">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="Third slide"
          />
        </CarouselItem>
      </Carousel>
    </div>
  );
};

export function CarouselDemo() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-4">
      <h2 className="mb-4 text-2xl font-bold">Carousel Examples</h2>
      <BasicCarousel />
      <AutoPlayCarousel />
      <CustomContentCarousel />
      <MinimalCarousel />
    </div>
  );
}
