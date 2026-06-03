'use client';

import { Link } from "@/i18n/routing";
import Image from 'next/image'
import { LOCATIONS_QUERYResult, SOCIALS_QUERYResult, COPYRIGHT_QUERYResult } from "../../sanity.types";
import { Icon } from '@iconify/react';
import { PortableText } from "next-sanity";
import { FaAngleDoubleUp } from "react-icons/fa";
import { components } from "./PortableTextComponents";
import { MapPin, Phone, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer({ locations, socials, copyright }: { locations: LOCATIONS_QUERYResult, socials: SOCIALS_QUERYResult, copyright: COPYRIGHT_QUERYResult }) {
  const t = useTranslations('Footer');

  return (
    <footer className="text-center pt-12 pb-6 px-4" aria-labelledby="footer-heading">
      <h3 id="footer-heading" className="sr-only">{t('srHeading')}</h3>
      <div className="footer-links grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 py-7 max-w-7xl mx-auto gap-8">
        <div className="footer-logo md:col-span-2 lg:col-span-2 flex justify-center items-center">
          <Image
            priority={false}
            src="/images/logo-white.png"
            alt="Ristorante Enoteca Da Lucia Logo"
            className="logo object-contain"
            width={300}
            height={150}
            style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '200px' }}
          />
        </div>
        <div className="locations md:col-span-2 lg:col-span-2 px-5">
          <p className="text-center family-playfair md:text-left footer-section-label">{t('whereWeAre')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations && locations.map((location, index) => (
              <div className={`md:text-left text-center pb-6 footer-location-${index}`} key={index}>
                <h6 className="mb-2 family-playfair">{location.city}</h6>
                <div className="flex items-start justify-center md:justify-start gap-2 mb-1">
                  <MapPin color="#D4AF37" size={18} aria-hidden="true" className="mt-1 flex-shrink-0" />
                  <span>{location.address}, {location.postalCode}</span>
                </div>
                <div className="flex items-start justify-center md:justify-start gap-2 mb-1">
                  <Phone color="#D4AF37" size={18} aria-hidden="true" className="mt-1 flex-shrink-0" />
                  <Link href={`tel:${location.phone}`} aria-label={`Chiama ${location.phone}`}>{location.phone}</Link>
                </div>
                <div className="flex items-start justify-center md:justify-start gap-2">
                  <Mail color="#D4AF37" size={18} aria-hidden="true" className="mt-1 flex-shrink-0" />
                  <Link href={`mailto:${location.email}`} aria-label={`Invia email a ${location.email}`}>{location.email}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:text-left text-center px-5 pb-8">
          <p className="family-playfair footer-section-label">{t('followUs')}</p>
          <div className="footer-socials flex justify-center md:justify-start gap-4">
            {socials && socials.map((social, index) => (
              <Link href={social.link || '#'} target="__blank" title={social.title} className="social-icon-wrapper" key={index} aria-label={`Seguici su ${social.title}`}>
                <Icon icon={social?.icon?.name || ''} fontSize={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <div className="footer-company-info">
        <button className="scrollTopButton" onClick={scrollToTop} aria-label="Torna in cima alla pagina">
          <span className="button-square">
            <FaAngleDoubleUp aria-hidden="true" />
          </span>
        </button>
        <div className="px-2 pt-[25px] opacity-70">
          <PortableText value={copyright || []} components={components} />
        </div>
        <small className="pt-2 block opacity-50 text-xs">
          This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.
        </small>
      </div>
    </footer>
  )
}