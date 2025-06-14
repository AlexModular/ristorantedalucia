'use client'
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { HEADERMENU_QUERYResult } from "../../sanity.types";

export default function Navbar({navItems}: {navItems: HEADERMENU_QUERYResult}) {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // Navigation items array
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
  return (
    <header className={`border-gold border-b-2 ${isSticky ? 'sticky z-50 top-0' : ''}`}>
      <nav className={`block w-full max-w-screen px-4 pt-4 mx-auto sticky top-3 shadow lg:px-8 ${isSticky ? 'backdrop-blur-lg backdrop-saturate-150 bg-opacity-50 ' : ''}bg-white z-[9999]`}>
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          {/* Desktop Menu Left */}
          <div className="hidden lg:block menu-left">
            <ul className="flex flex-col justify-start gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                {navItems.map((item) => {
                if (item.navId === 'main-menu-left' && item?.items) {
                  return item.items.map((nav, index) => (
                  <li
                    key={index}
                    className="flex items-center p-1 text-lg gap-x-2 uppercase"
                  >
                    <Link href={(nav.link?.slug === 'home' ? '/' : nav.link?.slug) ?? nav.externalUrl ?? '#'} className="flex items-center">
                    {nav.text}
                    </Link>
                  </li>
                  ));
                }
                return null;
                })}
            </ul>
          </div>
          <div className="logo-container flex items-center justify-start lg:justify-center w-full lg:w-auto">
            {/* Logo */}
            <Link
              href="/"
              className="logo"
            >
              <Image priority={true} src="/images/logo-solo.png" height={50} width={95} alt="Ristorante Enoteca Da Lucia, Bologna Centro Storico" className="logo" />
            </Link>
          </div>
          {/* Desktop Menu Right */}
          <div className="hidden lg:block menu-right">
            <ul className="flex flex-col justify-start gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {navItems.map((item) => {
                if (item.navId === 'main-menu-right' && item?.items) {
                  return item.items.map((nav, index) => (
                  <li
                    key={index}
                    className="flex items-center p-1 text-lg gap-x-2 uppercase"
                  >
                    <Link href={(nav.link?.slug === 'home' ? '/' : nav.link?.slug) ?? nav.externalUrl ?? '#'} className="flex items-center">
                    {nav.text}
                    </Link>
                  </li>
                  ));
                }
                return null;
              })}
            </ul>
          </div>
          <div className="lg:hidden">
            <button
              className="relative top-[5px] ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={toggleMobileMenu}
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`mobile-menu fixed top-0 left-0 min-h-screen w-64 bg-white bg-opacity-80 shadow-lg transform transition-transform duration-300 ease-in-out backdrop-blur backdrop-saturate-150 ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:hidden z-50`}
          >
            <div className="flex flex-row items-center border-b border-rose-900 pb-4 bg-white">
              <Link
                href="/"
                className="cursor-pointer font-bold text-xl pt-4 ps-4 logo"
                onClick={toggleMobileMenu}
              >
                <Image priority={true} src="/images/donnasofi.svg" height={0} width={0} alt="Ristorante Enoteca Da Lucia, Bologna Centro Storico" className="logo" />
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="absolute top-5 right-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col h-full gap-4 p-4 ">
              {navItems.map((item) => {
                if (item.navId === 'main-menu-left' && item?.items) {
                  return item.items.map((nav, index) => (
                  <li
                    key={index}
                    className="flex items-center p-1 text-lg gap-x-2"
                  >
                    <Link href={(nav.link?.slug === 'home' ? '/' : nav.link?.slug) ?? nav.externalUrl ?? '#'} className="flex items-center" onClick={toggleMobileMenu}>
                    {nav.text}
                    </Link>
                  </li>
                  ));
                }
                return null;
              })}
              {navItems.map((item) => {
                if (item.navId === 'main-menu-right' && item?.items) {
                  return item.items.map((nav, index) => (
                  <li
                    key={index}
                    className="flex items-center p-1 text-lg gap-x-2"
                  >
                    <Link href={(nav.link?.slug === 'home' ? '/' : nav.link?.slug) ?? nav.externalUrl ?? '#'} className="flex items-center" onClick={toggleMobileMenu}>
                    {nav.text}
                    </Link>
                  </li>
                  ));
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}