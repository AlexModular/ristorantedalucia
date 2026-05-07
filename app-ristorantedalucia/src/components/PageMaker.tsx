import { HOMEPAGE_QUERYResult, PAGE_QUERYResult } from '../../sanity.types';
import { PageBlock } from '../../sanity.types.custom';
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
import QuickActions from './blocks/QuickActions';

const makeBlock = (item: PageBlock, index: number): JSX.Element | null => {
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
    case 'quickActions':
      return (
        <QuickActions key={index} item={item} />
      )
    default:
      return null;
  }
};

/** Accept full page results or any object that at minimum has pageBuilder */
type PageMakerInput =
  | HOMEPAGE_QUERYResult
  | PAGE_QUERYResult
  | {
      pageBuilder?: PageBlock[] | null;
      slug?: { current?: string | null } | null;
      fullWidth?: boolean | null;
    };

export default function PageMaker({ page }: { page: PageMakerInput }) {
  if (!page) return null;
  const pageBuilder = (page.pageBuilder as PageBlock[]) || [];
  const slug = 'slug' in page && page.slug ? page.slug : undefined;
  const fullWidth = 'fullWidth' in page && page.fullWidth ? true : false;
  return (
    <div className={slug?.current?.includes('home') ? "homepage" : ("page-content" + (fullWidth ? " full-width" : ""))}>
      {pageBuilder?.map((item, index) => {
        return makeBlock(item, index);
      })}
    </div>
  );
}