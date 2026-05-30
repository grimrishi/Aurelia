/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActivePage, Language } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import MenuView from './components/MenuView';
import GalleryView from './components/GalleryView';
import ReservationView from './components/ReservationView';
import ContactView from './components/ContactView';
import { Utensils, MessageSquare, Heart, ArrowUp } from 'lucide-react';

export default function App() {
  // Theme state check (Defaulting to luxurious deep dark mode)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('aurelia_dark_mode');
    return saved ? saved === 'true' : true;
  });

  // Language state check
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('aurelia_lang');
    return (saved as Language) || 'EN';
  });

  // Active page state
  const [activePage, setActivePage] = useState<ActivePage>('home');

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('aurelia_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Floating sticky CTA elements visibility
  const [showStickyBtn, setShowStickyBtn] = useState(false);

  useEffect(() => {
    localStorage.setItem('aurelia_dark_mode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('aurelia_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('aurelia_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple scroll-to-top helper
  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 overflow-x-hidden ${
        darkMode ? 'bg-dark text-white' : 'bg-white text-charcoal'
      }`}
    >
      {/* 1. Header Navigation Bar */}
      <Navbar
        activePage={activePage}
        onPageChange={handlePageChange}
        language={language}
        onLanguageChange={setLanguage}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* 2. Main content view orchestrator */}
      <main className="flex-grow pt-0">
        {activePage === 'home' && (
          <HomeView
            onPageChange={handlePageChange}
            language={language}
            darkMode={darkMode}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
        )}
        {activePage === 'about' && (
          <AboutView language={language} darkMode={darkMode} />
        )}
        {activePage === 'menu' && (
          <MenuView
            language={language}
            darkMode={darkMode}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
        )}
        {activePage === 'gallery' && (
          <GalleryView language={language} darkMode={darkMode} />
        )}
        {activePage === 'reservations' && (
          <ReservationView language={language} darkMode={darkMode} />
        )}
        {activePage === 'contact' && (
          <ContactView language={language} darkMode={darkMode} />
        )}
      </main>

      {/* 3. Global Footer block */}
      <Footer
        onPageChange={handlePageChange}
        language={language}
        darkMode={darkMode}
      />

      {/* 4. PREMIUM FLOATING WIDGETS */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col space-y-3">
        
        {/* Floating sticky Booking Button (Disappears on Reservations tab) */}
        {showStickyBtn && activePage !== 'reservations' && (
          <button
            onClick={() => handlePageChange('reservations')}
            className="p-3.5 bg-gold text-[#111111] hover:bg-[#b59830] transition-colors rounded-full shadow-2xl cursor-pointer flex items-center justify-center border border-white/10 text-xs font-bold uppercase"
            aria-label="Sticky Table Booking Button"
          >
            <Utensils className="h-5 w-5" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap pl-0">
              Reserve
            </span>
          </button>
        )}

        {/* Scroll back to top elevator button */}
        {showStickyBtn && (
          <button
            onClick={handleScrollToTop}
            className={`p-3 border rounded-full shadow-xl transition-all cursor-pointer ${
              darkMode
                ? 'bg-[#181818] border-white/10 hover:border-gold hover:text-gold text-white'
                : 'bg-[#fafafa] border-charcoal/15 hover:border-gold hover:text-gold text-charcoal'
            }`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4.5 w-4.5" />
          </button>
        )}

      </div>
    </div>
  );
}
