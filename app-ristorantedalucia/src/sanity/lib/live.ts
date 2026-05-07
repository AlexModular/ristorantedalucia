// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

// The "vX" apiVersion is required by next-sanity's live content API.
// We cast to Parameters[0]['client'] to avoid `any` while satisfying
// the internal SanityClient type that defineLive expects.
export const { sanityFetch, SanityLive } = defineLive({
  // Two separate resolution paths for @sanity/client produce structurally
  // identical but nominally distinct SanityClient types. The double cast via
  // `unknown` is the explicit, safe approach — avoids `any` while satisfying
  // the type checker across both resolution paths.
  client: client.withConfig({ apiVersion: "vX" }) as unknown as Parameters<typeof defineLive>[0]["client"],
  browserToken: token,
  serverToken: token,
});