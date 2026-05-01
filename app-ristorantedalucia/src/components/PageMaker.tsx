import { HOMEPAGE_QUERY_RESULT, Slider as S, Gallery as G, Banner as B, Video as V, TextWithIllustration as T, Form as F, Map as MAP, Promotion as P, Separator, PAGE_QUERY_RESULT } from '../../sanity.types';
import { DishesMenuForPageMaker, SlideshowForPageMaker } from '../../sanity.types.custom';
import Video from "./blocks/Video";
import Banner from "./blocks/Banner";
import Slider from "./blocks/Slider";
import Gallery from './blocks/Gallery';
import Promotion from "./blocks/Promotion";
import Map from "./blocks/Map";
import TextWithIllustration from "./blocks/TextWithIllustration";
import ContactForm from "./blocks/ContactForm";
import DishesMenu from "./blocks/DishesMenu";
import Slideshow from './blocks/Slideshow';

const makeBlock = (item: B | V | S | SlideshowForPageMaker | G | T | F | MAP | P | DishesMenuForPageMaker | Separator, index: number): JSX.Element | null => {
  switch(item?._type) {
    case 'video':
      return (
        <Video key={index} item={item} />
      )
    case 'separator':
      return (
        <div key={index} className="separator"></div>
      )
    case 'banner':
      return (
        <Banner key={index} item={item} />
      )
    case 'slider':
      return (
        <Slider key={index} item={item} />
      )
    case 'slideshow':
      return (
        <Slideshow key={index} item={item} />
      )
    case 'gallery':
      return (
        <Gallery key={index} item={item} />
      )
    case 'textWithIllustration':
      return (
        <TextWithIllustration key={index} item={item} />
      )
    case 'form':
      switch(item.form) {
        case 'contact':
          return (
            <ContactForm key={index} item={item} />
          )
        case 'newsletter':
          return (
            <ContactForm key={index} item={item} />
          )
        case 'register':
          return (
            <ContactForm key={index} item={item} />
          )
        default:
          return null;
      }
    case 'map':
      return (
        <Map key={index} item={item} />
      )
    case 'promotion':
      return (
        <Promotion key={index} item={item} />
      )
    case 'dishesMenu':
      return (
        <DishesMenu key={index} item={item} />
      )
    default:
      return null;
  }
};

export default function PageMaker({ page }: { page: HOMEPAGE_QUERY_RESULT | PAGE_QUERY_RESULT }) {
  const pageBuilder = page?.pageBuilder || [];
  return (
    <div className={page?.slug?.current?.includes('home') ? "homepage" : ("page-content" + (page?.fullWidth ? " full-width" : ""))}>
      {pageBuilder?.map((item, index) =>  {
        return makeBlock(item as (B | V | S | SlideshowForPageMaker | G | T | F | MAP | P | DishesMenuForPageMaker | Separator), index);
      })}
    </div>
  );
}