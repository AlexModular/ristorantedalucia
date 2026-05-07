import { TransformedTextWithIllustration } from '../../../sanity.types.custom';
import { getProportions, urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import React from "react";
import { components } from "../PortableTextComponents";
import Image from "next/image";

export default function TextWithIllustration({item}: {item: TransformedTextWithIllustration}) {
  const hasBg = !!item.backgroundImage;
  const showOverlay = item.hasOverlay ?? true;
  const overlayColor = item.overlayColor ?? 'dark';
  const isFixed = item.backgroundFixed ?? false;

  // Use larger width for top/bottom or full-width layouts
  const w = (item.imagePosition === 'top' || item.imagePosition === 'bottom') ? 1200 : (item.gridSize === 'grid-cols-3' ? 400 : 1000);
  
  let imageClasses = 'image-container px-5 lg:px-10 2xl:px-0 hidden md:block';
  let textClasses = 'px-5 md:px-10 pb-5 md:pb-0';
  let gridClasses = 'grid grid-flow-row-dense items-center';

  // Base layout logic
  if (item.imagePosition === 'top' || item.imagePosition === 'bottom') {
    gridClasses = 'flex flex-col gap-10 items-center max-w-6xl mx-auto text-center';
    textClasses = 'w-full px-5';
    imageClasses = 'image-container w-full px-5 hidden md:block';
  } else {
    // Left/Right layouts
    gridClasses += ' grid-cols-1 md:grid-cols-2';
    
    // Spacing adjustment
    if (item.imagePosition === 'right') {
      textClasses += ' md:pl-0';
    } else {
      textClasses += ' md:pr-0';
    }

    if (item.gridSize === 'grid-cols-3') {
      gridClasses = 'grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 items-center';
      if(item.imagePosition === 'right') {
        imageClasses = 'image-container px-5 pt-5 lg:px-10 sm:pt-0 hidden md:block';
        textClasses = 'md:col-span-2 px-5 sm:px-10 md:pb-0 pb-2';
      } else {
        imageClasses = 'image-container px-5 lg:px-10 2xl:px-0 hidden md:block';
        textClasses = 'md:col-span-2 px-5 sm:px-10 md:pb-0 pb-2';
      }
    }
  }

  // Adjust container width for background mode
  const containerClasses = hasBg ? 'max-w-7xl mx-auto' : 'w-full';

  const proportions = item.image ? getProportions(item.image?.asset?._ref ?? '', w) : null;
  const h = proportions?.height || 600;
  
  let txtAosFx = 'fade-up';
  if (item.imagePosition === 'left') txtAosFx = 'fade-left';
  if (item.imagePosition === 'right') txtAosFx = 'fade-right';

  const renderImage = (className: string) => (
    item.image && (
      <div className={className} data-aos="fade-up">
        <Image 
          src={urlFor(item.image).width(w).height(h).url()} 
          width={w} 
          height={h} 
          alt={item.image?.alt || item.heading || "Illustration"} 
          className="mx-auto rounded-lg shadow-xl object-cover"
        />
      </div>
    )
  );

  // Overlay classes based on theme/setting
  const overlayClasses = overlayColor === 'light' ? 'bg-white/40' : 'bg-black/60';
  const textColorClasses = overlayColor === 'light' ? 'text-gray-900' : 'text-white';

  const bgStyle = hasBg ? {
    backgroundImage: `url(${urlFor(item.backgroundImage!).width(1920).url()})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: isFixed ? 'fixed' : 'scroll',
  } : {};

  return (
    <section 
      className={`text-with-illustration relative overflow-hidden ${hasBg ? 'min-h-[700px] flex items-center transparent-header-trigger' : 'box md:py-20 py-10'}`}
      style={bgStyle}
    >
      {hasBg && showOverlay && (
        <div className={`absolute inset-0 z-0 ${overlayClasses}`}></div>
      )}
      
      <div className={`relative z-10 w-full px-4 ${containerClasses}`}>
        <div className={gridClasses}>
          {/* Top Image */}
          {item.imagePosition === 'top' && renderImage(imageClasses)}
          
          {/* Left Image */}
          {item.imagePosition === 'left' && renderImage(imageClasses)}
          
          <div className={textClasses} data-aos={txtAosFx}>
            <h2 className={`family-playfair ${hasBg ? textColorClasses : 'text-foreground'} ${hasBg ? 'text-4xl md:text-5xl mb-8' : 'mb-6'}`}>
              {item.heading}
            </h2>
            
            {/* Mobile Image (side layouts) */}
            {(item.imagePosition === 'left' || item.imagePosition === 'right') && renderImage("py-4 md:hidden")}
            
            {/* Mobile Image (Top layout) */}
            {item.imagePosition === 'top' && renderImage("py-4 md:hidden")}
 
            <div className={`portable-text-container ${hasBg ? textColorClasses : 'text-foreground'} ${hasBg ? 'text-lg md:text-xl leading-relaxed' : 'text-lg'}`}>
              <PortableText value={item?.text || []} components={components} />
            </div>

            {/* Mobile Image (Bottom layout) */}
            {item.imagePosition === 'bottom' && renderImage("py-4 md:hidden")}
          </div>

          {/* Right Image */}
          {item.imagePosition === 'right' && renderImage(imageClasses)}

          {/* Bottom Image */}
          {item.imagePosition === 'bottom' && renderImage(imageClasses)}
        </div>
      </div>
    </section>
  )
}