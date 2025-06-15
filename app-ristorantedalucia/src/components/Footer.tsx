import Link from "next/link"
import Image from 'next/image'
import iconSet from '@/config/icomoon/selection.json'
import IcomoonReact from "icomoon-react";
import { LOCATIONS_QUERYResult, SOCIALS_QUERYResult, COPYRIGHT_QUERYResult } from "../../sanity.types";
import { Icon } from '@iconify/react';
import { PortableText } from "next-sanity";
import { FaAngleDoubleUp } from "react-icons/fa";

const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer ({locations, socials, copyright}: {locations: LOCATIONS_QUERYResult, socials: SOCIALS_QUERYResult, copyright: COPYRIGHT_QUERYResult}) {
  return (
    <footer className="text-center pt-6 pb-6">
      <div className="footer-links grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 py-7">
        <div className="footer-logo md:pr-10 lg:pr-10 2xl:pr-10 md:col-span-2 lg:col-span-2 pb-8 justify-center">
          <Image priority={false} src="/images/logo.png" alt="Ristorante Enoteca Da Lucia, Bologna Centro Storico" className="logo" width={0} height={0} sizes="100vw 100vw" style={{ width: '100%', height: 'auto', maxHeight: '272px' }} />
        </div>
        <div className="locations md:col-span-2 lg:col-span-2 px-5">
          <h5 className="text-center md:text-left">Dove siamo</h5>
          <div className="grid grid-cols-1 md:grid-cols-2">
          {locations && locations.map((location, index) => (
            <div className={`md:text-left text-center pb-10 footer-location-${index}`} key={index}>
              <h6>{location.city}</h6>
              <IcomoonReact iconSet={iconSet} color="#b99b5b" size={15} icon="location" /> {location.address}, {location.postalCode}
              <br/>
              <IcomoonReact iconSet={iconSet} color="#b99b5b" size={15} icon="phone" /> <Link href={`tel:${location.phone}`}>{location.phone}</Link>
              <br/>
              <IcomoonReact iconSet={iconSet} color="#b99b5b" size={15} icon="mail2" /> <Link href={`mailto:${location.email}`}>{location.email}</Link>
            </div>
          ))}
          </div>
        </div>
        <div className="md:text-left text-center px-5 pb-8">
          <h5>Follow Us</h5>
          <div className="footer-socials text-center m-auto">
            {socials && socials.map((social, index) => (
              <Link href={social.link || '#'} target="__blank" title={social.title} className="md:pr-4 md:pl-0 px-2" key={index}>
                <Icon icon={social?.icon?.name || ''} fontSize={25} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <div className="footer-company-info">
        <a href="#" className="scrollTopButton">
          <span className="button-square">
              <FaAngleDoubleUp />
          </span>
        </a>
        <div className="px-2 pt-[25px]">
          <PortableText value={copyright || []} />
        </div>
        <small className="pt-2">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</small>
      </div>
    </footer>
  )
}