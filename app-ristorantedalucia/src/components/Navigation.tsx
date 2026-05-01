'use client'
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { HEADERMENU_QUERY_RESULT } from "../../sanity.types";
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'react-responsive';
import Logo from "./Logo";

export default function Navbar({ navItems, theme }: { navItems: HEADERMENU_QUERY_RESULT, theme: string }) {
  const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // Navigation items array
  const [isSticky, setIsSticky] = useState(false);
  const [isOverTransparentSection, setIsOverTransparentSection] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for transparent sections
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -90% 0px', // Detect when element is under the header
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      let isOver = false;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isOver = true;
        }
      });
      setIsOverTransparentSection(isOver);
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const targets = document.querySelectorAll('.transparent-header-trigger');
    targets.forEach(target => observer.observe(target));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const headerIsTransparent = !isSticky || isOverTransparentSection;

  // Logic to determine logo version
  const useWhiteLogo = headerIsTransparent || theme === 'dark' || (theme === 'auto' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <header className={isSticky ? 'sticky z-50 top-0 active' : 'z-50 top-0'}>
      <nav className={`w-full px-4 py-4 md:px-8 sticky top-0 z-[9999] transition-all duration-500 ${headerIsTransparent ? 'bg-transparent' : 'bg-background border-b-2 border-gold shadow-lg'}`}>
        <div className="flex items-center justify-between mx-auto relative w-full">
          {/* Desktop Menu Left */}
          <div className="hidden lg:flex flex-1 justify-start menu-left">
            <ul className="flex flex-row items-center gap-8">
              {navItems.map((item) => {
                if (item.navId === 'main-menu-left' && item?.items) {
                  return item.items.map((nav, index) => (
                    <li
                      key={index}
                      className={`flex items-center p-1 text-lg gap-x-2 uppercase transition-colors duration-300 family-oswald ${headerIsTransparent ? 'text-white' : 'text-foreground'}`}
                    >
                      <Link href={(nav.link?.slug === 'home' ? '/' : nav.link?.slug) ?? nav.externalUrl ?? '#'} className={`flex items-center${pathname == '/' + nav.link?.slug || (nav.link?.slug === 'home' && pathname == '/') ? ' active' : ''}`}>
                        {nav.text}
                      </Link>
                    </li>
                  ));
                }
                return null;
              })}
            </ul>
          </div>

          <div className="logo-container">
            {/* Logo */}
            <Link
              href="/"
              className="logo"
            >
              <Logo
                className={`w-full h-full transition-all duration-500 ${useWhiteLogo ? 'text-white' : 'text-foreground'}`}
                width={isMobile ? 90 : (headerIsTransparent ? 140 : 110)}
                height={isMobile ? 90 : (headerIsTransparent ? 140 : 110)}
              />
            </Link>
          </div>

          {/* Desktop Menu Right */}
          <div className="hidden lg:flex flex-1 justify-end menu-right items-center gap-8">
            <ul className="flex flex-row items-center gap-8">
              {navItems.map((item) => {
                if (item.navId === 'main-menu-right' && item?.items) {
                  return item.items.map((nav, index) => (
                    <li
                      key={index}
                      className={`flex items-center p-1 text-lg gap-x-2 uppercase transition-colors duration-300 family-oswald ${headerIsTransparent ? 'text-white' : 'text-foreground'}`}
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
            <Link
              href="/contattaci"
              className={`cta-btn-header px-6 py-2 border-2 uppercase family-oswald tracking-widest transition-all duration-300 ${headerIsTransparent ? 'border-white text-white hover:bg-white hover:text-foreground' : 'border-gold bg-gold text-white hover:bg-background hover:text-gold'}`}
            >
              Prenota Ora
            </Link>
          </div>
          <div className="lg:hidden z-[10000]">
            <button
              className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''} ${headerIsTransparent ? 'transparent' : 'sticky'}`}
              onClick={toggleMobileMenu}
              type="button"
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`mobile-menu fixed top-0 left-0 min-h-screen w-full sm:w-80 bg-background shadow-2xl transform transition-transform duration-500 ease-in-out z-[9999] ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <div className="flex flex-col h-full pt-12 px-10">
              <div className="flex justify-center mb-12">
                <Logo className="w-32 h-32 text-foreground" />
              </div>
              <ul className="flex flex-col gap-8 text-center">
                {navItems.map((item) => {
                  if ((item.navId === 'main-menu-left' || item.navId === 'main-menu-right') && item?.items) {
                    return item.items.map((nav, index) => (
                      <li
                        key={`${item.navId}-${index}`}
                        className="border-b border-white/10 pb-4"
                      >
                        <Link href={(nav.link?.slug === 'home' ? '/' : nav.link?.slug) ?? nav.externalUrl ?? '#'}
                          className="text-2xl family-oswald uppercase tracking-widest text-foreground hover:text-gold transition-colors"
                          onClick={toggleMobileMenu}>
                          {nav.text}
                        </Link>
                      </li>
                    ));
                  }
                  return null;
                })}
                <li className="pt-4 flex justify-center">
                  <Link
                    href="/contattaci"
                    className="inline-block px-8 py-3 border-2 border-gold bg-gold text-white uppercase family-oswald tracking-widest transition-all duration-300 active:bg-foreground active:border-foreground"
                    onClick={toggleMobileMenu}
                  >
                    Prenota Ora
                  </Link>
                </li>
              </ul>
              <div className="mt-auto pb-16 flex justify-center">
                {/* Logo removed from bottom */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}