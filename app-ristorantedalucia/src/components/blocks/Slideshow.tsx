'use client'

import { TransformedSlideshow } from '../../../sanity.types.custom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination, Navigation, Autoplay, EffectCreative, EffectFade } from 'swiper/modules';
import Image from 'next/image'
import { urlFor } from "@/sanity/lib/image";

// Import Swiper styles
import 'swiper/css/bundle';
import 'swiper/css/effect-fade';
import AOSComponent from '../AOS';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Slideshow(params: { key: number, item: TransformedSlideshow }) {
  const t = useTranslations('Navigation');
  const data: TransformedSlideshow = params?.item;
  const slidesWithContent = data?.images?.filter(img => img.heading || img.subtitle || (img.ctaText && (img.externalUrl || img.link?.slug))) || [];
  const useGlobalContent = slidesWithContent.length === 1;
  const globalContent = useGlobalContent ? slidesWithContent[0] : null;
  const effect = data?.effect || 'fade';

  const renderContent = (item: NonNullable<TransformedSlideshow['images']>[number]) => (
    <div className='slide-contents absolute inset-0 z-10' data-aos='fade' data-aos-duration='1000'>
      {item?.heading && (<div className='family-dancing-script slide-title text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white'>{item.heading}</div>)}
      <div className='slide-content-items'>
        {item?.subtitle && (<div className='family-playfair slide-subtitle text-lg sm:text-2xl md:text-4xl lg:text-5xl uppercase pb-4 md:pb-12 text-white'>{item.subtitle}</div>)}
        {((item?.link?.slug != null && item?.link?.slug != '') || (item?.externalUrl != null && item?.externalUrl != '')) && (
          <div className='cta'>
            <Link
              href={item.externalUrl ? item.externalUrl : (item.link?.slug || '#')}
              target={item.externalUrl ? '__blank' : ''}
              className='family-oswald cta-btn bg-gold text-white transition-all hover:text-gold hover:bg-background p-2 md:p-4 text-md md:text-2xl lg:text-4xl uppercase'
            >{item.ctaText || t('readMore')}</Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <AOSComponent>
      <div className="slideshow-container transparent-header-trigger relative" data-header-theme="dark">
        <div className="swiper-container backdrop-blur-sm clearfix">
          <Swiper
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
                {!useGlobalContent && renderContent(item)}
              </SwiperSlide>
            ))}
          </Swiper>
          {useGlobalContent && globalContent && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="h-full w-full pointer-events-auto">
                {renderContent(globalContent)}
              </div>
            </div>
          )}
          <div className="clearfix"></div>
        </div>
      </div>
    </AOSComponent>
  );
};