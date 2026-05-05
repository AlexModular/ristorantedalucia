import { PortableText } from "@portabletext/react";
import { Banner as B } from "../../../sanity.types";
import AOSComponent from "../AOS";
import { components } from "../PortableTextComponents";

// Overriding types because GROQ coalesce returns strings, but Sanity types might still say LocalizedString
type BannerProps = Omit<B, 'heading' | 'subtitle'> & { 
  heading?: string; 
  subtitle?: string;
};

export default function Banner(params: {item: BannerProps}) {
  const { item } = params;
  return (
    <AOSComponent>
      <div className="banner p-12">
        <div className="banner-header" data-aos="zoom-in">
          <h1 className={item?.headingCSSClasses ? `text-center ${item?.headingCSSClasses}` : 'text-center'}>{item?.heading}</h1>
          <h2 className="banner-text banner-motto text-center">{item?.subtitle}</h2>
        </div>
        <div className="banner-text" data-aos="fade-bottom">
          <PortableText value={item?.text || []} components={components} />
        </div>
      </div>
    </AOSComponent>
  )
}