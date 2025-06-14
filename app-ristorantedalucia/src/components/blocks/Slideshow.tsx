'use client'

import { SlideshowForPageMaker } from '../../../sanity.types.custom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination, Navigation, Autoplay, EffectCreative } from 'swiper/modules';
import Image from 'next/image'
import { urlFor } from "@/sanity/lib/image";

// Import Swiper styles
import 'swiper/css/bundle';
import AOSComponent from '../AOS';
import Link from 'next/link';

export default function Slideshow(params: {key: number, item: SlideshowForPageMaker}) {
  const data: SlideshowForPageMaker = params?.item;
  return (
    <AOSComponent>
      <div className="slideshow-container">
        <div className="swiper-container backdrop-blur-sm clearfix">
          <Swiper
            // install Swiper modules
            modules={[A11y, Pagination, Navigation, EffectCreative, Autoplay]}
            slidesPerView={1}
            centerInsufficientSlides={true}
            centeredSlides={true}
            loop
            loopAddBlankSlides
            grabCursor={true}
            autoplay={{
              delay: 5000,
            }}
            effect='creative'
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ["-20%", 0, -1],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            navigation={true}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={(e) => console.log('slideshow change',e)}
          >
            {data?.images?.map((item, index) => (
              <SwiperSlide key={index} itemID={`${index}`}>
                <Image src={urlFor(item).width(2560).url()} alt={item?.alt ?? `Slide #${index}`} width={0} height={0} sizes="100vw 100vw" style={{ width: '100%', height: 'auto' }} />
                <div className='slide-contents grid h-48 grid-cols-1 place-content-center gap-4 text-center p-30' data-aos={'zoom-in'}>
                  {item?.heading && (<div className='family-matura-sc slide-title text-3xl sm:text-4xl md:text-5xl lg:text-9xl text-gold'>{item.heading}</div>)}
                  <div className='slide-content-items'>
                    {item?.subtitle && (<div className='family-oswald slide-subtitle text-lg sm:text-2xl md:text-4xl lg:text-5xl uppercase pb-4 md:pb-12'>{item.subtitle}</div>)}
                    {(item?.link?.slug !== null || item?.externalUrl !== null) && (
                      <div className='cta'>
                        <Link
                          href={item.externalUrl ? item.externalUrl : (item.link?.slug || '#')}
                          target={item.link?.slug ? '__blank' : ''}
                          className='family-oswald cta-btn bg-gold transition-all hover:text-gold hover:bg-background p-2 md:p-4 text-md md:text-2xl lg:text-4xl uppercase'
                        >{item.ctaText || 'Scopri di più'}</Link>
                      </div>
                    )}
                  </div>
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