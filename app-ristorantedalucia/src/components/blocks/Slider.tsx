'use client'

import { Slider as S } from '../../../sanity.types';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image'
import { urlFor } from "@/sanity/lib/image";

// Import Swiper styles
import 'swiper/css/bundle';
import AOSComponent from '../AOS';

export default function Slider(params: {key: number, item: S}) {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const isTablet = useMediaQuery({ query: `(max-width: 1024px)` });
  const data: S = params?.item;
  const isFixed = (data as any).backgroundFixed ?? false;

  const bgStyle = data.backgroundImage ? {
    backgroundImage: `url(${urlFor(data.backgroundImage).width(1920).url()})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: isFixed ? 'fixed' : 'scroll',
  } : {};

  return (
    <AOSComponent>
      <div 
        className="slider-container relative overflow-hidden"
        style={bgStyle}
      >
        <div className="swiper-container backdrop-blur-sm clearfix relative z-10 py-12 md:py-20 bg-black/40">
          <h3 className="slider-title text-center family-playfair text-white" data-aos="flip-left">{data.heading}</h3>
          <div className="slider-description text-center px-2 py-2 md:py-4 text-white/80">{data.subtitle}</div>
          <Swiper
            // install Swiper modules
            modules={[A11y, Pagination, Navigation]}
            spaceBetween={isMobile ? 20 : (isTablet ? 40 : 30)}
            slidesPerView={isMobile ? 1.5 : (isTablet ? 3 : (data?.images?.length && data.images.length > 5 ? 3.5 : 2))}
            centerInsufficientSlides
            centeredSlides
            loop
            watchSlidesProgress={true}
            grabCursor={true}
            navigation={false}
            pagination={{ clickable: true }}
          >
            {data?.images?.map((item, index) => (
              <SwiperSlide key={index} itemID={`${index}`}>
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[600px]">
                  <Image 
                    src={urlFor(item).width(1200).url()} 
                    alt={item?.alt ?? `Slide #${index}`} 
                    fill
                    className="object-cover rounded-lg shadow-2xl"
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="clearfix"></div>
        </div>
      </div>
    </AOSComponent>
  );
};