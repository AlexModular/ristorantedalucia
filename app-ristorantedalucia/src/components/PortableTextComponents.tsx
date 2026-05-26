import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import React from "react";
import { resolveAlt } from "@/lib/resolveAlt";

export const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    left: ({ children }) => <span style={{ display: 'block', textAlign: 'left' }}>{children}</span>,
    center: ({ children }) => <span style={{ display: 'block', textAlign: 'center' }}>{children}</span>,
    right: ({ children }) => <span style={{ display: 'block', textAlign: 'right' }}>{children}</span>,
    justify: ({ children }) => <span style={{ display: 'block', textAlign: 'justify' }}>{children}</span>,
    color: ({ children, value }) => {
      return <span style={{ color: value?.hex }}>{children}</span>;
    },
    link: ({ children, value }) => {
      const href = value?.href || '#';
      const rel = !href.startsWith('/') && !href.startsWith('#') ? 'noreferrer noopener' : undefined;
      return (
        <a href={href} rel={rel} className="text-gold hover:underline">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      return (
        <div className="my-8 relative w-full aspect-video">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={resolveAlt(value.alt, 'it', 'Image')}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      );
    },
  },
};
