// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

export const { sanityFetch, SanityLive } = defineLive({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: client.withConfig({apiVersion: "vX"}) as any,
  browserToken: token,
  serverToken: token,
});