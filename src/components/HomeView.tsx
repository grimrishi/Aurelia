/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, Compass, Sparkles, ShieldCheck, Heart, ArrowRight, ArrowLeft, Star, Quote, Calendar, Users, Clock, ChevronRight } from 'lucide-react';
import { ActivePage, Language, Dish, Testimonial, GalleryItem } from '../types';
import { DICTIONARY, STATISTICS, DISHES, TESTIMONIALS, GALLERY } from '../data';

interface HomeViewProps {
  onPageChange: (page: ActivePage) => void;
  language: Language;
  darkMode: boolean;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
}

// Custom Micro Counter component for statistics animation
function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string, key?: React.Key }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 4.9) {
      // Decimal rating counter
      let curr = 0;
      const interval = setInterval(() => {
        curr += 0.1;
        if (curr >= 4.9) {
          setCount(4.9);
          clearInterval(interval);
        } else {
          setCount(parseFloat(curr.toFixed(1)));
        }
      }, 35);
      return () => clearInterval(interval);
    }

    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / end), 15);
    const increment = Math.ceil(end / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center p-6 border border-white/5 rounded-xl bg-black/40 backdrop-blur-sm hover:border-gold/30 transition-all duration-300">
      <div className="font-serif text-3xl lg:text-5xl font-semibold text-gold tracking-tighter mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-widest font-sans opacity-70 text-white leading-relaxed">
        {label}
      </div>
    </div>
  );
}

