import {defineQuery} from 'next-sanity'

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"] | order(_updatedAt desc)[0]{
  theme,
  ogImage
}`)

export const HEADERMENU_QUERY = defineQuery(`*[navId.current match "main-menu*"]{
  'navId': navId.current,
  'items': items[] {
    'link': *[
      (_type == "page" || _type == "locations") &&
      _id == ^.navigationItemUrl.internalLink._ref
    ][0]{
      _type,
      'slug': select(
        _type == "locations" => "location/" + coalesce(slug[$locale].current, slug.it.current),
        coalesce(slug[$locale].current, slug.it.current)
      )
    },
    'externalUrl': navigationItemUrl.externalUrl,
    "text": coalesce(select(text[$locale] != "" => text[$locale]), select(text.it != "" => text.it), select(text.en != "" => text.en), text),
    "megamenuLabel": coalesce(select(megamenuLabel[$locale] != "" => megamenuLabel[$locale]), select(megamenuLabel.it != "" => megamenuLabel.it), select(megamenuLabel.en != "" => megamenuLabel.en)),
    megamenuImage,
    'children': children[] {
      "text": coalesce(select(text[$locale] != "" => text[$locale]), select(text.it != "" => text.it), select(text.en != "" => text.en), text),
      "description": coalesce(select(description[$locale] != "" => description[$locale]), select(description.it != "" => description.it), select(description.en != "" => description.en)),
      'link': *[
        (_type == "page" || _type == "locations") &&
        _id == ^.url.internalLink._ref
      ][0]{
        _type,
        'slug': select(
          _type == "locations" => "location/" + coalesce(slug[$locale].current, slug.it.current),
          coalesce(slug[$locale].current, slug.it.current)
        )
      },
      'externalUrl': url.externalUrl,
    }
  }
}`)


export const SOCIALS_QUERY = defineQuery(`*[_type == "socials"][0].socials`)

export const LOCATIONS_QUERY = defineQuery(`*[_type == "locations"]{
  "title": coalesce(title[$locale], title.it, title),
  location,
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

export const COPYRIGHT_QUERY = defineQuery(`*[_type == "copyright"][0].content{
  "it": coalesce(it, ^.content),
  "en": en
}[$locale]`)

export const HOMEPAGE_QUERY = defineQuery(`*[slug.it.current match "home*"][0]{
  "title": coalesce(title[$locale], title.it, title),
  "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle),
  "slug": coalesce(slug[$locale].current, slug.it.current),
  "metaTitle": coalesce(metaTitle[$locale], metaTitle.it, metaTitle),
  "metaDescription": coalesce(metaDescription[$locale], metaDescription.it, metaDescription),
  fullWidth,
  backgroundImage,
  backgroundFixed,
  theme,
  pageBuilder[]{
    _type == "video" => {
      _type,
      videoLabel,
      cssClasses,
      file
    },
    _type == "banner" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      "text": coalesce(text[$locale], text.it, text),
      headingCSSClasses,
      "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle)
    },
    _type == "separator" => {
      _type,
      separatorColor
    },
    _type == "slider" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle),
      backgroundImage {
        ...,
        "alt": coalesce(alt[$locale], alt.it, alt)
      },
      backgroundFixed,
      images[] {
        ...,
        "alt": coalesce(alt[$locale], alt.it, alt)
      }
    },
    _type == "slideshow" => {
      _type,
      'images':  images[] {
        asset,
        hotspot,
        crop,
        "alt": coalesce(alt[$locale], alt.it, alt),
        "heading": coalesce(heading[$locale], heading.it, heading),
        "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle),
        logo,
        'link': *[_type == "page" && _id == ^.cta.navigationItemUrl.internalLink._ref][0]{
          'slug': slug.current
        },
        'externalUrl': cta.navigationItemUrl.externalUrl,
        'ctaText': coalesce(cta.text[$locale], cta.text.it, cta.text)
      }
    },
    _type == "textWithIllustration" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      "text": coalesce(text[$locale], text.it, text),
      image {
        ...,
        "alt": coalesce(alt[$locale], alt.it, alt)
      },
      backgroundImage,
      backgroundFixed,
      hasOverlay,
      overlayColor,
      imagePosition,
      gridSize
    },
    _type == "gallery" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle),
      images[] {
        ...,
        "alt": coalesce(alt[$locale], alt.it, alt)
      }
    },
    _type == "form" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      label,
      form
    },
    _type == "promotion" => {
      _type,
      "title": coalesce(title[$locale], title.it, title),
      link,
      direction,
      speed
    },
    _type == "map" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      mapCenter,
      locations
    },
    _type == "dishesMenu" => {
      _type,
      _ref,
      "menu": *[ _type == "dishesMenu" && _id == ^._ref ][0] {
        "title": coalesce(title[$locale], title.it, title),
        "introText": coalesce(introText[$locale], introText.it, introText),
        categories[] {
          "title": coalesce(title[$locale], title.it, title),
          icon,
          flaticonClass,
          dishes[] {
            "title": coalesce(title[$locale], title.it, title),
            "description": coalesce(description[$locale], description.it, description),
            price,
            "subcategory": coalesce(subcategory[$locale], subcategory.it, subcategory)
          }
        }
      }
    },
    _type == "quickActions" => {
      _type,
      actions[] {
        "label": coalesce(label[$locale], label.it, label),
        icon,
        isPrimary,
        "link": {
          "slug": *[_type == "page" && _id == ^.link.internalLink._ref][0].slug.current,
          "externalUrl": link.externalUrl,
          "phone": link.phone
        }
      }
    }
  },
}`)

export const PAGE_QUERY = defineQuery(`*[
  _type == "page" &&
  coalesce(slug[$locale].current, slug.it.current) == $slug
][0]{
  "title": coalesce(title[$locale], title.it, title),
  "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle),
  "slug": coalesce(slug[$locale].current, slug.it.current),
  "metaTitle": coalesce(metaTitle[$locale], metaTitle.it, metaTitle),
  "metaDescription": coalesce(metaDescription[$locale], metaDescription.it, metaDescription),
  introImage,
  fullWidth,
  backgroundImage,
  backgroundFixed,
  theme,
  pageBuilder[]{
    _type == "video" => {
      _type,
      videoLabel,
      cssClasses,
      file
    },
    _type == "banner" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      "text": coalesce(text[$locale], text.it, text),
      headingCSSClasses,
      "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle)
    },
    _type == "separator" => {
      _type,
      separatorColor
    },
    _type == "slider" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle),
      backgroundImage {
        ...,
        "alt": coalesce(alt[$locale], alt.it, alt)
      },
      backgroundFixed,
      images[] {
        ...,
        "alt": coalesce(alt[$locale], alt.it, alt)
      }
    },
    _type == "slideshow" => {
      _type,
      'images':  images[] {
        asset,
        hotspot,
        crop,
        "alt": coalesce(alt[$locale], alt.it, alt),
        "heading": coalesce(heading[$locale], heading.it, heading),
        "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle),
        logo,
        'link': *[_type == "page" && _id == ^.cta.navigationItemUrl.internalLink._ref][0]{
          'slug': coalesce(slug[$locale].current, slug.it.current)
        },
        'externalUrl': cta.navigationItemUrl.externalUrl,
        'ctaText': coalesce(cta.text[$locale], cta.text.it, cta.text)
      }
    },
    _type == "textWithIllustration" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      "text": coalesce(text[$locale], text.it, text),
      image {
        ...,
        "alt": coalesce(alt[$locale], alt.it, alt)
      },
      backgroundImage,
      backgroundFixed,
      imagePosition,
      gridSize
    },
    _type == "gallery" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle),
      images[] {
        ...,
        "alt": coalesce(alt[$locale], alt.it, alt)
      }
    },
    _type == "form" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      label,
      form
    },
    _type == "promotion" => {
      _type,
      "title": coalesce(title[$locale], title.it, title),
      link,
      direction,
      speed
    },
    _type == "map" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      mapCenter,
      locations
    },
    _type == "dishesMenu" => {
      _type,
      _ref,
      "menu": *[_type == "dishesMenu" && _id == ^._ref][0] {
        "title": coalesce(title[$locale], title.it, title),
        "introText": coalesce(introText[$locale], introText.it, introText),
        categories[] {
          "title": coalesce(title[$locale], title.it, title),
          icon,
          flaticonClass,
          dishes[] {
            "title": coalesce(title[$locale], title.it, title),
            "description": coalesce(description[$locale], description.it, description),
            price,
            "subcategory": coalesce(subcategory[$locale], subcategory.it, subcategory)
          }
        }
      }
    },
    _type == "quickActions" => {
      _type,
      actions[] {
        "label": coalesce(label[$locale], label.it, label),
        icon,
        isPrimary,
        "link": {
          "slug": coalesce(*[_type == "page" && _id == ^.link.internalLink._ref][0].slug[$locale].current, *[_type == "page" && _id == ^.link.internalLink._ref][0].slug.it.current),
          "externalUrl": link.externalUrl,
          "phone": link.phone
        }
      }
    }
  },
}`)

// ─── Location page ────────────────────────────────────────────────────────────

export const LOCATION_QUERY = defineQuery(`*[
  _type == "locations" &&
  coalesce(slug[$locale].current, slug.it.current) == $slug
][0]{
  "title": coalesce(title[$locale], title.it, title),
  "metaTitle": coalesce(metaTitle[$locale], metaTitle.it, metaTitle),
  "metaDescription": coalesce(metaDescription[$locale], metaDescription.it, metaDescription),
  "slug": coalesce(slug[$locale].current, slug.it.current),
  heroImage {
    ...,
    "alt": coalesce(alt[$locale], alt.it, alt)
  },
  "description": coalesce(description[$locale], description.it, description),
  city,
  address,
  postalCode,
  phone,
  email,
  location,
  monday, tuesday, wednesday, thursday, friday, saturday, sunday,
  pageBuilder[]{
    _type == "banner" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      "text": coalesce(text[$locale], text.it, text),
      headingCSSClasses,
      "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle)
    },
    _type == "gallery" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle),
      images[] {
        ...,
        "alt": coalesce(alt[$locale], alt.it, alt)
      }
    },
    _type == "slideshow" => {
      _type,
      'images': images[] {
        asset,
        hotspot,
        crop,
        "alt": coalesce(alt[$locale], alt.it, alt),
        "heading": coalesce(heading[$locale], heading.it, heading),
        "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle),
        logo,
        'link': *[_type == "page" && _id == ^.cta.navigationItemUrl.internalLink._ref][0]{
          'slug': coalesce(slug[$locale].current, slug.it.current)
        },
        'externalUrl': cta.navigationItemUrl.externalUrl,
        'ctaText': coalesce(cta.text[$locale], cta.text.it, cta.text)
      }
    },
    _type == "slider" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      "subtitle": coalesce(subtitle[$locale], subtitle.it, subtitle),
      backgroundImage {
        ...,
        "alt": coalesce(alt[$locale], alt.it, alt)
      },
      backgroundFixed,
      images[] {
        ...,
        "alt": coalesce(alt[$locale], alt.it, alt)
      }
    },
    _type == "textWithIllustration" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      "text": coalesce(text[$locale], text.it, text),
      image {
        ...,
        "alt": coalesce(alt[$locale], alt.it, alt)
      },
      backgroundImage,
      backgroundFixed,
      imagePosition,
      gridSize
    },
    _type == "separator" => { _type, separatorColor },
    _type == "video" => { _type, videoLabel, cssClasses, file },
    _type == "promotion" => {
      _type,
      "title": coalesce(title[$locale], title.it, title),
      link, direction, speed
    },
    _type == "map" => {
      _type,
      "heading": coalesce(heading[$locale], heading.it, heading),
      mapCenter,
      locations
    },
    _type == "dishesMenu" => {
      _type,
      _ref,
      "menu": *[_type == "dishesMenu" && _id == ^._ref][0] {
        "title": coalesce(title[$locale], title.it, title),
        "introText": coalesce(introText[$locale], introText.it, introText),
        categories[] {
          "title": coalesce(title[$locale], title.it, title),
          icon,
          flaticonClass,
          dishes[] {
            "title": coalesce(title[$locale], title.it, title),
            "description": coalesce(description[$locale], description.it, description),
            price,
            "subcategory": coalesce(subcategory[$locale], subcategory.it, subcategory)
          }
        }
      }
    },
    _type == "quickActions" => {
      _type,
      actions[] {
        "label": coalesce(label[$locale], label.it, label),
        icon, isPrimary,
        "link": {
          "slug": coalesce(*[_type == "page" && _id == ^.link.internalLink._ref][0].slug[$locale].current, *[_type == "page" && _id == ^.link.internalLink._ref][0].slug.it.current),
          "externalUrl": link.externalUrl,
          "phone": link.phone
        }
      }
    }
  }
}`)

export const LOCATIONS_PATHS_QUERY = defineQuery(
  `*[_type == "locations" && defined(slug.it.current)]{
    "slugIt": slug.it.current,
    "slugEn": coalesce(slug.en.current, slug.it.current)
  }`
)

// ─── News & Events ────────────────────────────────────────────────────────────

export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) [$offset...$limit] {
    "title": coalesce(title[$locale], title.it, title),
    "excerpt": coalesce(excerpt[$locale], excerpt.it, excerpt),
    "slug": coalesce(slug[$locale].current, slug.it.current),
    publishedAt,
    category,
    coverImage {
      ...,
      "alt": coalesce(alt[$locale], alt.it, alt)
    }
  }
`)

export const POSTS_COUNT_QUERY = defineQuery(
  `count(*[_type == "post"])`
)

export const POST_QUERY = defineQuery(`*[
  _type == "post" &&
  coalesce(slug[$locale].current, slug.it.current) == $slug
][0]{
  "title": coalesce(title[$locale], title.it, title),
  "excerpt": coalesce(excerpt[$locale], excerpt.it, excerpt),
  "metaTitle": coalesce(metaTitle[$locale], metaTitle.it, metaTitle),
  "metaDescription": coalesce(metaDescription[$locale], metaDescription.it, metaDescription),
  "body": coalesce(body[$locale], body.it, body),
  slug,
  publishedAt,
  category,
  coverImage {
    ...,
    "alt": coalesce(alt[$locale], alt.it, alt)
  }
}`)