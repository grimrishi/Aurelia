/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, ZoomIn, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { GalleryItem, GalleryCategory, Language } from '../types';
import { GALLERY, DICTIONARY } from '../data';

interface GalleryViewProps {
  language: Language;
  darkMode: boolean;
}

export default function GalleryView({ language, darkMode }: GalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const dict = DICTIONARY[language];

  // Unique categories list
  const categories: GalleryCategory[] = ['all', 'food', 'interior', 'exterior', 'events', 'chef', 'kitchen'];

  // Filtered list
  const filteredGallery = useMemo(() => {
    if (selectedCategory === 'all') return GALLERY;
    return GALLERY.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handlePrevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : (prev as number) - 1));
  };

  const handleNextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : (prev as number) + 1));
  };

  return (
    <div className="w-full">
      {/* Gallery Header page Hero */}
      <section className="relative h-[45vh] flex items-center justify-center bg-black overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600&q=80"
            alt="The Gallery Hub Background"
            className="w-full h-full object-cover opacity-50 saturate-50 scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/95" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4 animate-fade-in">
          <span className="text-gold text-xs uppercase tracking-[0.35em] font-sans font-bold block">
            VISUAL JOURNAL
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-wider">
            {dict.galleryTitle}
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            {language === 'EN'
              ? 'A spatial chronicle of physical designs, gold details, and artisan-cooked materials.'
              : language === 'FR'
              ? 'Une chronique spatiale de designs physiques et de matériaux d\'exception.'
              : 'Un diario visivo delle nostre sale curate, piatti d\'autore e passione per la tavola.'}
          </p>
        </div>
      </section>

      {/* Grid gallery section */}
      <section
        className={`py-20 transition-all duration-300 ${
          darkMode ? 'bg-[#111111] text-white' : 'bg-white text-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Categories Horizontal Selector tabs */}
          <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    active
                      ? 'bg-gold text-[#111111] shadow-lg'
                      : darkMode
                      ? 'bg-[#181818] text-white border border-white/5 hover:border-gold/30'
                      : 'bg-[#faf9f6] text-charcoal border border-charcoal/10 hover:border-gold/30'
                  }`}
                >
                  {cat === 'all' ? dict.allPhotos : cat}
                </button>
              );
            })}
          </div>

          {/* Masonry Layout display */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative group cursor-zoom-in rounded-2xl overflow-hidden border shadow hover:shadow-xl transition-all block mb-6"
                style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105 saturate-100 group-hover:saturate-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual hover reveal details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 flex flex-col justify-end text-white">
                  <div className="flex items-center space-x-1.5 text-gold text-[10px] uppercase tracking-[0.2em] font-sans font-bold mb-1">
                    <Camera className="h-3 w-3" />
                    <span>{item.category}</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-white/80 line-clamp-3 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Zoom glass icon accent */}
                  <div className="absolute top-4 right-4 bg-gold/10 backdrop-blur-md border border-gold/30 p-2 rounded-full transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn className="h-4.5 w-4.5 text-gold" style={{ filter: 'drop-shadow(0 0 1px #d4af37)' }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX SLIDESHOW CAROUSEL MODAL OVERLAY */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4">
            {/* Backdrop Mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Top Bar menu */}
            <div className="relative z-10 w-full max-w-5xl flex items-center justify-between text-white/80 mb-4 px-2 select-none">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-sans opacity-85">
                <ImageIcon className="h-4 w-4 text-gold" />
                <span>
                  Photo 0{lightboxIndex + 1} / 0{filteredGallery.length}
                </span>
                <span className="text-white/40">|</span>
                <span className="text-gold font-medium font-mono">{filteredGallery[lightboxIndex].category}</span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Core Image container and buttons */}
            <div className="relative z-10 w-full max-w-5xl max-h-[70vh] flex items-center justify-between">
              
              {/* Left arrow scroll */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-4 z-20 p-3 bg-black/40 border border-white/10 rounded-full text-white/80 hover:bg-black/80 hover:text-gold transition-colors cursor-pointer"
                aria-label="Previous Slide picture"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="w-full flex justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    src={filteredGallery[lightboxIndex].imageUrl}
                    alt={filteredGallery[lightboxIndex].title}
                    className="max-h-[70vh] max-w-[85vw] object-contain rounded-lg border border-white/5 shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Right arrow scroll */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-4 z-20 p-3 bg-black/40 border border-white/10 rounded-full text-white/80 hover:bg-black/80 hover:text-gold transition-colors cursor-pointer"
                aria-label="Next Slide picture"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

            </div>

            {/* Bottom descriptions overlay */}
            <div className="relative z-10 mt-6 max-w-2xl text-center text-white space-y-1.5 select-none px-4">
              <h3 className="font-serif text-xl sm:text-2xl tracking-wide font-medium text-gold leading-tight">
                {filteredGallery[lightboxIndex].title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
                {filteredGallery[lightboxIndex].description}
              </p>
            </div>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
