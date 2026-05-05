import { PortableText } from "next-sanity";
import { components } from "../PortableTextComponents";
import { TransformedBanner } from "../../../sanity.types.custom";

export default function Banner({item}: {item: TransformedBanner}) {
  return (
    <div className="banner-container text-center py-10 md:py-20 lg:py-32 box">
        <h1 className={`family-playfair banner-title py-10 ${item.headingCSSClasses || ''}`}>{item.heading}</h1>
        {item.subtitle && (<div className="family-oswald banner-subtitle text-xl md:text-2xl lg:text-3xl uppercase tracking-widest text-gold mb-12">{item.subtitle}</div>)}
        <div className="banner-text max-w-4xl mx-auto px-5 text-lg md:text-xl">
            <PortableText value={item?.text || []} components={components} />
        </div>
    </div>
  )
}