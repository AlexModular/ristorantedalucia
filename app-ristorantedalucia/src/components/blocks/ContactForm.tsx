'use client'

import { TransformedForm } from "../../../sanity.types.custom";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import AOSComponent from "../AOS";
import { useTranslations } from "next-intl";
import { useReCaptcha } from "next-recaptcha-v3";

type FormData = {
  name: string;
  lastname: string;
  email: string;
  tel: string;
  message: string;
};

export default function ContactForm({item}: {item: TransformedForm}) {
  const t = useTranslations('Contact');
  const { executeRecaptcha } = useReCaptcha();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const token = await executeRecaptcha("form_submit");
      
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      formData.append('recaptchaToken', token);

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success(t('successMessage'));
        reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      toast.error(t('errorMessage'));
    }
  };

  return (
    <AOSComponent>
      <section className="contact-form-section py-10 md:py-20 box" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4">
          {item.heading && (<h2 className="family-playfair text-center mb-12">{item.heading}</h2>)}
          
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-sm font-bold uppercase tracking-widest text-gold mb-2">{t('name')}</label>
              <input 
                {...register("name", { required: true })}
                className="w-full bg-background border-b-2 border-gold/30 py-3 px-4 focus:border-gold transition-colors outline-none"
              />
              {errors.name && <span className="text-red-500 text-xs mt-1">{t('required')}</span>}
            </div>

            <div className="form-group">
              <label className="block text-sm font-bold uppercase tracking-widest text-gold mb-2">{t('lastname')}</label>
              <input 
                {...register("lastname", { required: true })}
                className="w-full bg-background border-b-2 border-gold/30 py-3 px-4 focus:border-gold transition-colors outline-none"
              />
              {errors.lastname && <span className="text-red-500 text-xs mt-1">{t('required')}</span>}
            </div>

            <div className="form-group">
              <label className="block text-sm font-bold uppercase tracking-widest text-gold mb-2">{t('email')}</label>
              <input 
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                className="w-full bg-background border-b-2 border-gold/30 py-3 px-4 focus:border-gold transition-colors outline-none"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{t('invalidEmail')}</span>}
            </div>

            <div className="form-group">
              <label className="block text-sm font-bold uppercase tracking-widest text-gold mb-2">{t('tel')}</label>
              <input 
                {...register("tel")}
                className="w-full bg-background border-b-2 border-gold/30 py-3 px-4 focus:border-gold transition-colors outline-none"
              />
            </div>

            <div className="form-group md:col-span-2">
              <label className="block text-sm font-bold uppercase tracking-widest text-gold mb-2">{t('message')}</label>
              <textarea 
                {...register("message", { required: true })}
                rows={5}
                className="w-full bg-background border-b-2 border-gold/30 py-3 px-4 focus:border-gold transition-colors outline-none resize-none"
              />
              {errors.message && <span className="text-red-500 text-xs mt-1">{t('required')}</span>}
            </div>

            <div className="md:col-span-2 text-center mt-6">
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`bg-gold text-white px-12 py-4 uppercase family-oswald tracking-widest transition-all hover:bg-foreground disabled:opacity-50`}
              >
                {isSubmitting ? t('sending') : t('send')}
              </button>
            </div>
          </form>
        </div>
      </section>
    </AOSComponent>
  )
}