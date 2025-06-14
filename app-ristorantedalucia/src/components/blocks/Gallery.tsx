'use client'

import React, { useEffect } from 'react';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import fjGallery from 'flickr-justified-gallery';
import { urlFor } from "@/sanity/lib/image";
import Image from 'next/image';
import { v4 } from "uuid";

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import { Gallery as G } from '../../../sanity.types';
import AOSComponent from '../AOS';
import { useMediaQuery } from 'react-responsive';

export const licenseKey = process.env.LIGHTGALLERY_LICENSE_KEY;

export default function Gallery({item}: {item: G}) {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const isTablet = useMediaQuery({ query: `(max-width: 1024px)` });
  useEffect(() => {
    fjGallery(document.querySelectorAll('.gallery'), {
      itemSelector: '.gallery__item',
      rowHeight: isMobile ? 240 : (isTablet ? 360 : 480),
      lastRow: 'start',
      gutter: 2,
      rowHeightTolerance: 0.1,
      calculateItemsHeight: true,
    });
  }, [isMobile, isTablet]);

  const newLocal = 'gallery-' + v4();
  return (
    <AOSComponent>
      <div className="slider-container" data-aos="fade-up">
        <h3 className="slider-title text-center family-matura-sc text-gold">{item.heading}</h3>
        <div className="slider-description text-center px-2 py-4 pb-8">{item.subtitle}</div>
        <LightGallery
          plugins={[lgZoom]}
          licenseKey={licenseKey}
          mode="lg-fade"
          pager={false}
          thumbnail={true}
          galleryId={newLocal}
          elementClassNames={'gallery'}
          mobileSettings={{
            controls: false,
            showCloseIcon: false,
            download: false,
            rotate: false,
          }}
          download={false}
          zoom={false}
          counter={false}
          >
          {item.images && item.images.map((image, index) => (
            <a className="gallery__item" key={index} href={urlFor(image).width(1920).url()}>
              <Image className="img-responsive" width={0} height={0} src={urlFor(image).width(1920).url()} sizes="100vw 100vw" style={{ width: '100%', height: 'auto' }} alt={image.alt || `Image #${index}`} />
            </a>
          ))}
        </LightGallery>
        <div className='clearfix'></div>
      </div>
    </AOSComponent>
  )
}