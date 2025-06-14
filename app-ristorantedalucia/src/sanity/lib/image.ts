import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })
const pattern = /^(image-[a-f\d]+)-(\d+x\d+)-(\w+)$/

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

export const decodeAssetId = (id: string) => {
  const match = pattern.exec(id);
  if (!match) {
    throw new Error(`Invalid asset id: ${id}`);
  }
  const [matchRes, assetId, dimensions, format] = match;
  const [width, height] = dimensions.split("x").map(v => parseInt(v, 10));

  return {
    assetId,
    matchRes,
    dimensions: { width, height },
    format,
  };
}

export const getProportions = (id: string, width: number) => {
  const { dimensions } = decodeAssetId(id);
  const ratio = dimensions.width / dimensions.height;
  return {
    width,
    height: Math.round(width / ratio),
  };
}