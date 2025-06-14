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
          <h3 className="slider-title text-center family-matura-sc text-gold" data-aos="flip-left">{data.heading}</h3>
          <div className="slider-description text-center px-2 py-4">{data.subtitle}</div>
          <Swiper
            // install Swiper modules
            modules={[A11y, Pagination, Navigation]}
            spaceBetween={isMobile ? 20 : 50}
            slidesPerView={isMobile ? 1.5 : (isTablet ? 3 : 4)}
            centerInsufficientSlides
            centeredSlides
            loop
            loopAddBlankSlides
            navigation={true}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {data?.images?.map((item, index) => (
              <SwiperSlide key={index} itemID={`${index}`}>
                <Image src={urlFor(item).width(800).url()} alt={item?.alt ?? `Slide #${index}`} width={0} height={0} sizes="100vw 100vw" style={{ width: '100%', height: 'auto' }} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="clearfix"></div>
        </div>
      </div>
    </AOSComponent>
  );
};