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
  Separator as SanitySeparator,
  BlockContent,
  Icon,
} from './sanity.types';

// ─── Sanity image asset reference ───────────────────────────────────────────
type SanityImageAssetRef = {
  _ref: string;
  _type: 'reference';
  _weak?: boolean;
};

// ─── Sanity image with asset fields ─────────────────────────────────────────
type SanityImageWithMeta = {
  asset?: SanityImageAssetRef;
  media?: unknown;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  _type: 'image';
};

// ─── Transformed types ──────────────────────────────────────────────────────

export type TransformedBanner = Omit<SanityBanner, 'heading' | 'subtitle' | 'text'> & {
  heading?: string;
  subtitle?: string;
  /** Localised PortableText array resolved to the current locale */
  text?: BlockContent;
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
  _type: 'slideshow';
  images?: Array<{
    asset?: SanityImageAssetRef;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    heading?: string;
    subtitle?: string;
    ctaText?: string;
    link?: { slug?: string, isBookingWidget?: boolean };
    externalUrl?: string;
    logo?: SanityImageWithMeta;
    _type: 'image';
    _key: string;
  }>;
  effect?: 'fade' | 'slide' | 'creative' | 'coverflow';
};

export type TransformedTextWithIllustration = Omit<
  SanityTextWithIllustration,
  'heading' | 'text'
> & {
  heading?: string;
  /** Localised PortableText array resolved to the current locale */
  text?: BlockContent;
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
    /** Localised PortableText array resolved to the current locale */
    introText?: BlockContent;
    categories?: Array<{
      title?: string;
      /** Sanity Iconify Icon object */
      icon?: Icon;
      flaticonClass?: string;
      dishes?: Array<{
        title?: string;
        description?: string;
        price?: number;
        subcategory?: string;
      }>;
    }>;
  };
};

/** Lucide icon name as typed by the Sanity quickActionsType schema */
export type QuickActionIconName =
  | 'Calendar'
  | 'Camera'
  | 'Clock'
  | 'Info'
  | 'Mail'
  | 'MapPin'
  | 'Phone'
  | 'Star'
  | 'Users'
  | 'Utensils';

export type TransformedQuickActions = {
  _type: 'quickActions';
  actions?: Array<{
    label?: string;
    icon?: QuickActionIconName | null;
    isPrimary?: boolean;
    link?: {
      slug?: string;
      externalUrl?: string;
      phone?: string;
      isBookingWidget?: boolean;
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
