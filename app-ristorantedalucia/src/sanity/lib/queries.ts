import {defineQuery} from 'next-sanity'

export const HEADERMENU_QUERY = defineQuery(`*[navId.current match "main-menu*"]{
  'navId': navId.current,
  'items':  items[] {
    'link': *[
      _type == "page" &&
      _id == ^.navigationItemUrl.internalLink._ref
    ][0]{
      'slug': slug.current
    },
    'externalUrl': navigationItemUrl.externalUrl,
    text
  }
}`)

export const SOCIALS_QUERY = defineQuery(`*[_type == "socials"][0].socials`)

export const LOCATIONS_QUERY = defineQuery(`*[_type == "locations"]{
  title,
  city,
  address,
  postalCode,
  phone,
  email,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday
}`)

export const COPYRIGHT_QUERY = defineQuery(`*[_type == "copyright"][0].content`)

export const HOMEPAGE_QUERY = defineQuery(`*[slug.current match "home*"][0]{
  title,
  subtitle,
  slug,
  metaTitle,
  metaDescription,
  fullWidth,
  pageBuilder[]{
    _type == "video" => {
      _type,
      videoLabel,
      cssClasses,
      file
    },
    _type == "banner" => {
      _type,
      heading,
      text,
      headingCSSClasses,
      subtitle
    },
    _type == "separator" => {
      _type,
      separatorColor
    },
    _type == "slider" => {
      _type,
      heading,
      subtitle,
      backgroundImage,
      images
    },
    _type == "slideshow" => {
      _type,
      'images':  images[] {
        asset,
        hotspot,
        crop,
        alt,
        heading,
        subtitle,
        'link': *[_type == "page" && _id == ^.cta.navigationItemUrl.internalLink._ref][0]{
          'slug': slug.current
        },
        'externalUrl': cta.navigationItemUrl.externalUrl,
        'ctaText': cta.text
      }
    },
    _type == "textWithIllustration" => {
      _type,
      heading,
      text,
      image,
      imagePosition,
      gridSize
    },
    _type == "gallery" => {
      _type,
      heading,
      subtitle,
      images
    },
    _type == "form" => {
      _type,
      heading,
      label,
      form
    },
    _type == "promotion" => {
      _type,
      title,
      link,
      direction,
      speed
    },
    _type == "map" => {
      _type,
      heading,
      mapCenter,
      locations
    },
    _type == "dishesMenu" => {
      _type,
      _ref,
      "menu": *[ _type == "dishesMenu" && menu._ref == ^._id ][0] {
        title,
        introText,
        categories
      }
    }
  },
}`)

export const PAGE_QUERY = defineQuery(`*[slug.current == $slug][0]{
  title,
  subtitle,
  slug,
  metaTitle,
  metaDescription,
  introImage,
  fullWidth,
  pageBuilder[]{
    _type == "video" => {
      _type,
      videoLabel,
      cssClasses,
      file
    },
    _type == "banner" => {
      _type,
      heading,
      text,
      headingCSSClasses,
      subtitle
    },
    _type == "separator" => {
      _type,
      separatorColor
    },
    _type == "slider" => {
      _type,
      title,
      subtitle,
      backgroundImage,
      images
    },
    _type == "slideshow" => {
      _type,
      'images':  images[] {
        asset,
        hotspot,
        crop,
        alt,
        heading,
        subtitle,
        'link': *[_type == "page" && _id == ^.cta.navigationItemUrl.internalLink._ref][0]{
          'slug': slug.current
        },
        'externalUrl': cta.navigationItemUrl.externalUrl,
        'ctaText': cta.text
      }
    },
    _type == "textWithIllustration" => {
      _type,
      heading,
      text,
      image,
      imagePosition,
      gridSize
    },
    _type == "gallery" => {
      _type,
      heading,
      subtitle,
      images
    },
    _type == "form" => {
      _type,
      heading,
      label,
      form
    },
    _type == "promotion" => {
      _type,
      title,
      link,
      direction,
      speed
    },
    _type == "map" => {
      _type,
      heading,
      mapCenter,
      locations
    },
    _type == "dishesMenu" => {
      _type,
      _ref,
      "menu": *[_type == "dishesMenu" && ^._ref == _id][0] {
        _id,
        title,
        introText,
        categories
      }
    }
  },
}`)