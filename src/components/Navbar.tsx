/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Sun, Moon, Utensils } from 'lucide-react';
import { ActivePage, Language } from '../types';
import { DICTIONARY } from '../data';

interface NavbarProps {
  activePage: ActivePage;
  onPageChange: (page: ActivePage) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navbar({
  activePage,
  onPageChange,
  language,
  onLanguageChange,
  darkMode,
  onToggleDarkMode,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const dict = DICTIONARY[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActivePage; labelKey: string }[] = [
    { id: 'home', labelKey: 'homeTitle' },
    { id: 'about', labelKey: 'aboutTitle' },
    { id: 'menu', labelKey: 'menuTitle' },
    { id: 'gallery', labelKey: 'galleryTitle' },
    { id: 'reservations', labelKey: 'reservationTitle' },
    { id: 'contact', labelKey: 'contactTitle' },
  ];

  const handleNavItemClick = (pageId: ActivePage) => {
    onPageChange(pageId);
    setIsOpen(false);
  };

  const currentLangLabel = {
    EN: 'English',
    FR: 'Français',
    IT: 'Italiano',
  }[language];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-4 right-4 md:left-8 md:right-8 lg:left-16 lg:right-16 xl:left-24 xl:right-24 mx-auto max-w-7xl z-50 transition-all duration-300 ${
        isScrolled
          ? darkMode
            ? 'bg-[#111111]/90 border border-white/10 backdrop-blur-md shadow-lg rounded-b-xl'
            : 'bg-white/95 border border-charcoal/10 backdrop-blur-md shadow-md rounded-b-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto w-full px-4 sm:px-6 md:px-8">
        <div className={`flex items-center justify-between ${isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-28'} transition-all duration-300`}>
          
          {/* Brand Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onPageChange('home')}>
            <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-[0.18em] text-gold select-none">
              AURELIA
            </span>
            <span className="block text-[8px] tracking-[0.4em] font-sans font-medium uppercase text-center mt-0.5 opacity-80" style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
              dining
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const active = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavItemClick(item.id)}
                  className={`text-sm tracking-widest font-sans uppercase transition-all duration-300 px-3 py-1 cursor-pointer relative ${
                    active
                      ? 'text-gold font-medium'
                      : darkMode
                      ? 'text-white/80 hover:text-white'
                      : 'text-charcoal/80 hover:text-charcoal'
                  }`}
                >
                  {dict[item.labelKey] || item.id}
                  {active && (
                    <motion.span
                      layoutId="navTabIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gold"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Control Panel: Language, DarkMode, CTA */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1.5 text-xs uppercase tracking-widest font-sans border rounded-full px-3 py-1.5 transition-colors cursor-pointer"
                style={{
                  borderColor: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(26,26,26,0.15)',
                  color: darkMode ? '#ffffff' : '#1a1a1a',
                }}
                aria-label="Change language"
              >
                <Globe className="h-3.5 w-3.5 text-gold" />
                <span>{language}</span>
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setLangMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-40 rounded-md shadow-xl border z-20 py-1 overflow-hidden"
                      style={{
                        backgroundColor: darkMode ? '#111111' : '#ffffff',
                        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      }}
                    >
                      {(['EN', 'FR', 'IT'] as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            onLanguageChange(lang);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-sans transition-colors cursor-pointer ${
                            language === lang
                              ? 'text-gold bg-gold/10 font-semibold'
                              : darkMode
                              ? 'text-white hover:bg-white/5'
                              : 'text-charcoal hover:bg-charcoal/5'
                          }`}
                        >
                          {lang === 'EN' ? 'English (US)' : lang === 'FR' ? 'Français (FR)' : 'Italiano (IT)'}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Icon Button */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 border rounded-full transition-colors cursor-pointer hover:bg-gold/10"
              style={{
                borderColor: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(26,26,26,0.15)',
                color: darkMode ? '#ffffff' : '#1a1a1a',
              }}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-4 w-4 text-gold" /> : <Moon className="h-4 w-4 text-gold" />}
            </button>

            {/* Sticky Table reservation */}
            <button
              onClick={() => onPageChange('reservations')}
              className={`text-xs uppercase tracking-widest px-5 py-2.5 font-sans font-medium rounded-sm transition-all duration-300 shadow-sm flex items-center space-x-1.5 cursor-pointer border border-transparent ${
                darkMode
                  ? 'bg-gold text-charcoal hover:bg-[#b59830] hover:text-white'
                  : 'bg-charcoal text-white hover:bg-gold hover:text-charcoal'
              }`}
            >
              <Utensils className="h-3.5 w-3.5" />
              <span>{dict.reserveBtn}</span>
            </button>

          </div>

          {/* Mobile responsive triggers */}
          <div className="flex items-center md:hidden space-x-3">
            {/* Quick dark mode */}
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 border rounded-full transition-colors"
              style={{
                borderColor: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(26,26,26,0.15)',
                color: darkMode ? '#ffffff' : '#1a1a1a',
              }}
            >
              {darkMode ? <Sun className="h-3.5 w-3.5 text-gold" /> : <Moon className="h-3.5 w-3.5 text-gold" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md transition-colors"
              style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}
              aria-expanded={isOpen}
              aria-label="Toggle Main Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.95, y: -10 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.95, y: -10 }}
            className={`absolute top-full left-0 right-0 mt-1 border border-white/10 rounded-xl shadow-2xl origin-top z-50 ${
              darkMode ? 'bg-[#111111]/95 text-white' : 'bg-white/95 text-charcoal'
            }`}
          >
            <div className="px-5 pt-4 pb-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavItemClick(item.id)}
                  className={`block w-full text-left py-3 text-sm font-sans tracking-widest uppercase border-b transition-colors cursor-pointer ${
                    activePage === item.id
                      ? 'text-gold font-bold border-gold'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                  style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}
                >
                  {dict[item.labelKey] || item.id}
                </button>
              ))}

              {/* Language Selector Rows for Mobile */}
              <div className="py-2">
                <span className="text-[10px] uppercase tracking-wider block mb-2 opacity-55 font-sans font-bold">
                  Choose Language
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['EN', 'FR', 'IT'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        onLanguageChange(lang);
                        setIsOpen(false);
                      }}
                      className={`text-xs py-2 rounded border uppercase font-sans tracking-widest text-center cursor-pointer ${
                        language === lang
                          ? 'border-gold text-gold bg-gold/10 font-bold'
                          : darkMode
                          ? 'border-white/10 text-white'
                          : 'border-charcoal/10 text-charcoal'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <button
                onClick={() => handleNavItemClick('reservations')}
                className="w-full text-center py-3.5 text-xs uppercase tracking-widest font-sans font-semibold text-charcoal bg-gold rounded mt-3 shadow hover:bg-[#b59830] transition-colors cursor-pointer"
              >
                {dict.reserveBtn}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