export default function HomeView({
  onPageChange,
  language,
  darkMode,
  onToggleFavorite,
  favorites,
}: HomeViewProps) {
  const [activeReviewId, setActiveReviewId] = useState(0);
  const dict = DICTIONARY[language];

  // Auto-play reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewId((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevReview = () => {
    setActiveReviewId((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNextReview = () => {
    setActiveReviewId((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  // Get 6 featured dishes
  const featuredDishes = DISHES.filter((dish) => dish.popular || dish.chefRecommended).slice(0, 6);

  // Get 4 items for gallery preview
  const galleryPreview = GALLERY.slice(0, 4);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section
        id="home-hero"
        className="relative h-screen flex items-center justify-center bg-black overflow-hidden"
      >
        {/* Parallax Image Mask */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
            alt="Aurelia Dining Ambiance"
            className="w-full h-full object-cover opacity-55 saturate-75 scale-105 animate-[zoom_60s_infinite_alternate]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Elegant luxury chip */}
            <div className="inline-flex items-center space-x-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1">
              <Sparkles className="h-3 w-3 text-gold" style={{ filter: 'drop-shadow(0 0 2px #d4af37)' }} />
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-gold font-medium">
                {language === 'EN' ? 'Michelin Recommended Dual-Star' : language === 'FR' ? 'Recommandé Guide Michelin' : 'Consigliato Guida Michelin'}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-wide leading-tight max-w-4xl mx-auto drop-shadow-md">
              {dict.heroTitle}
            </h1>

            <p className="font-sans text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              {dict.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onPageChange('reservations')}
                className="w-full sm:w-auto bg-gold border border-gold text-[#111111] font-sans font-medium text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-sm hover:bg-[#b59830] hover:border-[#b59830] hover:text-white transition-all duration-300 shadow-xl cursor-pointer"
              >
                {dict.reserveBtn}
              </button>
              <button
                onClick={() => onPageChange('menu')}
                className="w-full sm:w-auto border border-white/60 text-white font-sans font-medium text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-sm hover:bg-white hover:text-charcoal transition-all duration-300 backdrop-blur-sm cursor-pointer"
              >
                {dict.viewMenuBtn}
              </button>
            </div>
          </motion.div>
        </div>


      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section
        id="about-preview"
        className={`py-24 transition-colors duration-300 ${
          darkMode ? 'bg-[#111111] text-white' : 'bg-white text-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Story bio */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-medium block">
                {dict.aboutTitle}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight leading-tight">
                {language === 'EN'
                  ? 'Crafting Gastronomy Chapters Since 2011'
                  : language === 'FR'
                  ? 'Écrire de grands chapitres gustatifs depuis 2011'
                  : 'Scriviamo capitoli di gusto dal 2011'}
              </h2>
              <p className="font-sans text-base leading-relaxed opacity-80" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                {language === 'EN'
                  ? 'For nearly fifteen years, Aurelia Dining has occupied the historic limits of Paris, transforming traditional culinary methods into breathtaking modern presentations. Driven by Master Chef Alain Ducasse, we source rare handpicked ingredients weekly to construct memories.'
                  : language === 'FR'
                  ? 'Depuis près de quinze ans, Aurelia Dining occupe le site historique de Paris, transformant les méthodes traditionnelles en présentations modernes à couper le souffle. Dirigés par le chef cuisinier Alain Ducasse, nous nous approvisionnons chaque semaine en ingrédients rares.'
                  : 'Da quasi quindici anni, Aurelia Dining occupa lo storico centro della città, trasformando la cucina tradizionale in moderne composizioni. Sotto la guida dello chef Alain Ducasse, ricerchiamo ingredienti freschissimi.'}
              </p>

              {/* Chef Bio block quote */}
              <div className="border-l-2 border-gold pl-6 py-2 my-4 bg-gold/5 rounded-r-md">
                <p className="italic font-serif text-base max-w-xl opacity-90 leading-relaxed text-gold">
                  "{dict.chefPhilosophy}"
                </p>
                <p className="text-xs font-sans uppercase tracking-widest text-gold font-medium mt-3">
                  — Chef Alain Ducasse
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onPageChange('about')}
                  className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-bold hover:text-gold transition-colors cursor-pointer border-b pb-1 ${
                    darkMode ? 'border-white/20 hover:border-gold' : 'border-charcoal/20 hover:border-gold'
                  }`}
                >
                  <span>{dict.learnMoreBtn}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Micro counters statistics - Side column */}
            <div className="lg:col-span-5 bg-gradient-to-tr from-[#161616] to-[#202020] rounded-2xl p-8 border border-white/5 space-y-6 text-white shadow-2xl relative">
              <div className="absolute -top-4 -right-4 bg-gold text-[#111111] p-3 rounded-full shadow-lg">
                <ChefHat className="h-6 w-6" />
              </div>
              
              <h3 className="font-serif text-xl tracking-wide font-medium text-gold mb-4 border-b border-white/10 pb-2">
                Aurelia metrics
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {STATISTICS.map((stat, idx) => (
                  <AnimatedCounter
                    key={idx}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={dict[stat.labelKey] || stat.labelKey}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED DISHES SECTION */}
      <section
        id="featured-dishes"
        className={`py-24 transition-colors duration-300 ${
          darkMode ? 'bg-black text-white' : 'bg-cream text-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b pb-6" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}>
            <div>
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-semibold block mb-2">
                {dict.featuredDishes}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight" style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
                {language === 'EN' ? 'The Art of Plates' : language === 'FR' ? 'L\'Art de l\'Assiette' : 'L\'Arte nei Piatti'}
              </h2>
            </div>
            <button
              onClick={() => onPageChange('menu')}
              className="mt-4 md:mt-0 flex items-center space-x-1.5 text-xs uppercase tracking-widest font-sans font-bold text-gold hover:text-gold-hover transition-colors cursor-pointer"
            >
              <span>{language === 'EN' ? 'Browse Full Menu' : language === 'FR' ? 'Découvrir tout le Menu' : 'Sfoglia tutto il Menu'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, idx) => {
              const isFav = favorites.includes(dish.id);
              return (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative rounded-xl overflow-hidden border transition-all duration-500 shadow-xl flex flex-col justify-between"
                  style={{
                    backgroundColor: darkMode ? '#111111' : '#ffffff',
                    borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)',
                  }}
                >
                  
                  {/* Top image wrapper */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 saturate-100 group-hover:saturate-120"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60" />
                    
                    {/* Tags overlays */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                      {dish.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[9px] font-sans font-semibold uppercase tracking-widest bg-gold text-[#111111] px-2 py-0.5 rounded-sm">
                          {t}
                        </span>
                      ))}
                      {dish.vegetarian && (
                        <span className="text-[9px] font-sans font-semibold uppercase tracking-widest bg-green-500 text-white px-2 py-0.5 rounded-sm">
                          VEG
                        </span>
                      )}
                    </div>

                    {/* Favorite click indicator */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(dish.id);
                      }}
                      className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-md bg-black/40 hover:bg-black/60 transition-colors text-white border border-white/10 cursor-pointer"
                      aria-label="Toggle Favorite"
                    >
                      <Heart className={`h-4 w-4 transition-colors ${isFav ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                    </button>

                    <div className="absolute bottom-4 left-4">
                      <span className="font-mono text-xl font-semibold text-gold font-sans">
                        ${dish.price}
                      </span>
                    </div>
                  </div>

                  {/* Body textual content */}
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-medium tracking-wide" style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
                        {dish.name}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm opacity-70 leading-relaxed line-clamp-3" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                        {dish.description}
                      </p>
                    </div>

                    {/* Micro button trigger to reservations */}
                    <div className="pt-3 border-t mt-4 flex items-center justify-between" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}>
                      <span className="text-[10px] uppercase font-mono tracking-widest opacity-50 font-sans">
                        {dish.category}
                      </span>
                      <button
                        onClick={() => onPageChange('reservations')}
                        className="text-[10px] uppercase tracking-widest font-sans font-bold text-gold flex items-center gap-1.5 group/btn cursor-pointer"
                      >
                        <span>{language === 'EN' ? 'Reserve & taste' : language === 'FR' ? 'Réserver & goûter' : 'Ordina al tavolo'}</span>
                        <ChevronRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section
        id="why-choose-us"
        className={`py-24 transition-colors duration-300 ${
          darkMode ? 'bg-[#0f0f0f] text-white' : 'bg-white text-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-sans font-bold block">
              {dict.whyChooseUs}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight">
              {language === 'EN' ? 'The Foundations of Aurelia' : language === 'FR' ? 'Les Fondements d\'Aurelia' : 'I Fondamenti di Aurelia'}
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="h-6 w-6 text-gold" />,
                title: language === 'EN' ? 'Fresh Ingredients' : language === 'FR' ? 'Ingrédients Frais' : 'Ingredienti Freschissimi',
                desc: language === 'EN'
                  ? 'We source rare, seasonal elements weekly from organic micro-farms and premium French importers.'
                  : language === 'FR'
                  ? 'Nous nous approvisionnons chaque semaine en produits frais auprès de micro-fermes locales biologiques.'
                  : 'Selezioniamo ingredienti biologici di stagione direttamente da produttori certificati.'
              },
              {
                icon: <ChefHat className="h-6 w-6 text-gold" />,
                title: language === 'EN' ? 'Expert Chefs' : language === 'FR' ? 'Chefs Expérimentés' : 'Chef Stellati',
                desc: language === 'EN'
                  ? 'Led by Chef Alain Ducasse, our brigade leverages state-of-the-art kitchen science to engineer taste.'
                  : language === 'FR'
                  ? 'Sous la direction du chef Alain Ducasse, notre brigade met à profit la science culinaire moderne.'
                  : 'Guidati dallo Chef Alain Ducasse, la nostra brigata unisce tradizione saggia e innovazione.'
              },
              {
                icon: <ShieldCheck className="h-6 w-6 text-gold" />,
                title: language === 'EN' ? 'Premium Service' : language === 'FR' ? 'Service d\'Exception' : 'Servizio Impeccabile',
                desc: language === 'EN'
                  ? 'Silent, professional, and personalized table care catering to every delicate guest preference.'
                  : language === 'FR'
                  ? 'Un service de table silencieux, méticuleux et personnalisé selon les désirs de chaque convive.'
                  : 'Un servizio attento, silenzioso e pronto a soddisfare ogni singola preferenza al tavolo.'
              },
              {
                icon: <Compass className="h-6 w-6 text-gold" />,
                title: language === 'EN' ? 'Elegant Atmosphere' : language === 'FR' ? 'Atmosphère Raffinée' : 'Atmosfera d\'Élite',
                desc: language === 'EN'
                  ? 'Beautiful custom-designed lighting, genuine golden accents, and cozy velvet premium seating.'
                  : language === 'FR'
                  ? 'Un éclairage tamisé, des finitions d\'or véritable et des booths en velours d\'une élégance rare.'
                  : 'Luci soffuse studiate da designer, dettagli in oro zecchino e divani in velluto pregiato.'
              }
            ].map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 border rounded-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center space-y-4 cursor-default group"
                style={{
                  backgroundColor: darkMode ? '#161616' : '#fcfcfa',
                  borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)'
                }}
              >
                <div className="p-4 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="font-serif text-lg font-medium tracking-wide" style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
                  {feat.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm opacity-70 leading-relaxed" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS SLIDER SECTION */}
      <section
        id="testimonials-preview"
        className="py-24 bg-[#111111] text-white overflow-hidden relative border-t border-b border-white/5"
      >
        {/* Abstract design elements to establish tone */}
        <div className="absolute top-1/4 left-10 text-white/5 font-serif text-[18rem] tracking-tighter select-none pointer-events-none">
          “
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center space-y-3 mb-12">
            <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-bold block">
              {dict.testimonialsTitle}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
              {language === 'EN' ? 'Word of Mouth Chronicles' : language === 'FR' ? 'Paroles de Convives' : 'Parole dei Nostri Ospiti'}
            </h2>
          </div>

          <div className="relative border border-white/10 rounded-2xl p-8 sm:p-12 bg-black/60 backdrop-blur-md">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 text-center"
              >
                <div className="flex justify-center text-gold space-x-1">
                  {Array.from({ length: TESTIMONIALS[activeReviewId].rating }).map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-gold text-gold" />
                  ))}
                </div>

                <p className="font-serif text-lg sm:text-xl md:text-2xl italic leading-relaxed text-white/90 font-light px-2">
                  "{TESTIMONIALS[activeReviewId].review}"
                </p>

                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={TESTIMONIALS[activeReviewId].image}
                    alt={TESTIMONIALS[activeReviewId].customerName}
                    className="w-12 h-12 rounded-full object-cover border border-gold"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-sans text-sm font-semibold tracking-wide text-white">
                      {TESTIMONIALS[activeReviewId].customerName}
                    </h3>
                    <p className="text-[11px] uppercase tracking-wider text-gold font-sans font-medium">
                      {TESTIMONIALS[activeReviewId].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Micro Nav Controls */}
            <div className="flex justify-between items-center mt-8 border-t border-white/5 pt-4">
              <span className="text-xs font-sans opacity-40">
                0{activeReviewId + 1} / 0{TESTIMONIALS.length}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevReview}
                  className="p-2 border border-white/15 rounded-full hover:border-gold hover:text-gold transition-colors cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNextReview}
                  className="p-2 border border-white/15 rounded-full hover:border-gold hover:text-gold transition-colors cursor-pointer"
                  aria-label="Next Review"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. GALLERY PREVIEW */}
      <section
        id="gallery-preview"
        className={`py-24 transition-colors duration-300 ${
          darkMode ? 'bg-black text-white' : 'bg-[#fbfbf9] text-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b pb-6" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}>
            <div>
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-semibold block mb-2">
                {dict.galleryTitle}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight">
                {language === 'EN' ? 'Ambiance & Gastronomy Visuals' : language === 'FR' ? 'Visuels d\'Ambiance' : 'Sguardi Fotografici'}
              </h2>
            </div>
            <button
              onClick={() => onPageChange('gallery')}
              className="mt-4 md:mt-0 flex items-center space-x-1.5 text-xs uppercase tracking-widest font-sans font-bold text-gold hover:text-gold-hover transition-colors cursor-pointer"
            >
              <span>{language === 'EN' ? 'View Complete Gallery' : language === 'FR' ? 'Voir toute la Galerie' : 'Sfoglia la galleria'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Masonry Styled grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryPreview.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onPageChange('gallery')}
                className="group relative cursor-pointer overflow-hidden rounded-xl h-80 shadow-md border"
                style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115 group-hover:rotate-1 saturate-100"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <span className="text-[9px] uppercase tracking-widest text-gold font-sans font-bold mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-white mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. RESERVATION CALL TO ACTION */}
      <section
        id="reservation-cta-section"
        className="relative py-28 overflow-hidden bg-[#111111] text-white border-t border-white/5"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-40" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight max-w-2xl mx-auto">
              Reserve Your Table Today
            </h2>
            <p className="font-sans text-base max-w-xl mx-auto opacity-80 leading-relaxed font-light">
              {language === 'EN'
                ? 'Join us for a sensory journey of refined classics. Bookings open 30 days in advance; tables fill rapidly.'
                : language === 'FR'
                ? 'Rejoignez-nous pour un voyage sensoriel de classiques raffinés. Les réservations ouvrent 30 jours à l\'avance.'
                : 'Partecipa a un viaggio sensoriale indimenticabile. Prenotazioni aperte per i prossimi 30 giorni.'}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 py-4 opacity-75 max-w-xl mx-auto">
              <div className="flex items-center space-x-2 text-sm text-gold">
                <Users className="h-4 w-4" />
                <span>1 – 12 guests</span>
              </div>
              <div className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
              <div className="flex items-center space-x-2 text-sm text-gold">
                <Clock className="h-4 w-4" />
                <span>5:30 PM — 11:00 PM</span>
              </div>
              <div className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
              <div className="flex items-center space-x-2 text-sm text-gold">
                <Calendar className="h-4 w-4" />
                <span>Tue — Sat bookings</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onPageChange('reservations')}
                className="bg-gold text-[#111111] font-sans font-medium text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-sm hover:bg-[#b59830] transition-transform hover:scale-[1.02] shadow-2xl cursor-pointer"
              >
                {dict.reserveBtn}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
