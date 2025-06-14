"use_client";

import AOSComponent from "@/components/AOS";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot } from "../../sanity.types";

interface PageIntroProps {
  title: string;
  introImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  } | null | undefined;
}

//export default function PageIntro({title}: {title: PageIntroProps['title']}, {introImage}: {introImage: PageIntroProps['introImage']}) {
export default function PageIntro({data}: {data: PageIntroProps}) {
  let backgroundImageUrl = '';
  let style: React.CSSProperties = {backgroundColor: '#161616'};
  if(data.introImage !== null && data.introImage !== undefined) {
    backgroundImageUrl = urlFor(data.introImage).width(2560).url();
    style = {backgroundImage: `url(${backgroundImageUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: '100vw', backgroundPosition: 'initial center', backgroundColor: '#161616'};
  }
  return (
    <AOSComponent>
      <div className="page-head" style={style}>
        <h1 data-aos="zoom-in">{data.title}</h1>
      </div>
      <div className="breadcrumbs border-t-0 border-b-2 border-rose-900 px-5 sm:px-10">
        <ul className="list-none" data-aos="fade-right">
          <li><Link href={'/'}>Home</Link></li>
          <li>{data.title}</li>
        </ul>
      </div>
    </AOSComponent>
  );

}