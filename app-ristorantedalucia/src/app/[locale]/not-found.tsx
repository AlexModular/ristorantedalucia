'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function NotFound() {
  const params = useParams();
  const locale = (params?.locale as string) || 'it';

  const content = {
    it: {
      title: '404',
      subtitle: 'Pagina Non Trovata',
      description: 'Spiacenti, la pagina che stai cercando non esiste o è stata spostata.',
      button: 'Torna alla Home',
    },
    en: {
      title: '404',
      subtitle: 'Page Not Found',
      description: 'Sorry, the page you are looking for does not exist or has been moved.',
      button: 'Back to Home',
    },
  };

  const t = content[locale as 'it' | 'en'] || content.it;

  return (
    <main className="relative min-h-[70vh] flex items-center justify-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Titolo di grande impatto visivo */}
        <h1 className="family-playfair text-[100px] md:text-[150px] font-extrabold text-gold leading-none tracking-tighter select-none animate-pulse">
          {t.title}
        </h1>
        
        {/* Sottotitolo elegante */}
        <h2 className="mt-4 family-playfair text-2xl md:text-3xl font-semibold tracking-tight text-foreground uppercase">
          {t.subtitle}
        </h2>
        
        {/* Descrizione descrittiva */}
        <p className="mt-6 text-base leading-7 text-foreground/70 max-w-md mx-auto">
          {t.description}
        </p>
        
        {/* Bottone premium in linea con l'estetica del sito */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={`/${locale}`}
            className="family-oswald inline-block uppercase tracking-widest bg-gold text-background hover:bg-foreground hover:text-background font-bold text-sm px-8 py-4 transition-all duration-300 shadow-lg border border-gold"
          >
            {t.button}
          </Link>
        </div>
      </div>
    </main>
  );
}
