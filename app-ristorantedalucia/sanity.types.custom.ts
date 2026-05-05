import { SanityImageCrop, SanityImageHotspot } from '@sanity/asset-utils';
import { 
  Banner as SanityBanner,
  Slider as SanitySlider,
  Gallery as SanityGallery,
  Video as SanityVideo,
  TextWithIllustration as SanityTextWithIllustration,
  Form as SanityForm,
  Map as SanityMap,
  Promotion as SanityPromotion,
  Separator as SanitySeparator
} from './sanity.types';

export type TransformedBanner = Omit<SanityBanner, 'heading' | 'subtitle' | 'text'> & {
  heading?: string;
  subtitle?: string;
  text?: any;
};

export type TransformedVideo = Omit<SanityVideo, 'videoLabel'> & {
  videoLabel?: string;
};

export type TransformedSlider = Omit<SanitySlider, 'heading' | 'subtitle'> & {
  heading?: string;
  subtitle?: string;
  backgroundFixed?: boolean;
};

export type TransformedSlideshow = {
  _type: "slideshow";
  images?: Array<{
    asset?: { _ref: string; _type: "reference" };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    heading?: string;
    subtitle?: string;
    ctaText?: string;
    link?: { slug?: string };
    externalUrl?: string;
    logo?: any;
    _type: "image";
    _key: string;
  }>;
  effect?: 'fade' | 'slide' | 'creative' | 'coverflow';
};

export type TransformedTextWithIllustration = Omit<SanityTextWithIllustration, 'heading' | 'text'> & {
  heading?: string;
  text?: any;
  backgroundFixed?: boolean;
  hasOverlay?: boolean;
  overlayColor?: 'dark' | 'light';
};

export type TransformedGallery = Omit<SanityGallery, 'heading' | 'subtitle'> & {
  heading?: string;
  subtitle?: string;
};

export type TransformedForm = Omit<SanityForm, 'heading'> & {
  heading?: string;
};

export type TransformedPromotion = Omit<SanityPromotion, 'title'> & {
  title?: string;
};

export type TransformedMap = Omit<SanityMap, 'heading' | 'locations'> & {
  heading?: string;
  locations?: Array<{
    lat?: number;
    lng?: number;
    alt?: number;
    location?: {
      lat?: number;
      lng?: number;
      alt?: number;
    };
    _key?: string;
  }>;
};

export type TransformedDishesMenu = {
  _type: 'dishesMenu';
  _ref: string;
  menu: {
    title?: string;
    introText?: any;
    categories?: Array<{
      title?: string;
      icon?: any;
      flaticonClass?: string;
      dishes?: Array<{
        title?: string;
        description?: string;
        price?: number;
        subcategory?: string;
      }>;
    }>;
  }
};

export type TransformedQuickActions = {
  _type: 'quickActions';
  actions?: Array<{
    label?: string;
    icon?: string;
    isPrimary?: boolean;
    link?: {
      slug?: string;
      externalUrl?: string;
      phone?: string;
    };
  }>;
};

export type PageBlock = 
  | TransformedBanner 
  | TransformedVideo 
  | TransformedSlider 
  | TransformedSlideshow 
  | TransformedGallery 
  | TransformedTextWithIllustration 
  | TransformedForm 
  | TransformedMap 
  | TransformedPromotion 
  | TransformedDishesMenu 
  | TransformedQuickActions
  | SanitySeparator;
