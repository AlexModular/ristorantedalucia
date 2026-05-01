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
  let style = {}, backgroundImageUrl = null;
  if(data?.backgroundImage) {
    backgroundImageUrl = urlFor(data.backgroundImage).width(1920).url();
    style = {backgroundImage: `url(${backgroundImageUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: '100vw', backgroundPosition: 'center'};
  }
  return (
    <AOSComponent>
      <div className="slider-container" style={style}>
        <div className="swiper-container backdrop-blur-sm clearfix">
          <h3 className="slider-title text-center family-oswald text-gold uppercase" data-aos="flip-left">{data.heading}</h3>
          <div className="slider-description text-center px-2 py-2 md:py-4">{data.subtitle}</div>
          <Swiper
            // install Swiper modules
            modules={[A11y, Pagination, Navigation]}
            spaceBetween={isMobile ? 20 : (isTablet ? 60 : 120)}
            slidesPerView={isMobile ? 1.5 : (isTablet ? 3 : 2)}
            centerInsufficientSlides
            centeredSlides
            loop
            watchSlidesProgress={true}
            grabCursor={true}
            navigation={false}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {data?.images?.map((item, index) => (
              <SwiperSlide key={index} itemID={`${index}`}>
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
                  <Image 
                    src={urlFor(item).width(1000).height(750).fit('crop').url()} 
                    alt={item?.alt ?? `Slide #${index}`} 
                    fill
                    className="object-cover"
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