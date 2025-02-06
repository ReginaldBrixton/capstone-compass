/**
 * Demo component showcasing different Carousel implementations
 * @component
 */
'use client';

import React from 'react';
import { Carousel, CarouselItem } from './';
const BasicCarousel = () => {
  return (
    <div className="carousel-basic" data-oid="h1:d3hu">
      <h3 className="mb-2 text-xl font-semibold" data-oid="oe.kekf">
        Basic Image Carousel
      </h3>
      <Carousel interval={5000} type="static" data-oid="4:z76hx">
        <CarouselItem id="basic-1" data-oid="vzo-yog">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="First slide"
            data-oid="gp1hakz"
          />
        </CarouselItem>
        <CarouselItem id="basic-2" data-oid="l9tzq88">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="Second slide"
            data-oid="4vtzgyx"
          />
        </CarouselItem>
        <CarouselItem id="basic-3" data-oid="zqr:ncl">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="Third slide"
            data-oid="c4x6cnp"
          />
        </CarouselItem>
      </Carousel>
    </div>
  );
};
const AutoPlayCarousel = () => {
  return (
    <div className="carousel-autoplay" data-oid="x738wni">
      <h3 className="mb-2 text-xl font-semibold" data-oid="oh-59nk">
        Auto-playing Carousel
      </h3>
      <Carousel interval={3000} autoPlay className="bg-gray-50 dark:bg-gray-900" data-oid="i_ita7a">
        <CarouselItem id="auto-1" data-oid="yru6-p9">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="First slide"
            data-oid="dvumbo1"
          />
        </CarouselItem>
        <CarouselItem id="auto-2" data-oid="jz.0esz">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="Second slide"
            data-oid="f:np498"
          />
        </CarouselItem>
        <CarouselItem id="auto-3" data-oid="u0.6_5u">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="Third slide"
            data-oid="nrv-t4t"
          />
        </CarouselItem>
      </Carousel>
    </div>
  );
};
const CustomContentCarousel = () => {
  return (
    <div className="carousel-custom" data-oid="_.653i_">
      <h3 className="mb-2 text-xl font-semibold" data-oid="_7qe1pv">
        Custom Content Carousel
      </h3>
      <Carousel interval={5000} type="slide" data-oid="ca2h9b7">
        <CarouselItem id="custom-1" data-oid="fr_goi6">
          <div
            className="flex h-full items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"
            data-oid="ily166_"
          >
            <div className="p-8 text-center" data-oid="-1ikqic">
              <h4 className="mb-4 text-2xl font-bold" data-oid="jwb6w_g">
                Custom Slide 1
              </h4>
              <p className="text-gray-600 dark:text-gray-300" data-oid="l3mtzxh">
                This is a custom content slide with any React components.
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem id="custom-2" data-oid="g78-52t">
          <div
            className="flex h-full items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-800"
            data-oid="szotrg3"
          >
            <div className="p-8 text-center" data-oid="gm1so2f">
              <h4 className="mb-4 text-2xl font-bold" data-oid="79i.m63">
                Custom Slide 2
              </h4>
              <p className="text-gray-600 dark:text-gray-300" data-oid="lpa9hq9">
                You can put any React component here.
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem id="custom-3" data-oid=".iv2s4.">
          <div
            className="flex h-full items-center justify-center rounded-lg bg-green-100 dark:bg-green-800"
            data-oid="-p4rmds"
          >
            <div className="p-8 text-center" data-oid="t1xcpl8">
              <h4 className="mb-4 text-2xl font-bold" data-oid="v-10fsp">
                Custom Slide 3
              </h4>
              <p className="text-gray-600 dark:text-gray-300" data-oid="wnkjayj">
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
    <div className="carousel-minimal" data-oid="6mh1zks">
      <h3 className="mb-2 text-xl font-semibold" data-oid="k1tfuj4">
        Minimal Carousel
      </h3>
      <Carousel showIndicators={false} className="rounded-xl shadow-lg" data-oid="5j3yug5">
        <CarouselItem id="minimal-1" data-oid="--4jw1s">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="First slide"
            data-oid="rqdx0h0"
          />
        </CarouselItem>
        <CarouselItem id="minimal-2" data-oid="0uk3jr5">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="Second slide"
            data-oid="yccbgqx"
          />
        </CarouselItem>
        <CarouselItem id="minimal-3" data-oid="g3opvc_">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="Third slide"
            data-oid="hd-j-po"
          />
        </CarouselItem>
      </Carousel>
    </div>
  );
};
export function CarouselDemo() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-4" data-oid=":c86n7k">
      <h2 className="mb-4 text-2xl font-bold" data-oid="n9scuys">
        Carousel Examples
      </h2>
      <BasicCarousel data-oid="igdam3m" />
      <AutoPlayCarousel data-oid="t4m_94r" />
      <CustomContentCarousel data-oid="8y0q6ul" />
      <MinimalCarousel data-oid="h5n2kdc" />
    </div>
  );
}
