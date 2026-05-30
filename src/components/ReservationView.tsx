/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Clock, Mail, Phone, User, CheckCircle2, AlertCircle, Sparkles, AlertTriangle, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reservation, Language } from '../types';
import { DICTIONARY } from '../data';

interface ReservationViewProps {
  language: Language;
  darkMode: boolean;
}

export default function ReservationView({ language, darkMode }: ReservationViewProps) {
  const dict = DICTIONARY[language];

  // Forms elements state
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>('');

  // Custom calendar state
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => new Date());

  // Helper to change month
  const nextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };

  const currentYear = calendarMonth.getFullYear();
  const currentMonthIndex = calendarMonth.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const frenchMonthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const italianMonthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const currentMonthName = language === 'EN' 
    ? monthNames[currentMonthIndex] 
    : language === 'FR' 
    ? frenchMonthNames[currentMonthIndex]
    : italianMonthNames[currentMonthIndex];

  const weekDays = language === 'EN'
    ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    : language === 'FR'
    ? ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa']
    : ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'];

  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1);
  const startDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

  const daysGrid: (number | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    daysGrid.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysGrid.push(i);
  }

  const getDayStatus = (day: number) => {
    const dObj = new Date(currentYear, currentMonthIndex, day);
    dObj.setHours(0, 0, 0, 0);

    const todayCopy = new Date();
    todayCopy.setHours(0, 0, 0, 0);

    const maxAdvance = new Date();
    maxAdvance.setDate(maxAdvance.getDate() + 30);
    maxAdvance.setHours(23, 59, 59, 999);

    const isPast = dObj < todayCopy;
    const isTooFar = dObj > maxAdvance;
    
    // Closed on Sun (0) and Mon (1)
    const dayOfWeek = dObj.getDay();
    const isClosed = dayOfWeek === 0 || dayOfWeek === 1;

    const formattedDayStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isSelected = date === formattedDayStr;

    return {
      isPast,
      isTooFar,
      isClosed,
      isSelected,
      formattedDayStr,
      isDisabled: isPast || isTooFar || isClosed
    };
  };
  const [time, setTime] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [requests, setRequests] = useState<string>('');

  // Status feedback state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  // Sane reservation hour slots
  const timeSlots = [
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
  ];

  // Future booking limits
  const today = new Date().toISOString().split('T')[0];

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!date) errs.date = language === 'EN' ? 'Date is required' : language === 'FR' ? 'La date est requise' : 'La data è richiesta';
    
    // Check if Sunday or Monday is chosen
    if (date) {
      const chosenDay = new Date(date).getUTCDay();
      if (chosenDay === 0 || chosenDay === 1) {
        errs.date = language === 'EN' 
          ? 'Aurelia is closed on Sundays and Mondays. Please choose a Tuesday through Saturday.' 
          : language === 'FR' 
          ? 'Aurelia est fermé les dimanches et lundis.' 
          : 'Aurelia è chiusa la domenica e il lunedì.';
      }
    }

    if (!time) errs.time = language === 'EN' ? 'Time is required' : language === 'FR' ? 'L\'heure est requise' : 'L\'orario è richiesto';
    if (!name.trim()) errs.name = language === 'EN' ? 'Name is required' : language === 'FR' ? 'Le nom est requis' : 'Il nome è richiesto';
    
    // Email Check
    if (!email) {
      errs.email = language === 'EN' ? 'Email is required' : language === 'FR' ? 'L\'e-mail est requis' : 'L\'email è richiesta';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errs.email = language === 'EN' ? 'Invalid email format' : language === 'FR' ? 'Format e-mail invalide' : 'Formato email non valido';
      }
    }

    // Phone Check
    if (!phone) {
      errs.phone = language === 'EN' ? 'Phone is required' : language === 'FR' ? 'Mobiles requis' : 'Il telefono è richiesto';
    } else {
      const phoneRegex = /^[+]?[0-9\s-]{6,15}$/;
      if (!phoneRegex.test(phone)) {
        errs.phone = language === 'EN' ? 'Invalid phone format' : language === 'FR' ? 'Format de téléphone invalide' : 'Formato telefono non valido';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // Simulate luxury API response lag
    setTimeout(() => {
      // Create random verification hex
      const range = 'ABCDEF0123456789';
      let code = 'AUR-';
      for (let i = 0; i < 6; i++) {
        code += range.charAt(Math.floor(Math.random() * range.length));
      }

      setConfirmationCode(code);
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // Human readable date formatting
  const formattedSelectedDate = date
    ? new Date(date).toLocaleDateString(language === 'EN' ? 'en-US' : language === 'FR' ? 'fr-FR' : 'it-IT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="w-full">
      {/* Reservations Hero */}
      <section className="relative h-[45vh] flex items-center justify-center bg-black overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
            alt="Hall reservations setup"
            className="w-full h-full object-cover opacity-50 saturate-50 scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-gold text-xs uppercase tracking-[0.35em] font-sans font-bold block">
            TABLE DISPOSITION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-wider">
            {dict.reservationTitle}
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            {language === 'EN'
              ? 'Initiate private dining entries or secure regular luxury tables dynamically.'
              : language === 'FR'
              ? 'Réservez des tables d\'exception en quelques secondes avec retour de confirmation immédiat.'
              : 'Riserva il tuo tavolo ad Aurelia per vivere momenti unici di autentico gusto.'}
          </p>
        </div>
      </section>

      {/* Main Form Area */}
      <section
        className={`py-20 transition-all duration-300 ${
          darkMode ? 'bg-[#111111] text-white' : 'bg-[#fafafa] text-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {isSubmitted ? (
            /* Successful reservation card view */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto border rounded-2xl overflow-hidden shadow-2xl relative"
              style={{
                backgroundColor: darkMode ? '#181818' : '#ffffff',
                borderColor: '#D4AF37'
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold" />
              
              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="flex justify-center text-[#22C55E]">
                  <CheckCircle2 className="h-16 w-16" />
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-3xl font-semibold tracking-wide" style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
                    {dict.bookSuccess}
                  </h2>
                  <p className="font-sans text-sm opacity-80 leading-relaxed max-w-md mx-auto" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                    {dict.bookSuccessSub}
                  </p>
                </div>

                {/* Simulated Ticket Badge */}
                <div className="border border-dashed p-6 rounded-xl space-y-4 max-w-sm mx-auto" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(26,26,26,0.15)', backgroundColor: darkMode ? '#111111' : '#fcfcfc' }}>
                  <div className="flex justify-between items-baseline border-b pb-2" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60">Confirmation Code</span>
                    <span className="font-mono text-base font-bold text-gold tracking-wide">{confirmationCode}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2 text-left">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider block opacity-50">Guests</span>
                      <span className="text-sm font-semibold">{guests} People</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider block opacity-50">Hour</span>
                      <span className="text-sm font-semibold">{time} PM</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider block opacity-50">Concierge</span>
                      <span className="text-sm font-semibold text-gold font-medium">Guaranteed</span>
                    </div>
                  </div>

                  <div className="text-left border-t pt-2" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                    <span className="text-[9px] uppercase tracking-wider block opacity-50">Selected Date</span>
                    <span className="text-xs font-semibold leading-relaxed block">{formattedSelectedDate}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setDate('');
                      setTime('');
                      setName('');
                      setEmail('');
                      setPhone('');
                      setRequests('');
                    }}
                    className="px-6 py-3.5 bg-gold text-[#111111] font-sans text-xs uppercase tracking-widest font-bold hover:bg-gold-hover hover:text-white rounded-sm transition-colors cursor-pointer"
                  >
                    Book another Table
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3.5 border border-transparent font-sans text-xs uppercase tracking-widest font-bold opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
                    style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}
                  >
                    Print table voucher
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Multi-column complex reservation browser */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Form entries row */}
              <div className="lg:col-span-8">
                <form onSubmit={handleBookingSubmit} className="space-y-8">
                  
                  {/* Step 1: Volume coordinates */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl font-medium tracking-wide border-b pb-2 flex items-center gap-2" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.08)' }}>
                      <Users className="h-5 w-5 text-gold" style={{ filter: 'drop-shadow(0 0 1px #d4af37)' }} />
                      <span>1. Guest Count</span>
                    </h3>
                    
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                        const active = guests === num;
                        return (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setGuests(num)}
                            className={`py-3.5 font-sans font-bold text-sm rounded-md border transition-all cursor-pointer ${
                              active
                                ? 'border-gold bg-gold text-[#111111] shadow-md'
                                : darkMode
                                ? 'border-white/10 bg-[#181818] text-white hover:border-white/20'
                                : 'border-charcoal/10 bg-white text-charcoal hover:border-charcoal/30'
                            }`}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Date & Hour details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    
                    {/* Date picker */}
                    <div className="space-y-4">
                      <h3 className="font-serif text-xl font-medium tracking-wide border-b pb-2 flex items-center gap-2" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.08)' }}>
                        <Calendar className="h-5 w-5 text-gold" />
                        <span>2. Date Selector</span>
                      </h3>
                      
                      <div className="relative">
                        {showCalendar && (
                          <div 
                            className="fixed inset-0 z-40 cursor-default" 
                            onClick={() => setShowCalendar(false)} 
                          />
                        )}
                        <input
                          type="text"
                          readOnly
                          value={date ? formattedSelectedDate : ''}
                          onClick={() => setShowCalendar(!showCalendar)}
                          placeholder={language === 'EN' ? 'Choose reservation date...' : language === 'FR' ? 'Choisir la date...' : 'Scegli la data...'}
                          className="w-full px-4 py-3 text-sm font-sans rounded-md border outline-none font-medium pr-10 cursor-pointer select-none"
                          style={{
                            backgroundColor: darkMode ? '#181818' : '#ffffff',
                            borderColor: errors.date ? '#EF4444' : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)',
                            color: darkMode ? '#ffffff' : '#1a1a1a',
                          }}
                          aria-label="Reservation Date"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                          <Calendar className="h-4 w-4" />
                        </div>

                        {/* Custom Dark-Mode Only Calendar Popover */}
                        {showCalendar && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="absolute left-0 right-0 sm:left-0 sm:right-auto mx-auto sm:mx-0 mt-2 p-4 w-72 sm:w-80 rounded-xl border border-gold/30 shadow-2xl z-50 select-none flex flex-col animate-fadeIn"
                            style={{
                              backgroundColor: '#222222', // bit less dark, matches the requested description
                              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                            }}
                          >
                            {/* Calendar Header with navigation */}
                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                              <button
                                type="button"
                                onClick={prevMonth}
                                className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer flex items-center justify-center"
                              >
                                <ChevronLeft className="h-4 w-4 text-gold" />
                              </button>
                              <span className="font-serif text-xs font-bold tracking-widest text-gold uppercase">
                                {currentMonthName} {currentYear}
                              </span>
                              <button
                                type="button"
                                onClick={nextMonth}
                                className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer flex items-center justify-center"
                              >
                                <ChevronRight className="h-4 w-4 text-gold" />
                              </button>
                            </div>

                            {/* Calendar Week Days Headers */}
                            <div className="grid grid-cols-7 gap-1 text-center mb-1">
                              {weekDays.map((dayName, index) => {
                                const isClosedDay = index === 0 || index === 1;
                                return (
                                  <span 
                                    key={dayName} 
                                    className={`text-[10px] font-bold uppercase tracking-wider font-sans ${isClosedDay ? 'text-red-400 opacity-60 font-semibold' : 'text-gray-400'}`}
                                  >
                                    {dayName}
                                  </span>
                                );
                              })}
                            </div>

                            {/* Calendar Days Grid */}
                            <div className="grid grid-cols-7 gap-1 text-center">
                              {daysGrid.map((day, idx) => {
                                if (day === null) {
                                  return <div key={`empty-${idx}`} className="aspect-square" />;
                                }

                                const { isPast, isTooFar, isClosed, isSelected, formattedDayStr, isDisabled } = getDayStatus(day);

                                return (
                                  <button
                                    key={`day-${day}`}
                                    type="button"
                                    disabled={isDisabled}
                                    onClick={() => {
                                      setDate(formattedDayStr);
                                      setShowCalendar(false);
                                    }}
                                    className={`relative aspect-square flex flex-col items-center justify-center text-xs font-sans font-semibold rounded-md transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-gold text-[#111111] font-bold shadow-md'
                                        : isDisabled
                                        ? 'opacity-25 text-gray-500 cursor-not-allowed'
                                        : 'text-white hover:bg-gold/20 hover:text-gold'
                                    }`}
                                  >
                                    <span>{day}</span>
                                    {isClosed && (
                                      <span className="absolute bottom-[2px] text-[7px] text-red-400/90 font-normal leading-none scale-90">
                                        {language === 'EN' ? 'Closed' : language === 'FR' ? 'Fermé' : 'Chiuso'}
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Subtle notice legend */}
                            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-gray-400 font-sans">
                              <span className="flex items-center gap-1">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400/50" /> {language === 'EN' ? 'Closed days (Su/Mo)' : language === 'FR' ? 'Fermé (Di/Lu)' : 'Chiuso (Do/Lu)'}
                              </span>
                              <span className="text-gold/90 font-medium">{language === 'EN' ? 'Max 30 days ahead' : language === 'FR' ? 'Max 30 jours' : 'Max 30 giorni'}</span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      {errors.date && (
                        <p className="text-xs text-red-500 font-semibold flex items-center gap-1.5 animate-pulse">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span>{errors.date}</span>
                        </p>
                      )}
                    </div>

                    {/* Time picker list */}
                    <div className="space-y-4">
                      <h3 className="font-serif text-xl font-medium tracking-wide border-b pb-2 flex items-center gap-2" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.08)' }}>
                        <Clock className="h-5 w-5 text-gold" />
                        <span>3. Time Slot</span>
                      </h3>
                      
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((slot) => {
                          const active = time === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setTime(slot)}
                              className={`py-2 text-xs font-sans font-semibold rounded-sm border transition-shadow cursor-pointer ${
                                active
                                  ? 'border-gold bg-gold text-[#111111]'
                                  : darkMode
                                  ? 'border-white/10 bg-[#1a1a1a] text-white hover:border-gold/50'
                                  : 'border-charcoal/10 bg-white text-charcoal hover:border-gold/50'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                      {errors.time && (
                        <p className="text-xs text-red-500 font-semibold flex items-center gap-1.5">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>{errors.time}</span>
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Step 3: Bio Details */}
                  <div className="space-y-6 pt-4">
                    <h3 className="font-serif text-xl font-medium tracking-wide border-b pb-2 flex items-center gap-2" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.08)' }}>
                      <User className="h-5 w-5 text-gold" />
                      <span>4. Lead Contact Information</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wider font-sans font-semibold block opacity-80" htmlFor="guest-name">Full Name *</label>
                        <input
                          id="guest-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Eleanor Vance"
                          className="w-full px-4 py-3 text-sm font-sans rounded-md border outline-none font-medium"
                          style={{
                            backgroundColor: darkMode ? '#181818' : '#ffffff',
                            borderColor: errors.name ? '#EF4444' : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)',
                            color: darkMode ? '#ffffff' : '#1a1a1a',
                          }}
                        />
                        {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wider font-sans font-semibold block opacity-80" htmlFor="guest-email">Email Address *</label>
                        <input
                          id="guest-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="eleanor@example.com"
                          className="w-full px-4 py-3 text-sm font-sans rounded-md border outline-none font-medium"
                          style={{
                            backgroundColor: darkMode ? '#181818' : '#ffffff',
                            borderColor: errors.email ? '#EF4444' : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)',
                            color: darkMode ? '#ffffff' : '#1a1a1a',
                          }}
                        />
                        {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wider font-sans font-semibold block opacity-80" htmlFor="guest-phone">Contact Phone *</label>
                        <input
                          id="guest-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+33 6 -- -- --"
                          className="w-full px-4 py-3 text-sm font-sans rounded-md border outline-none font-medium"
                          style={{
                            backgroundColor: darkMode ? '#181818' : '#ffffff',
                            borderColor: errors.phone ? '#EF4444' : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)',
                            color: darkMode ? '#ffffff' : '#1a1a1a',
                          }}
                        />
                        {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone}</p>}
                      </div>

                    </div>
                  </div>

                  {/* Step 4: Special Requests */}
                  <div className="space-y-2 pt-4">
                    <label className="text-xs uppercase tracking-wider font-sans font-semibold block opacity-80" htmlFor="special-requests">
                      {dict.specialRequests}
                    </label>
                    <textarea
                      id="special-requests"
                      rows={3}
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      placeholder="e.g. Vegetarian diet constraints, celebrating silver wedding anniversary..."
                      className="w-full px-4 py-3 text-sm font-sans rounded-md border outline-none font-medium"
                      style={{
                        backgroundColor: darkMode ? '#181818' : '#ffffff',
                        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)',
                        color: darkMode ? '#ffffff' : '#1a1a1a',
                      }}
                    />
                  </div>

                  {/* Submit Trigger */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4.5 bg-gold text-[#111111] font-sans font-medium text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-gold-hover hover:text-white transition-all duration-300 shadow-xl cursor-pointer disabled:opacity-50"
                    >
                      {loading ? 'Securing reservation details...' : dict.reserveBtn}
                    </button>
                  </div>

                </form>
              </div>

              {/* Booking Summary Floating Checkout card side column */}
              <div className="lg:col-span-4 sticky top-28 space-y-6">
                
                <div
                  className="rounded-xl border p-6 space-y-6 relative overflow-hidden"
                  style={{
                    backgroundColor: darkMode ? '#181818' : '#ffffff',
                    borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,26,0.1)'
                  }}
                >
                  <h3 className="font-serif text-lg font-semibold text-gold border-b pb-3 leading-none">
                    Reservation Preview
                  </h3>

                  <div className="space-y-4 font-sans text-xs sm:text-sm">
                    <div className="flex justify-between items-center opacity-80">
                      <span>Guests</span>
                      <strong className="text-sm">{guests} Guests</strong>
                    </div>

                    <div className="flex justify-between items-center opacity-80 border-t pt-3" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                      <span>Selected Date</span>
                      <strong className="text-right text-xs max-w-[150px] line-clamp-1">{date ? formattedSelectedDate : 'Not selected yet'}</strong>
                    </div>

                    <div className="flex justify-between items-center opacity-80 border-t pt-3" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                      <span>Hour Slot</span>
                      <strong className="text-sm">{time ? `${time} PM` : 'Not chosen'}</strong>
                    </div>

                    <div className="flex justify-between items-center opacity-80 border-t pt-3" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                      <span>Appellation</span>
                      <strong className="text-sm">{name || 'Guest'}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-gold/5 rounded-md border border-gold/10 text-xs text-gold/90 leading-relaxed font-sans mt-4">
                    <div className="flex items-start gap-1.5">
                      <Sparkles className="h-4 w-4 flex-shrink-0 text-gold mt-0.5" />
                      <p>Valet parking is compliments of the house. All dining sessions have a 2-hour guarantee allocation.</p>
                    </div>
                  </div>
                </div>

                {/* Trust security indicators */}
                <div className="flex items-center space-x-3 text-xs opacity-70 font-sans pl-2">
                  <ShieldCheck className="h-5 w-5 text-[#22C55E]" />
                  <span>Your luxury booking is secured with double encryption.</span>
                </div>

              </div>

            </div>
          )}

        </div>
      </section>
    </div>
  );
}
