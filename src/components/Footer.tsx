/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, ChevronRight, Check } from 'lucide-react';
import { ActivePage, Language } from '../types';
import { DICTIONARY } from '../data';

interface FooterProps {
  onPageChange: (page: ActivePage) => void;
  language: Language;
  darkMode: boolean;
}

export default function Footer({ onPageChange, language, darkMode }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const dict = DICTIONARY[language];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError(language === 'EN' ? 'Email is required' : language === 'FR' ? 'E-mail requis' : 'L\'email è richiesto');
      return;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setError(language === 'EN' ? 'Invalid email format' : language === 'FR' ? 'Format d\'e-mail invalide' : 'Formato email non valido');
      return;
    }

    setSubscribed(true);
    setEmail('');
  };

  const menuLinks: { id: ActivePage; labelKey: string }[] = [
    { id: 'home', labelKey: 'homeTitle' },
    { id: 'about', labelKey: 'aboutTitle' },
    { id: 'menu', labelKey: 'menuTitle' },
    { id: 'gallery', labelKey: 'galleryTitle' },
    { id: 'reservations', labelKey: 'reservationTitle' },
    { id: 'contact', labelKey: 'contactTitle' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className={`border-t transition-all duration-300 ${
        darkMode
          ? 'bg-[#0a0a0a] border-white/5 text-white/70'
          : 'bg-cream border-charcoal/5 text-charcoal/70'
      }`}
    >
      {/* Top section: Newsletter & Social links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 border-b pb-12" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}>
          
          {/* Column 1: Brand Pitch & Socials */}
          <div className="space-y-6">
            <div>
              <span className="font-serif text-3xl font-semibold tracking-widest text-gold block">
                AURELIA
              </span>
              <span className="text-[9px] tracking-[0.4em] font-sans font-medium uppercase block mt-1" style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
                dining
              </span>
            </div>
            <p className="font-sans text-sm leading-relaxed max-w-xs">
              {language === 'EN'
                ? 'Elevating modern dining through meticulous craft, refined gold vibes, and artisanal contemporary plates.'
                : language === 'FR'
                ? 'Élever la gastronomie par un artisanat méticuleux, des accents dorés et des assiettes contemporaines.'
                : 'Eleviamo l\'esperienza gastronomica attraverso la precisione artigianale, accenti dorati e ingredienti freschi.'}
            </p>
            {/* Social channels */}
            <div className="flex space-x-3.5 pt-2">
              {[
                { icon: <Instagram className="h-4 w-4" />, link: 'https://instagram.com/aureliadining' },
                { icon: <Facebook className="h-4 w-4" />, link: 'https://facebook.com/aureliadining' },
                { icon: <Youtube className="h-4 w-4" />, link: 'https://youtube.com/aureliadining' }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border rounded-full transition-all duration-300 hover:text-gold hover:border-gold cursor-pointer"
                  style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)' }}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Map */}
          <div>
            <h4 className="font-serif text-lg tracking-wide mb-6 font-medium" style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
              {language === 'EN' ? 'Navigation' : language === 'FR' ? 'Navigation' : 'Navigazione'}
            </h4>
            <ul className="space-y-3">
              {menuLinks.map((lnk) => (
                <li key={lnk.id}>
                  <button
                    onClick={() => onPageChange(lnk.id)}
                    className="flex items-center space-x-1.5 text-sm uppercase tracking-widest hover:text-gold transition-colors cursor-pointer text-left"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-gold/60" />
                    <span>{dict[lnk.labelKey] || lnk.id}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contacts & Opening Schedules */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg tracking-wide mb-6 font-medium" style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
              {language === 'EN' ? 'Concierge' : language === 'FR' ? 'Conciergerie' : 'Portineria'}
            </h4>
            
            <div className="flex items-start space-x-3.5 text-sm">
              <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold block" style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>42 Rue de la Paix</p>
                <p className="text-xs">75002 Paris, France</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 text-sm">
              <Phone className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold block" style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>+33 1 42 68 53 --</p>
                <p className="text-xs">{language === 'EN' ? 'Dinner only' : language === 'FR' ? 'Dîner uniquement' : 'Solo cena'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 text-sm pt-2">
              <div className="w-full">
                <p className="font-semibold text-xs uppercase tracking-widest text-gold mb-1.5">
                  {dict.openingHours}
                </p>
                <p className="text-xs">Tue – Sat: 5:30 PM — 11:00 PM</p>
                <p className="text-xs opacity-60">Sun – Mon: Closed / Private Bookings</p>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter Chronicles */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg tracking-wide mb-3 font-medium" style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
              {dict.newsletterTitle}
            </h4>
            <p className="text-xs font-sans max-w-sm leading-relaxed mb-4">
              {language === 'EN'
                ? 'Join our circle of connoisseurs to receive exclusive tasting menus, seasonal invitations, and culinary diaries.'
                : language === 'FR'
                ? 'Rejoignez notre cercle de connaisseurs pour recevoir nos menus de dégustation exclusifs et nos invitations.'
                : 'Iscriviti al nostro circolo per ricevere menu degustazione esclusivi, inviti e novità.'}
            </p>

            {subscribed ? (
              <div className="rounded border border-gold bg-gold/10 p-4 text-sm flex items-start space-x-3 text-gold">
                <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p>{dict.newsletterSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-2 border rounded-md p-1 bg-black/25" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.newsletterPlaceholder}
                    className="bg-transparent font-sans text-xs flex-1 outline-none px-2 py-2 placeholder:opacity-50 text-white"
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    className="bg-gold text-charcoal text-xs font-medium uppercase font-sans tracking-widest px-4 py-2 hover:bg-[#b59830] hover:text-white rounded-sm transition-colors cursor-pointer flex items-center"
                  >
                    <span>{dict.newsletterBtn}</span>
                    <Mail className="h-3 w-3 ml-1" />
                  </button>
                </div>
                {error && <p className="text-xs text-red-500 font-medium pl-1">{error}</p>}
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright & micro agency credit */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs tracking-wider font-sans uppercase opacity-60">
          <p>© {currentYear} Aurelia Dining. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">
            {language === 'EN' ? 'Designed by Archon' : language === 'FR' ? 'Créé par Vesper Agency' : 'Progettato da Vesper Agency'}
          </p>
        </div>
      </div>
    </footer>
  );
}
