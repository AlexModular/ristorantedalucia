'use client'
import { Link, usePathname } from "@/i18n/routing";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HEADERMENU_QUERYResult, LOCATIONS_QUERYResult } from "../../sanity.types";
import Logo from "./Logo";
import { Phone, ChevronLeft, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

// ─── Types ───────────────────────────────────────────────────────────────────
type NavItem = NonNullable<NonNullable<HEADERMENU_QUERYResult>[number]['items']>[number];
type SubItem = NonNullable<NavItem['children']>[number];
type LocalizableText = NavItem['text'];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function resolveText(text: LocalizableText, locale: string): string {
  if (!text) return '';
  if (typeof text === 'string') return text || '';
  if (Array.isArray(text)) {
    const first = text[0] as { it?: string; en?: string } | undefined;
    if (!first) return '';
    const preferred = locale === 'en' ? first.en : first.it;
    return preferred?.trim() ? preferred : (locale === 'en' ? first.it : first.en) ?? '';
  }
  const loc = text as { it?: string; en?: string };
  const preferred = locale === 'en' ? loc.en : loc.it;
  return preferred?.trim() ? preferred : (locale === 'en' ? loc.it : loc.en) ?? '';
}

function resolveHref(slug?: string | null, externalUrl?: string | null): string {
  if (slug) return slug === 'home' ? '/' : `/${slug}`;
  return externalUrl ?? '#';
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar({
  navItems,
  theme,
  locations,
}: {
  navItems: HEADERMENU_QUERYResult;
  theme: string;
  locations: LOCATIONS_QUERYResult;
}) {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();

  // ── Header transparency: true while any .transparent-header-trigger is covering the nav ──
  const [overTrigger, setOverTrigger] = useState(false);
  const [navTextDark, setNavTextDark] = useState(false); // true = use dark text when transparent
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const NAV_HEIGHT = 80; // approx nav bar height in px

    const check = () => {
      setIsScrolled(window.scrollY > 50);

      // Find the topmost section that covers the nav area
      // We check ALL sections with data-header-theme, not just trigger ones
      const allSections = document.querySelectorAll<HTMLElement>('[data-header-theme]');
      let topSection: HTMLElement | null = null;
      let topSectionBottom = 0;

      allSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Section is covering the nav if its bottom is below nav height
        // and its top is above the middle of the nav
        if (rect.bottom > NAV_HEIGHT && rect.top < NAV_HEIGHT) {
          topSection = el;
          topSectionBottom = rect.bottom;
        }
      });

      // Also check transparent-header-trigger elements for overTrigger
      const triggers = document.querySelectorAll<HTMLElement>('.transparent-header-trigger');
      const anyTriggerVisible = Array.from(triggers).some(
        (el) => el.getBoundingClientRect().bottom > NAV_HEIGHT
      );
      setOverTrigger(anyTriggerVisible);

      // Determine text color from the covering section's theme
      if (topSection) {
        const theme = (topSection as HTMLElement).dataset.headerTheme;
        setNavTextDark(theme === 'light');
      } else if (!anyTriggerVisible) {
        setNavTextDark(false); // header is solid, doesn't matter
      }
    };

    check();
    const raf = requestAnimationFrame(check);
    window.addEventListener('scroll', check, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', check);
    };
  }, [pathname]);

  // ── Desktop megamenu state ────────────────────────────────────────────────
  const [activeDesktopItem, setActiveDesktopItem] = useState<NavItem | null>(null);
  const megaOpen = activeDesktopItem !== null;

  // Transparent while still scrolling OVER a trigger section (slideshow/page-intro)
  const headerIsTransparent = overTrigger && !megaOpen;

  // Is the current theme light? Used to adapt transparent nav tint + megamenu bg
  const isLightTheme = theme === 'light' || theme === 'cream' || theme === 'white';

  // Text color when transparent: white over dark sections, foreground over light sections
  const navTextColor = headerIsTransparent && navTextDark ? 'text-foreground' : 'text-white';
  const navTextHover = 'hover:text-gold';

  const useWhiteLogo =
    (headerIsTransparent && !navTextDark) ||
    theme === 'dark' ||
    (theme === 'auto' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  (theme === 'auto' &&
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = useCallback((item: NavItem) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (item.children && item.children.length > 0) setActiveDesktopItem(item);
    else setActiveDesktopItem(null);
  }, []);

  const closeMega = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveDesktopItem(null), 180);
  }, []);

  // keepMega is unused now (handled by header-level onMouseLeave)
  const keepMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // ── Mobile drawer state ───────────────────────────────────────────────────
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubItem, setMobileSubItem] = useState<NavItem | null>(null);

  // ── Scroll Lock when mobile menu is open ──
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((v) => {
      if (v) setMobileSubItem(null); // reset sub when closing
      return !v;
    });
  };

  const openMobileSub = (item: NavItem) => {
    setMobileSubItem(item);
  };

  const closeMobileSub = () => {
    setMobileSubItem(null);
  };

  // ── Nav items ─────────────────────────────────────────────────────────────
  const getMenuItems = (navId: string): NavItem[] =>
    navItems?.flatMap((item) =>
      item.navId === navId && item.items ? item.items : []
    ) ?? [];

  const leftItems = getMenuItems('main-menu-left');
  const rightItems = getMenuItems('main-menu-right');
  const allItems = navItems?.flatMap((item) => item.items ?? []) ?? [];

  // ── Language switcher ─────────────────────────────────────────────────────
  const LanguageSwitcher = ({ inverse = false }: { inverse?: boolean }) => (
    <div className="flex items-center gap-2 text-sm font-medium shrink-0">
      <Link
        href={pathname}
        locale="it"
        className={`transition-colors ${locale === 'it' ? 'text-gold' : inverse ? 'text-foreground' : (headerIsTransparent ? navTextColor : 'text-foreground')} hover:text-gold`}
      >
        IT
      </Link>
      <span className={inverse ? 'text-foreground/30' : (headerIsTransparent ? (navTextDark ? 'text-foreground/30' : 'text-white/30') : 'text-foreground/30')}>|</span>
      <Link
        href={pathname}
        locale="en"
        className={`transition-colors ${locale === 'en' ? 'text-gold' : inverse ? 'text-foreground' : (headerIsTransparent ? navTextColor : 'text-foreground')} hover:text-gold`}
      >
        EN
      </Link>
    </div>
  );

  // ── Desktop nav link ──────────────────────────────────────────────────────
  const DesktopLink = ({ nav }: { nav: NavItem }) => {
    const hasSub = (nav.children?.length ?? 0) > 0;
    const href = resolveHref(nav.link?.slug, nav.externalUrl);
    const label = resolveText(nav.text, locale);
    const isActive = activeDesktopItem === nav;

    const cls = `flex items-center gap-1 px-1 py-2 text-[15px] uppercase tracking-widest transition-colors duration-200 family-oswald whitespace-nowrap ${isActive
      ? 'text-gold'
      : headerIsTransparent
        ? `${navTextColor} ${navTextHover}`
        : 'text-foreground hover:text-gold'
      }`;

    if (hasSub) {
      return (
        <button
          type="button"
          className={cls}
          onMouseEnter={() => openMega(nav)}
          onMouseLeave={closeMega}
          aria-expanded={isActive}
          aria-haspopup="true"
        >
          {label}
          <svg
            width="10" height="10" viewBox="0 0 10 10"
            className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
            fill="currentColor"
          >
            <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </button>
      );
    }

    return (
      <Link href={href} className={cls}>
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Page overlay — only in DOM when megamenu is open */}
      {megaOpen && (
        <div
          className="hidden lg:block fixed inset-0 bg-black/50 z-[700]"
          onClick={() => setActiveDesktopItem(null)}
        />
      )}

      {/* Header: sticky when scrolled OR when megamenu is open */}
      <header
        className={(isScrolled || megaOpen) ? 'sticky z-[900] top-0 active' : 'z-[900] top-0'}
        onMouseLeave={closeMega}
      >
        <nav
          className={`w-full px-4 py-4 md:px-8 sticky top-0 z-[900] transition-all duration-300 ${headerIsTransparent
            ? ('')
            : 'bg-background shadow-xl backdrop-blur-md'
            }`}
        >
          <div className="flex items-center justify-between mx-auto relative w-full">

            {/* Mobile: Hamburger */}
            <div className="lg:hidden flex-1 flex justify-start items-center z-[10000]">
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

            {/* Desktop Left */}
            <div className="hidden lg:flex flex-1 justify-start items-center gap-6 menu-left">
              {locations?.[0]?.phone && (
                <Link
                  href={`tel:${locations[0].phone}`}
                  className={`flex items-center gap-2 family-oswald text-base transition-colors duration-200 ${headerIsTransparent ? `${navTextColor} hover:text-gold` : 'text-foreground hover:text-gold'}`}
                  aria-label={`${t('call')} ${locations[0].phone}`}
                >
                  <Phone size={18} />
                  <span className="sr-only">{locations[0].phone}</span>
                </Link>
              )}
              <ul className="flex flex-row items-center gap-6">
                {leftItems.map((nav, i) => (
                  <li
                    key={i}
                    onMouseEnter={() => openMega(nav)}
                  >
                    <DesktopLink nav={nav} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Logo */}
            <div className="logo-container">
              <Link href="/" className="logo">
                <Logo
                  className={`w-full h-full transition-all duration-500 ${useWhiteLogo ? 'text-white' : 'text-foreground'}`}
                  width={headerIsTransparent ? 140 : 110}
                  height={headerIsTransparent ? 140 : 110}
                />
              </Link>
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex flex-1 justify-end items-center gap-6 menu-right">
              <ul className="flex flex-row items-center gap-6">
                {rightItems.map((nav, i) => (
                  <li
                    key={i}
                    onMouseEnter={() => openMega(nav)}
                  >
                    <DesktopLink nav={nav} />
                  </li>
                ))}
              </ul>
              <Link
                href="/contattaci"
                className={`cta-btn-header px-5 py-2 border-2 uppercase family-oswald tracking-widest text-sm transition-all duration-300 shrink-0 ${headerIsTransparent
                  ? (navTextDark
                    ? 'border-foreground text-foreground hover:bg-foreground hover:text-background'
                    : 'border-white text-white hover:bg-white hover:text-gold')
                  : 'border-gold bg-gold text-white hover:bg-background hover:text-gold'
                  }`}
              >
                {t('bookNow')}
              </Link>
              <LanguageSwitcher />
            </div>

            {/* Mobile Right */}
            <div className="lg:hidden flex-1 flex justify-end items-center z-[10000] gap-3">
              <LanguageSwitcher />
              {locations?.[0]?.phone && (
                <Link
                  href={`tel:${locations[0].phone}`}
                  className={`transition-colors duration-200 ${headerIsTransparent ? `${navTextColor} hover:text-gold` : 'text-foreground hover:text-gold'}`}
                  aria-label={`${t('call')} ${locations[0].phone}`}
                >
                  <Phone size={22} />
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* ── Desktop Megamenu Panel ─────────────────────────────────────── */}
        <div
          className={`hidden lg:block absolute left-0 right-0 z-[800] transition-all duration-300 ${activeDesktopItem
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          onMouseEnter={keepMega}
          onMouseLeave={closeMega}
          style={{ top: '100%' }}
        >
          {activeDesktopItem && (
            // Full-width panel: text column left (max-width constrained), image bleeds to right edge
            <div className={`border-b-2 border-gold/50 shadow-2xl flex overflow-hidden backdrop-blur-md max-h-[85vh] overflow-y-auto ${isLightTheme ? 'bg-white' : 'bg-background'
              }`}>
              {/* Links column — aligned to left with max-width constrained */}
              <div className="flex-1 py-10 pl-8 md:pl-16 pr-8 max-w-3xl">
                {activeDesktopItem.megamenuLabel && (
                  <p className="text-gold text-xs family-playfair uppercase text-[20px] mb-6 pb-4 border-b border-gold/20">
                    {resolveText(activeDesktopItem.megamenuLabel, locale)}
                  </p>
                )}
                <ul className="grid grid-cols-1 gap-1 !list-none p-0">
                  {(activeDesktopItem.children ?? []).map((sub: SubItem, i: number) => {
                    const subHref = resolveHref(sub.link?.slug, sub.externalUrl);
                    const subLabel = resolveText(sub.text, locale);
                    const subDesc = resolveText(sub.description, locale);
                    return (
                      <li key={i}>
                        <Link
                          href={subHref}
                          onClick={() => setActiveDesktopItem(null)}
                          className="group flex items-start gap-4 py-4 px-0 rounded transition-colors hover:bg-gold/5"
                        >
                          <span className="flex flex-col">
                            <span className="family-oswald uppercase text-base tracking-widest text-foreground group-hover:text-gold transition-colors">
                              {subLabel}
                            </span>
                            {subDesc && (
                              <span className="text-sm family-montserrat text-foreground/50 mt-0.5 normal-case font-normal tracking-normal">
                                {subDesc}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Image — bleeds to right viewport edge, no padding, full height */}
              {activeDesktopItem.megamenuImage ? (
                <div className="relative w-80 xl:w-[840px] shrink-0 self-stretch min-h-[500px] ml-auto">
                  <Image
                    src={urlFor(activeDesktopItem.megamenuImage).width(840).height(800).url()}
                    alt={(activeDesktopItem.megamenuImage as { alt?: string }).alt ?? resolveText(activeDesktopItem.text, locale)}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1280px) 840px, 320px"
                  />
                </div>
              ) : (
                // No image: add padding so text isn't edge-to-edge
                <div className="w-16 shrink-0" />
              )}
            </div>
          )}
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────────────────── */}
      {/* Backdrop — only rendered when open, avoids z-index pollution */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-[9000]"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Drawer shell — invisible+pointer-events-none when closed */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-full sm:w-80 z-[9500] overflow-hidden transform transition-transform duration-500 ease-in-out ${isMobileMenuOpen
          ? 'translate-x-0 visible pointer-events-auto'
          : '-translate-x-full invisible pointer-events-none'
          }`}
      >
        {/* ── Main menu panel ── */}
        <div
          className={`absolute inset-0 bg-background flex flex-col transform transition-transform duration-400 ease-in-out ${mobileSubItem ? '-translate-x-full' : 'translate-x-0'
            }`}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/10">
            <Logo className="w-14 h-14 text-foreground" />
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav list */}
          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="flex flex-col gap-2 !list-none p-0">
              {allItems.map((nav, i) => {
                const hasSub = (nav.children?.length ?? 0) > 0;
                const href = resolveHref(nav.link?.slug, nav.externalUrl);
                const label = resolveText(nav.text, locale);

                if (hasSub) {
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => openMobileSub(nav)}
                        className="w-full flex items-center justify-between py-4 text-xl family-oswald uppercase tracking-widest text-foreground hover:text-gold transition-colors border-b border-foreground/8"
                      >
                        {label}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gold shrink-0">
                          <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={i}>
                    <Link
                      href={href}
                      onClick={toggleMobileMenu}
                      className="flex py-4 text-xl family-oswald uppercase tracking-widest text-foreground hover:text-gold transition-colors border-b border-foreground/8"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-6 py-6 border-t border-foreground/10 flex flex-col gap-4">
            <Link
              href="/contattaci"
              onClick={toggleMobileMenu}
              className="block text-center py-3 border-2 border-gold bg-gold text-white uppercase family-oswald tracking-widest text-sm transition-all active:bg-foreground"
            >
              {t('bookNow')}
            </Link>
            <LanguageSwitcher inverse />
          </div>
        </div>

        {/* ── Submenu panel (slides in from right) ── */}
        <div
          className={`absolute inset-0 bg-background flex flex-col transform transition-transform duration-400 ease-in-out ${mobileSubItem
            ? 'translate-x-0 pointer-events-auto'
            : 'translate-x-full pointer-events-none'
            }`}
          aria-hidden={!mobileSubItem}
        >
          {mobileSubItem && (
            <>
              {/* Header bar */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/10">
                <button
                  onClick={closeMobileSub}
                  className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <ChevronLeft size={20} />
                  <span className="family-oswald text-sm uppercase tracking-widest">Indietro</span>
                </button>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 text-foreground/60 hover:text-foreground transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Sub label */}
              <div className="px-6 pt-6 pb-2">
                <p className="family-playfair text-2xl text-foreground">
                  {resolveText(mobileSubItem.text, locale)}
                </p>
                {mobileSubItem.megamenuLabel && (
                  <p className="text-xs text-gold uppercase tracking-[0.2em] mt-1">
                    {resolveText(mobileSubItem.megamenuLabel, locale)}
                  </p>
                )}
              </div>

              {/* Sub links */}
              <nav className="flex-1 overflow-y-auto px-6 py-2">
                <ul className="flex flex-col gap-1">
                  {(mobileSubItem.children ?? []).map((sub: SubItem, i: number) => {
                    const subHref = resolveHref(sub.link?.slug, sub.externalUrl);
                    const subLabel = resolveText(sub.text, locale);
                    const subDesc = resolveText(sub.description, locale);
                    return (
                      <li key={i}>
                        <Link
                          href={subHref}
                          onClick={toggleMobileMenu}
                          className="flex flex-col py-4 border-b border-foreground/8 hover:pl-2 transition-all"
                        >
                          <span className="family-oswald uppercase tracking-widest text-lg text-foreground hover:text-gold transition-colors">
                            {subLabel}
                          </span>
                          {subDesc && (
                            <span className="text-sm text-foreground/50 mt-0.5">
                              {subDesc}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom image */}
              {mobileSubItem.megamenuImage && (
                <div className="px-6 pb-6 mt-auto">
                  <div className="relative h-64 w-full shrink-0">
                    <Image
                      src={urlFor(mobileSubItem.megamenuImage).width(600).height(400).url()}
                      alt={(mobileSubItem.megamenuImage as { alt?: string }).alt ?? resolveText(mobileSubItem.text, locale)}
                      fill
                      className="object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}