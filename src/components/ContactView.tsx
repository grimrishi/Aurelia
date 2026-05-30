/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, ChevronDown, Check, Send, Sparkles, HelpCircle, Instagram, Facebook, Youtube } from 'lucide-react';
import { Language } from '../types';
import { FAQS, DICTIONARY } from '../data';

interface ContactViewProps {
  language: Language;
  darkMode: boolean;
}

export default function ContactView({ language, darkMode }: ContactViewProps) {
  const dict = DICTIONARY[language];

  // Forms state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Accordion state
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name || !email || !subject || !message) {
      setFormError(
        language === 'EN'
          ? 'Please fill in all required fields.'
          : language === 'FR'
          ? 'Veuillez remplir tous les champs requis.'
          : 'Si prega di compilare tutti i campi obbligatori.'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError(
        language === 'EN'
          ? 'Please enter a valid email address.'
          : language === 'FR'
          ? 'Veuillez entrer une adresse e-mail valide.'
          : 'Inserisci un indirizzo email valido.'
      );
      return;
    }

    setLoading(true);

    // Simulate lag
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="w-full">
      {/* Contact Header */}
      <section className="relative h-[45vh] flex items-center justify-center bg-black overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600&q=80"
            alt="The Wine vault contact background"
            className="w-full h-full object-cover opacity-50 saturate-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/95" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-gold text-xs uppercase tracking-[0.35em] font-sans font-bold block">
            CONCIERGE ACCESS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-wider">
            {dict.contactTitle}
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed font-sans">
            {language === 'EN'
              ? 'Get in touch with our booking leads, concierge services or arrange corporate dining.'
              : language === 'FR'
              ? 'Contactez notre secrétariat pour des événements exclusifs et des dégustations de groupe.'
              : 'Entra in contatto con la nostra portineria o prenota eventi aziendali esclusivi.'}
          </p>
        </div>
      </section>

      {/* Primary columns */}
      <section
        className={`py-20 transition-all duration-300 ${
          darkMode ? 'bg-[#111111] text-white' : 'bg-white text-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact details & Google Maps Column */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Address details card */}
              <div
                className="rounded-xl border p-6 space-y-6"
                style={{
                  backgroundColor: darkMode ? '#181818' : '#faf9f6',
                  borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,26,0.1)'
                }}
              >
                <h3 className="font-serif text-xl font-medium tracking-wide border-b pb-3 text-gold" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}>
                  Aurelia Coordinates
                </h3>

                <div className="space-y-4 font-sans text-sm">
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">{dict.address}</h4>
                      <p className="opacity-80">42 Rue de la Paix, 75002 Paris, France</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 border-t pt-4" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}>
                    <Phone className="h-4.5 w-4.5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">{dict.phone}</h4>
                      <p className="opacity-80">+33 1 42 68 53 --</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 border-t pt-4" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}>
                    <Mail className="h-4.5 w-4.5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">{dict.email}</h4>
                      <p className="opacity-80">concierge@aureliadining.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 border-t pt-4" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}>
                    <div className="w-full">
                      <h4 className="font-bold text-gold uppercase tracking-wider text-xs mb-1.5">{dict.openingHours}</h4>
                      <p className="text-xs">Tue – Sat: 5:30 PM — 11:00 PM</p>
                      <p className="text-xs opacity-60">Sun – Mon: Private booking allocations</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Styled Interactive Google Map placeholder */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-64 border" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.1)' }}>
                {/* Simulated Dark Mode styled map */}
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                  alt="Stylized map backdrop"
                  className="w-full h-full object-cover opacity-50 saturate-50"
                  referrerPolicy="no-referrer"
                />
                
                {/* Absolute overlay pin details */}
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                  <div className="p-3 bg-gold text-[#111111] rounded-full animate-bounce">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-medium tracking-wide">Aurelia Dining Salon</p>
                    <p className="text-[11px] font-mono opacity-80 text-gold-light mt-0.5">48.869408 N, 2.330456 E</p>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-widest font-sans font-bold bg-gold text-charcoal px-4 py-2 hover:bg-gold-hover transition-colors rounded-sm cursor-pointer"
                  >
                    Open with Google Maps
                  </a>
                </div>
              </div>

            </div>

            {/* General Contact Inquiry Form Column */}
            <div className="lg:col-span-7">
              
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 border rounded-xl text-center space-y-4"
                  style={{
                    backgroundColor: darkMode ? '#181818' : '#ffffff',
                    borderColor: '#D4AF37'
                  }}
                >
                  <div className="flex justify-center text-[#22C55E]">
                    <Check className="h-12 w-12 bg-[#22C55E]/10 p-2.5 rounded-full" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-gold">Inquiry Sent Successfully</h3>
                  <p className="font-sans text-sm opacity-80 max-w-md mx-auto leading-relaxed" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                    Thank you for writing. Our reservation curators will review your specifications and contact your team within 12 business hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-2 text-xs uppercase tracking-widest font-sans font-bold text-gold border-b pb-0.5 border-gold cursor-pointer"
                  >
                    Write another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-6">
                  
                  <div className="space-y-2">
                    <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-semibold block">
                      WRITE TO THE CONCIERGE
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight">
                      Corporate Events & Special Inquiries
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider font-sans font-bold block opacity-75" htmlFor="contact-name">Your Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Marc DuPont"
                        className="w-full px-4 py-3 text-sm font-sans rounded-md border outline-none font-medium"
                        style={{
                          backgroundColor: darkMode ? '#181818' : '#ffffff',
                          borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)',
                          color: darkMode ? '#ffffff' : '#1a1a1a',
                        }}
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider font-sans font-bold block opacity-75" htmlFor="contact-email">Email Address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marc@example.com"
                        className="w-full px-4 py-3 text-sm font-sans rounded-md border outline-none font-medium"
                        style={{
                          backgroundColor: darkMode ? '#181818' : '#ffffff',
                          borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)',
                          color: darkMode ? '#ffffff' : '#1a1a1a',
                        }}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-sans font-bold block opacity-75" htmlFor="contact-subject">Topic / Subject *</label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Exclusive Lounge Hiring proposal"
                      className="w-full px-4 py-3 text-sm font-sans rounded-md border outline-none font-medium"
                      style={{
                        backgroundColor: darkMode ? '#181818' : '#ffffff',
                        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)',
                        color: darkMode ? '#ffffff' : '#1a1a1a',
                      }}
                    />
                  </div>

                  {/* Message body */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-sans font-bold block opacity-75" htmlFor="contact-message">Your Message *</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Include details about your planning schedule, approximate numbers, and budget guides..."
                      className="w-full px-4 py-3 text-sm font-sans rounded-md border outline-none font-medium text-white"
                      style={{
                        backgroundColor: darkMode ? '#181818' : '#ffffff',
                        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)',
                        color: darkMode ? '#ffffff' : '#1a1a1a',
                      }}
                    />
                  </div>

                  {formError && (
                    <p className="text-xs text-red-500 font-semibold">{formError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4.5 bg-gold text-[#111111] font-sans font-medium text-xs uppercase tracking-widest hover:bg-gold-hover hover:text-white rounded-sm transition-colors cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Proposal</span>
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>

          </div>

          {/* 4. INTENSE FAQ ACCORDION SECTION */}
          <div className="mt-28 border-t pt-20" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,26,0.06)' }}>
            
            <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-bold block">
                INFORMATION DEPOT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
                Frequently Asked Inquiries
              </h2>
              <div className="w-12 h-[2px] bg-gold mx-auto" />
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {FAQS.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border rounded-xl overflow-hidden transition-all duration-300"
                    style={{
                      backgroundColor: darkMode ? '#181818' : '#ffffff',
                      borderColor: isExpanded ? '#D4AF37' : darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.08)',
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-5 text-left font-serif text-base font-medium flex items-center justify-between gap-4 cursor-pointer text-white"
                      style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}
                      aria-expanded={isExpanded}
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="h-4.5 w-4.5 text-gold flex-shrink-0" />
                        <span>{faq.question}</span>
                      </span>
                      <ChevronDown
                        className={`h-4.5 w-4.5 text-gold transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            className="px-6 pb-6 pt-1 font-sans text-xs sm:text-sm opacity-80 leading-relaxed border-t"
                            style={{
                              borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)',
                              color: darkMode ? '#d1d5db' : '#4b5563',
                            }}
                          >
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
