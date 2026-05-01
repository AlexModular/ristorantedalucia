'use client'

import { SlideshowForPageMaker } from '../../../sanity.types.custom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination, Navigation, Autoplay, EffectCreative, EffectFade } from 'swiper/modules';
import Image from 'next/image'
import { urlFor } from "@/sanity/lib/image";

// Import Swiper styles
import 'swiper/css/bundle';
import 'swiper/css/effect-fade';
import AOSComponent from '../AOS';
import Link from 'next/link';

export default function Slideshow(params: {key: number, item: SlideshowForPageMaker}) {
  const data: SlideshowForPageMaker = params?.item;
  const effect = data?.effect || 'fade';

  return (
    <AOSComponent>
      <div className="slideshow-container transparent-header-trigger">
        <div className="swiper-container backdrop-blur-sm clearfix">
          <Swiper
            // install Swiper modules
            modules={[A11y, Pagination, Navigation, EffectCreative, Autoplay, EffectFade]}
            slidesPerView={1}
            centerInsufficientSlides={true}
            centeredSlides={true}
            loop
            loopAddBlankSlides
            grabCursor={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect={effect}
            fadeEffect={{
              crossFade: true
            }}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ["-20%", 0, -1],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            navigation={false}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={(e) => console.log('slideshow change',e)}
          >
            {data?.images?.map((item, index) => (
              <SwiperSlide key={index} itemID={`${index}`} className="relative">
                <Image 
                  src={urlFor(item).width(2560).url()} 
                  alt={item?.alt ?? `Slide #${index}`} 
                  fill 
                  className="object-cover" 
                  priority={index === 0}
                />
                <div className='slide-contents grid h-48 grid-cols-1 place-content-center gap-4 text-center p-30' data-aos='fade' data-aos-duration='1000'>
                  {item?.heading && (<div className='family-dancing-script slide-title text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-gold italic'>{item.heading}</div>)}
                  <div className='slide-content-items'>
                    {item?.subtitle && (<div className='family-oswald slide-subtitle text-lg sm:text-2xl md:text-4xl lg:text-5xl uppercase pb-4 md:pb-12'>{item.subtitle}</div>)}
                    {((item?.link?.slug != null && item?.link?.slug != '') || (item?.externalUrl != null && item?.externalUrl != '')) && (
                      <div className='cta'>
                        <Link
                          href={item.externalUrl ? item.externalUrl : (item.link?.slug || '#')}
                          target={item.externalUrl ? '__blank' : ''}
                          className='family-oswald cta-btn bg-gold transition-all hover:text-gold hover:bg-background p-2 md:p-4 text-md md:text-2xl lg:text-4xl uppercase'
                        >{item.ctaText || 'Scopri di più'} {item.externalUrl} {item.link?.slug}</Link>
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