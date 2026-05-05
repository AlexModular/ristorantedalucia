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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeBlock = (item: any, index: number): JSX.Element | null => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PageMaker({ page }: { page: any }) {
  const pageBuilder = page?.pageBuilder || [];
  return (
    <div className={page?.slug?.current?.includes('home') ? "homepage" : ("page-content" + (page?.fullWidth ? " full-width" : ""))}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {pageBuilder?.map((item: any, index: number) =>  {
        return makeBlock(item, index);
      })}
    </div>
  );
}