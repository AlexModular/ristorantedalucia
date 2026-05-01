import { SanityImageCrop, SanityImageHotspot } from '@sanity/asset-utils';
import { DishesCategory, internalGroqTypeReferenceTo } from './sanity.types';

export type DishesMenuForPageMaker = {
  _ref: string;
  _type: 'dishesMenu';
  menu: {
    title?: string;
    introText?: Array<{
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
        listItem?: "bullet";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      } | {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt?: string;
        _type: "image";
        _key: string;
      }>;
      image?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt?: string;
        _type: "image";
      };
    categories?: Array<{
      _key: string;
    } & DishesCategory>;
  }
};


export type SlideshowForPageMaker = {
  _type: "slideshow";
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    heading?: string;
    subtitle?: string;
    ctaText?: string;
    link?: {
      slug?: string;
    };
    externalUrl?: string;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  effect?: 'fade' | 'slide' | 'creative' | 'coverflow';
};
