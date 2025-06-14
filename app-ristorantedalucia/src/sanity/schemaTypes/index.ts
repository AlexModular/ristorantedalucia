import { type SchemaTypeDefinition } from 'sanity';
import { pageType } from "./pageType";
import { blockContentType } from './blockContentType';
import { promotionType } from './promotionType'
import { formType } from './formType'
import { bannerType } from './bannerType'
import { imageGalleryType } from './imageGalleryType'
import { imageSliderType } from './imageSliderType'
import { textWithIllustrationType } from './textWithIllustrationType'
import { videoType } from './videoType'
import { separatorType } from './separatorType'
import { navigationType } from './navigationType';
import { navigationItemType } from './navigationItemType';
import { linkType } from './linkType';
import { mapType } from './mapType';
import { dishesMenuType } from './dishesMenuType';
import { dishesCategoryType } from './dishesCategoryType';
import { dishType } from './dishType';
import { timeValueType } from './timeValueType';
import { durationType } from './durationType';
import { locationsType } from './locationsType';
import { socialType } from './socialType';
import { socialsType } from './socialsType';
import { copyrightType } from './copyrightType';
import { imageSlideshowType } from './imageSlideshow';

// schemas
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    pageType,
    blockContentType,
    promotionType,
    bannerType,
    textWithIllustrationType,
    imageGalleryType,
    formType,
    videoType,
    imageSliderType,
    imageSlideshowType,
    separatorType,
    navigationType,
    navigationItemType,
    linkType,
    mapType,
    dishesMenuType,
    dishesCategoryType,
    dishType,
    timeValueType,
    durationType,
    locationsType,
    socialType,
    socialsType,
    copyrightType
  ],
}

