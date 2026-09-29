'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function BookingModal() {
  const t = useTranslations('BookingModal');
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      // Piccola pausa per permettere al DOM di aggiornarsi prima di avviare l'animazione
      setTimeout(() => setIsAnimating(true), 10);
    };
    
    window.addEventListener('open-booking', handleOpen);
    return () => window.removeEventListener('open-booking', handleOpen);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300); // Aspetta la fine della transizione
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const iframe = document.getElementById("pns-form") as HTMLIFrameElement;
      if (!iframe || e.source !== iframe.contentWindow) return;
      const data = e.data;
      if (!data || data.type !== "pns-iframe-height") return;
      const h = Math.ceil(Number(data.height) || 0);
      if (h > 0) iframe.style.height = h + "px";
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-start md:items-center justify-center p-4 pt-12 md:p-8 transition-all duration-300 ease-out ${isAnimating ? 'opacity-100 bg-black/70 backdrop-blur-sm' : 'opacity-0 bg-black/0 backdrop-blur-none'}`}
    >
      <div 
        className={`w-full max-w-4xl max-h-full bg-background shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border-t-4 border-gold transition-all duration-500 ease-out transform ${isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}
      >
        {/* Header bar premium */}
        <div className="flex justify-between items-center px-6 py-5 md:px-8 md:py-6 border-b border-foreground/10 bg-foreground/[0.02]">
          <div>
            <h2 className="family-playfair text-xl md:text-4xl text-foreground mb-1">
              {t('title')}
            </h2>
            <p className="family-montserrat text-sm md:text-base text-foreground/60">
              {t('subtitle')}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 -mr-2 text-foreground/60 hover:text-foreground transition-colors shrink-0 self-start"
            aria-label={t('close')}
          >
            <X size={26} strokeWidth={1.5} />
          </button>
        </div>
        
        {/* Iframe container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-background">
          <iframe
            id="pns-form"
            src="https://forms.pienissimo.pro/?hashform=3aggbzvnr7ws6219fq9obiqyvc0nfejz&id=Fl7E3J"
            title="Prenota"
            className="w-full min-h-[700px] border-0 block"
          />
        </div>
      </div>
    </div>
  );
}
