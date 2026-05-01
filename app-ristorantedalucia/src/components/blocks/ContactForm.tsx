'use client'

import Link from 'next/link';
import { FormEvent } from 'react'
import { Form } from '../../../sanity.types';
import AOSComponent from '../AOS';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useCallback } from 'react';
import { useReCaptcha } from "next-recaptcha-v3";

export default function ContactForm(params: {item: Form}) {
  const { item } = params;
  const [disabled, setDisabled] = useState(false);
  const { executeRecaptcha } = useReCaptcha(process.env.NEXT_RECAPTCHA_SITE_KEY || '');
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const token = await executeRecaptcha('contact');
      formData.append("recaptchaToken", token);
      console.log('formData', formData);
      try {
        setDisabled(true)
        const response = await fetch('/api/contact', {
          method: 'post',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        await response.json();
        toast.success('Comunicazione inviata con successo!', {
          position: 'bottom-center'
        });
      } catch (err) {
        console.error(err);
        toast.error('C\'è stato un errore durante l\invio del tuo messagio. ti preghiamo di riprovare o di contattarci telefonicamente.', {
          position: 'bottom-center'
        });
        setDisabled(false);
      }
    }, [executeRecaptcha, setDisabled]
  );

  return (
    <AOSComponent>
      <Toaster/>
      <section className="contact-form">    
        <h3 className="subtitle text-center px-5 sm:px-10 2xl:px-0" data-aos="fade-left">{item.heading}</h3>
        <form onSubmit={handleSubmit} className="contact-form min-[468px]:grid grid-cols-2 gap-12 max-[1024px]:gap-2 pb-12 px-5 sm:px-10 2xl:px-0" data-aos="fade-left">
          <label className="block">
            <span className="text-black uppercase">Nome <span className="required text-gold">*</span></span>
            <input type="text" name='name' required className="mt-0 block w-full px-0.5 text-black bg-background border-0 border-b-2 border-black focus:ring-0 focus:border-gold" placeholder="Il tuo nome" />
          </label>
          <label className="block">
            <span className="text-black uppercase">Cognome <span className="required text-gold">*</span></span>
            <input type="text" name='lastname' required className="mt-0 block w-full px-0.5 text-black bg-background border-0 border-b-2 border-black focus:ring-0 focus:border-gold" placeholder="Il tuo cognome" />
          </label>
          <label className="block">
            <span className="text-black uppercase">Email <span className="required text-gold">*</span></span>
            <input type="email" name='email' required className="mt-0 block w-full px-0.5 text-black bg-background border-0 border-b-2 border-black focus:ring-0 focus:border-gold" placeholder="Il tuo indirizzo email" />
          </label>
          <label className="block">
            <span className="text-black uppercase">Telefono</span>
            <input type="tel" name='tel' className="mt-0 block w-full px-0.5 text-black bg-background border-0 border-b-2 border-black focus:ring-0 focus:border-gold" placeholder="Il tuo numero di telefono" />
          </label>
          <label className="block col-span-2">
            <span className="text-black uppercase">Il tuo messaggio <span className="required text-gold">*</span></span>
            <textarea name='message' className="mt-0 block w-full px-0.5 border-0 border-b-2 text-black bg-background border-black focus:ring-0 focus:border-gold" placeholder="Il tuo messaggio" rows={2}></textarea>
          </label>
          <label className="block col-span-2">
            <div className="mt-2">
              <div>
                  <label className="inline-flex items-center">
                  <input type="checkbox" className="border-gold border-2 text-gold focus:border-gold-300 focus:ring-gold bg-transparent" />
                  <span className="ml-2 checkbox">Confermo la lettura dell&apos;<Link href={'#'} target='_blank'>informativa sulla privacy</Link> e acconsento al trattamento dei miei dati personali. <span className="required text-gold checkbox">*</span></span>
                  </label>
              </div>
            </div>
          </label>
          <div className="col-span-2 flex justify-center">
            <button type="submit" className="cta-btn" disabled={disabled}>
                Invia Messaggio
            </button>
          </div>
        </form>
      </section>
    </AOSComponent>
  )
}