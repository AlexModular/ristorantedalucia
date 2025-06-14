import { TextWithIllustration as T } from '../../../sanity.types';
import Image from "next/image";
import { getProportions, urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import React from "react";

export default function TextWithIllustration(params: {item: T}) {
  const { item } = params;
  const w = item.gridSize === 'grid-cols-3' ? 400 : 1000;
  let imageClasses = 'image-container px-5 lg:px-10 2xl:px-0 hidden md:block';
  let textClasses = 'px-5 md:px-10 pb-5 md:pb-0 ' + (item.imagePosition === 'right' ? 'xs:pl-0' : 'xs:pr-0');
  let gridClasses = 'grid grid-flow-row-dense grid-cols-1 md:grid-cols-2';
  switch(item.gridSize) {
    case 'grid-cols-3':
      gridClasses = 'grid grid-flow-row-dense grid-cols-1 md:grid-cols-3';
      if(item.imagePosition === 'right') {
        imageClasses = 'image-container px-5 pt-5 lg:px-10 sm:pt-0 hidden md:block';
        textClasses = 'md:col-span-2 px-5 sm:px-10 md:pb-0 xs:pl-0 pb-2';
      } else {
        imageClasses = 'image-container px-5 lg:px-10 2xl:px-0 hidden md:block';
        textClasses = 'md:col-span-2 px-5 sm:px-10 md:pb-0 xs:pr-0 pb-2';
      }
      break;
  }
  const sizes = item.image ? getProportions(item.image?.asset?._ref ?? '', w) : null;
  const img = item.image && sizes?.height ? urlFor(item.image).width(w).height(sizes.height).url() : null;
  const txtAosFx = item.imagePosition === 'left' ? 'fade-left' : 'fade-right';
  return (
    <section className="text-with-illustration box md:py-20 py-3">
      <div className={gridClasses}>
        {item.imagePosition === 'left' && (
          <div className={imageClasses} data-aos="fade-right">
            {img && <Image width={w} height={sizes?.height} alt={item.image?.alt ?? ''} src={img}/>}
          </div>
        )}
        <div className={textClasses} data-aos={txtAosFx}>
          <h3 className="family-oswald text-gold uppercase">{item.heading}</h3>
          {item.imagePosition === 'left' && (
            <div className="py-4 md:hidden" data-aos="fade-bottom">
              {img && <Image width={w} height={sizes?.height} alt={item.image?.alt ?? ''} src={img}/>}
            </div>
          )}
          <div className="text-justify">
            <PortableText value={item?.text || []} />
          </div>
          {item.imagePosition === 'right' && (
            <div className="py-4 md:hidden" data-aos="fade-top">
              {img && <Image width={w} height={sizes?.height} alt={item.image?.alt ?? ''} src={img}/>}
            </div>
          )}
        </div>
        {item.imagePosition === 'right' && (
          <div className={imageClasses} data-aos="fade-right">
            {img && <Image width={w} height={sizes?.height} alt={item.image?.alt ?? ''} src={img}/>}
          </div>
        )}
      </div>
    </section>
  )
}