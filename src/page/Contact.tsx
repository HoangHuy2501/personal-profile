'use client';

import { motion, MotionConfig } from 'motion/react';
import { ArrowDownRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../hook/useLanguage';
import CardContact from '../components/contact/CardContact';
import FeedbackSection from '../components/feedback/FeedbackSection';
import { localizedPath, localeFromPath } from '../lib/locale';

function Contact() {
  const { t } = useLanguage();
  const locale = localeFromPath(usePathname()) || 'vi';
  const copy = t.contact;
  return (
    <MotionConfig reducedMotion="user">
      <div className="page-wrap">
        <motion.header className="page-heading contact-heading" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <p className="eyebrow mb-3">{copy.eyebrow}</p>
          <h1 className="section-title text-text-light dark:text-text-dark">{t.info.contact}</h1>
          <p className="muted mt-5 text-lg max-w-2xl">{t.info.des_contact}</p>
        </motion.header>
        <div className="section-rule mb-6 text-[#0f9f8c]"><p className="eyebrow">{copy.findOnline}</p><ArrowDownRight size={18} /></div>
        <CardContact />
        <motion.section className="contact-map mt-10" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="map-label"><MapPin size={16} /> {copy.mapLabel}</div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4587.957779044791!2d108.16558811135214!3d16.059527339632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219185d37cb4f%3A0xd208a2b0e6bc4d2d!2zODAgVMO0IEhp4buHdSwgSG_DoCBNaW5oLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1768099817292!5m2!1svi!2s" className="w-full h-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={copy.mapTitle} />
        </motion.section>
        <div className="surface mt-8 flex flex-wrap items-center justify-between gap-4 p-5">
          <div><p className="font-bold">{t.info.visitor_dashboard}</p><p className="muted text-sm mt-1">{copy.visitorDescription}</p></div>
          <Link className="mint-button" href={localizedPath('/visitor-map', locale)}>{copy.openDashboard}</Link>
        </div>
        <FeedbackSection />
      </div>
    </MotionConfig>
  );
}

export default Contact;
