/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Compass, Landmark, Flame, UserCheck, Star, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY, TEAM, AWARDS, TIMELINE } from '../data';

interface AboutViewProps {
  language: Language;
  darkMode: boolean;
}

export default function AboutView({ language, darkMode }: AboutViewProps) {
  const dict = DICTIONARY[language];

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="relative h-[45vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=1600&q=80"
            alt="Aurelia Philosophy background"
            className="w-full h-full object-cover opacity-50 saturate-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold block mb-2">
              {dict.aboutTitle}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wide">
              {language === 'EN'
                ? 'Our Legacy & Vision'
                : language === 'FR'
                ? 'Notre Héritage & Vision'
                : 'La Nostra Storia'}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 1. RESTAURANT STORY & PHILOSOPHY */}
      <section
        className={`py-24 transition-colors duration-300 ${
          darkMode ? 'bg-[#111111] text-white' : 'bg-white text-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Story text */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-bold block">
                  {language === 'EN' ? 'THE ANTHOLOGY' : language === 'FR' ? 'L\'HISTOIRE' : 'L\'ANTOLOGIA'}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
                  Where Heritage Meets Avant-Garde Chemistry
                </h2>
              </div>
              
              <p className="font-sans text-sm sm:text-base opacity-85 leading-relaxed font-light" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                {language === 'EN'
                  ? 'Aurelia Dining arose from a pure desire to bypass traditional fine-dining overstructures and speak with pure material clarity. We do not use overly complicated gel-emulsifiers or artificial chemical synthesizers. Instead, we isolate the native core sugars, salts, and juices of beautiful organic life and lift them with classical copper pot reductions.'
                  : language === 'FR'
                  ? 'Aurelia Dining est née de la volonté d\'éviter les superstructures de la haute gastronomie pour s\'adresser directement à la matière. Nous n\'utilisons pas de gélifiants complexes ni de colorants artificiels. Nous isolons les sucres, sels et jus natifs d\'un produit biologique exceptionnel.'
                  : 'Aurelia Dining nasce dal desiderio puro di superare le sovrastrutture del fine dining e parlare con essenzialità. Non impieghiamo emulsionanti o stabilizzanti artificiali. Al contrario, concentriamo i carboidrati, i sali naturali e i nettari di ingredienti coltivati biologicamente.'}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gold">
                    <Landmark className="h-4 w-4" />
                    <span className="font-serif text-sm font-semibold uppercase tracking-wider">Historical Venue</span>
                  </div>
                  <p className="text-xs opacity-70">Restored 1920s bank vault boasting beautiful concrete walls and gilded ceiling crowns.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gold">
                    <Flame className="h-4 w-4" />
                    <span className="font-serif text-sm font-semibold uppercase tracking-wider">Artisanal Hearth</span>
                  </div>
                  <p className="text-xs opacity-70">A custom built brick stove and specialized oak-wood grids designed for high heat cooking.</p>
                </div>
              </div>
            </div>

            {/* Philosophy Visual Display */}
            <div className="relative group">
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-gold/30 to-transparent blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}>
                <img
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80"
                  alt="Kitchen plating setup"
                  className="w-full h-full object-cover saturate-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE CULINARY LEAD / MEET THE CHEF */}
      <section
        className={`py-24 transition-colors duration-300 border-t ${
          darkMode ? 'bg-black text-white border-white/5' : 'bg-[#faf9f6] text-charcoal border-charcoal/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Chef portrait */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-1 bg-gold/15 rounded-2xl blur-md" />
              <div className="relative rounded-2xl overflow-hidden border shadow-xl aspect-[3/4]" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.1)' }}>
                <img
                  src="/src/assets/images/chef_alain_ducasse_1780111327456.png"
                  alt="Executive Chef Alain Ducasse close-up"
                  className="w-full h-full object-cover saturate-100 hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-40" />
                <div className="absolute bottom-6 left-6 text-white pb-1 border-b border-gold/70 pr-4">
                  <p className="font-serif text-2xl font-semibold">Chef Alain Ducasse</p>
                  <p className="text-xs uppercase tracking-widest text-gold mt-1">Founding Culinary Director</p>
                </div>
              </div>
            </div>

            {/* Chef details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-bold block mb-1">
                {dict.chefTitle}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight">
                "Gastronomy is a Silent dialogue."
              </h2>
              <p className="italic font-serif text-base pb-3" style={{ color: darkMode ? '#e5e7eb' : '#374151' }}>
                "Great cooking is not about complicated designs; it's about letting the raw soul of premium ingredients speak with clarity and elegance. Our tables are formatted to inspire authentic conversational peace."
              </p>
              <div className="space-y-4 font-sans text-xs sm:text-sm opacity-80" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                <p>
                  Chef Alain Ducasse has spent decades guiding legendary culinary labs across Paris, Monaco, and London. His philosophy revolves around natural, high-impact seasonal ingredients. Each week, he establishes custom flavor balances to adjust acidity, salinity, and sweetness offsets to synchronize correctly with our master wine cellar.
                </p>
                <p>
                  Under his visionary direction, Aurelia Dining matured from a high-concept tasting environment into one of Europe's premier, celebrated gastronomy hubs, earning double Michelin Star citations.
                </p>
              </div>

              {/* Accolades checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  'Bocuse d\'or Finalist',
                  'Michelin Young Chef',
                  'Escoffier Medal Holder'
                ].map((crit, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs uppercase tracking-wider text-gold font-sans font-medium">
                    <UserCheck className="h-4 w-4 bg-gold/10 p-0.5 rounded-full" />
                    <span>{crit}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. OUR BRIGADE TEAM MEMBERS */}
      <section
        className={`py-24 transition-colors duration-300 ${
          darkMode ? 'bg-[#111111] text-white' : 'bg-white text-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-bold block">
              THE ARTISANS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
              Meet Our Culinary Brigade
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-xl overflow-hidden border flex flex-col justify-between"
                style={{
                  backgroundColor: darkMode ? '#161616' : '#faf9f6',
                  borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)',
                }}
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 saturate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-serif text-lg font-medium leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-gold font-sans font-bold mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-sans text-xs sm:text-sm opacity-70 leading-relaxed text-[#d1d5db]" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. AWARDS SECTION */}
      <section
        className={`py-24 transition-colors duration-300 border-t border-b ${
          darkMode ? 'bg-black text-white border-white/5' : 'bg-cream text-charcoal border-charcoal/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-bold block text-gold">
              CITATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
              Awards & Global Achievements
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AWARDS.map((award, idx) => (
              <div
                key={award.id}
                className="p-8 border rounded-xl flex flex-col justify-between space-y-6"
                style={{
                  backgroundColor: darkMode ? '#111111' : '#ffffff',
                  borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)'
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-widest text-gold font-semibold bg-gold/10 px-2 py-1 rounded">
                      {award.year}
                    </span>
                    <Trophy className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-medium tracking-wide">
                    {award.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm opacity-75 leading-relaxed" style={{ color: darkMode ? '#d1d5db' : '#555555' }}>
                    {award.description}
                  </p>
                </div>
                <div className="border-t pt-4 text-[10px] uppercase tracking-widest text-gold font-sans font-bold flex items-center space-x-1.5 opacity-80" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                  <Sparkles className="h-3 w-3" />
                  <span>{award.institution}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. HISTORY TIMELINE SECTION */}
      <section
        className={`py-24 transition-colors duration-300 ${
          darkMode ? 'bg-[#111111] text-white' : 'bg-white text-charcoal'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-bold block">
              CHRONOLOGY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
              An Architectural Timeline
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-2" />
          </div>

          <div className="relative border-l border-gold/40 space-y-12 pl-6 sm:pl-10">
            {TIMELINE.map((mile, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Year indicator left pin */}
                <span className="absolute -left-[35px] sm:-left-[51px] top-1.5 flex items-center justify-center p-1 rounded-full bg-[#111111] border-2 border-gold h-5 w-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                
                <span className="font-sans text-sm font-bold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded">
                  {mile.year}
                </span>

                <h3 className="font-serif text-xl font-medium tracking-wide mt-3 mb-2">
                  {mile.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm opacity-70 leading-relaxed max-w-2xl" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                  {mile.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
