'use client'

import { TransformedGallery } from "../../../sanity.types.custom";
import { urlFor } from "@/sanity/lib/image";
import AOSComponent from "../AOS";
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { useEffect, useRef } from "react";
import Image from "next/image";

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

export default function Gallery({item}: {item: TransformedGallery}) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (galleryRef.current) {
        lightGallery(galleryRef.current, {
            plugins: [lgThumbnail, lgZoom],
            speed: 500,
            selector: '.gallery-item',
        });
    }
  }, []);

  return (
    <AOSComponent>
      <div className="gallery-container py-10 md:py-20 box" data-aos="fade-up">
        {item.heading && (<h2 className="family-playfair text-center mb-4">{item.heading}</h2>)}
        {item.subtitle && (<div className="family-oswald text-center text-gold uppercase tracking-widest mb-12">{item.subtitle}</div>)}
        
        <div 
          ref={galleryRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4"
        >
          {item.images?.map((image, index) => (
            <div 
              key={index}
              className="gallery-item cursor-pointer relative overflow-hidden rounded-lg shadow-lg aspect-square group"
              data-src={urlFor(image).width(1600).url()}
              data-sub-html={`<h4>${item.heading || ''}</h4>`}
            >
              <Image 
                src={urlFor(image).width(400).height(400).url()} 
                width={400}
                height={400}
                alt={image.alt || `Gallery Image ${index} - ${item.heading}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </AOSComponent>
  )
}