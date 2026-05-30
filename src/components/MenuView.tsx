/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Heart, SlidersHorizontal, Eye, Star, Flame, Salad, GlassWater, Landmark } from 'lucide-react';
import { Dish, MenuCategory, Language } from '../types';
import { DISHES, DICTIONARY } from '../data';

interface MenuViewProps {
  language: Language;
  darkMode: boolean;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
}

export default function MenuView({
  language,
  darkMode,
  onToggleFavorite,
  favorites,
}: MenuViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'asc' | 'desc'>('default');
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);

  const dict = DICTIONARY[language];

  // Raw categories
  const categories: (MenuCategory | 'all')[] = [
    'all',
    'Starters',
    'Soups',
    'Salads',
    'Main Course',
    'Pasta',
    'Pizza',
    'Seafood',
    'Steaks',
    'Desserts',
    'Beverages',
  ];

  // Filtering + Sorting Algorithm
  const filteredDishes = useMemo(() => {
    let list = [...DISHES];

    // Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((d) => d.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by Favorites Only toggle
    if (showOnlyFavs) {
      list = list.filter((d) => favorites.includes(d.id));
    }

    // Sort options
    if (sortBy === 'asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy, showOnlyFavs, favorites]);

  return (
    <div className="w-full">
      {/* Menu Hero banner */}
      <section className="relative h-[48vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&q=80"
            alt="The Menu Background"
            className="w-full h-full object-cover opacity-50 saturate-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/95" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-gold text-xs uppercase tracking-[0.35em] font-sans font-bold block">
            AURELIA CHEF DESIGNS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-wider">
            {dict.menuTitle}
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            {language === 'EN'
              ? 'Taste artisanal dishes made with high seasonal focus and beautiful structural toppings.'
              : language === 'FR'
              ? 'Dégustez des assiettes exceptionnelles cuisinées avec des assaisonnements précis.'
              : 'Assapora piatti realizzati con ingredienti freschissimi per combinazioni memorabili.'}
          </p>
        </div>
      </section>

      {/* Primary Menu Browser container */}
      <section
        className={`py-20 transition-all duration-300 ${
          darkMode ? 'bg-[#111111] text-white' : 'bg-white text-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls Bar: Search, Sorting, Toggle Favs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10 pb-6 border-b" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.08)' }}>
            
            {/* Search box column */}
            <div className="lg:col-span-4 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gold">
                <Search className="h-4.5 w-4.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={dict.searchPlaceholder}
                className="w-full pl-10 pr-4 py-3 text-sm font-sans rounded-md border outline-none font-medium transition-all"
                style={{
                  backgroundColor: darkMode ? '#181818' : '#fafafa',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)',
                  color: darkMode ? '#ffffff' : '#1a1a1a',
                }}
              />
            </div>

            {/* Sorting column */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-gold flex-shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-3 text-sm font-sans rounded-md border outline-none font-medium transition-all"
                  style={{
                    backgroundColor: darkMode ? '#181818' : '#fafafa',
                    borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.15)',
                    color: darkMode ? '#ffffff' : '#1a1a1a',
                  }}
                  aria-label="Sort dishes"
                >
                  <option value="default">{dict.sortDefault}</option>
                  <option value="asc">{dict.sortPriceAsc}</option>
                  <option value="desc">{dict.sortPriceDesc}</option>
                </select>
              </div>
            </div>

            {/* Favorites-only filter checkbox indicator */}
            <div className="lg:col-span-3 flex items-center">
              <button
                onClick={() => setShowOnlyFavs(!showOnlyFavs)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md text-xs uppercase tracking-wider font-sans font-semibold border transition-all cursor-pointer ${
                  showOnlyFavs
                    ? 'border-gold text-gold bg-gold/10'
                    : darkMode
                    ? 'border-white/10 text-white/70 hover:text-white'
                    : 'border-charcoal/10 text-charcoal/70 hover:text-charcoal'
                }`}
              >
                <Heart className={`h-4 w-4 ${showOnlyFavs ? 'text-gold fill-gold' : ''}`} />
                <span>{dict.favorites} ({favorites.length})</span>
              </button>
            </div>

            {/* Language details block */}
            <div className="lg:col-span-2 text-right">
              <span className="text-xs uppercase tracking-widest opacity-60 font-mono">
                {filteredDishes.length} items found
              </span>
            </div>

          </div>

          {/* Horizontal category filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-6 mb-12 scrollbar-none scroll-smooth">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold font-sans transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    active
                      ? 'bg-gold text-[#111111] shadow-lg hover:bg-gold-hover'
                      : darkMode
                      ? 'bg-[#181818] border border-white/5 text-white hover:bg-[#222] hover:border-gold/30'
                      : 'bg-cream border border-charcoal/5 text-charcoal hover:bg-gold/10 hover:border-gold/30'
                  }`}
                >
                  {cat === 'all' ? dict.allCategories : cat}
                </button>
              );
            })}
          </div>

          {/* Results Grid display */}
          {filteredDishes.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="font-serif text-2xl tracking-wide opacity-50">
                {dict.noDishesFound}
              </p>
              {showOnlyFavs && (
                <button
                  onClick={() => setShowOnlyFavs(false)}
                  className="text-xs uppercase tracking-widest font-sans font-bold text-gold border-b pb-0.5 border-gold cursor-pointer"
                >
                  Clear Favorites Toggle
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDishes.map((dish) => {
                const isFav = favorites.includes(dish.id);
                return (
                  <div
                    key={dish.id}
                    className="group border rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl flex flex-col justify-between"
                    style={{
                      backgroundColor: darkMode ? '#181818' : '#ffffff',
                      borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,26,0.06)',
                    }}
                  >
                    
                    {/* Upper cover image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 saturate-100 group-hover:saturate-115"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                      
                      {/* Interactive favorite trigger */}
                      <button
                        onClick={() => onToggleFavorite(dish.id)}
                        className="absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md bg-black/40 hover:bg-black/60 transition-colors text-white border border-white/10 shadow cursor-pointer z-10"
                        aria-label="Toggle favorite"
                      >
                        <Heart className={`h-4 w-4 transition-colors ${isFav ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                      </button>

                      {/* Micro classification tags */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
                        {dish.popular && (
                          <span className="text-[8px] uppercase tracking-wider bg-[#22C55E] text-white px-2 py-0.5 rounded-sm font-semibold flex items-center">
                            <Star className="h-2 w-2 mr-1 fill-white" />
                            Popular
                          </span>
                        )}
                        {dish.chefRecommended && (
                          <span className="text-[8px] uppercase tracking-wider bg-[#D4AF37] text-white px-2 py-0.5 rounded-sm font-semibold flex items-center">
                            Chef choice
                          </span>
                        )}
                        {dish.spicy && (
                          <span className="text-[8px] uppercase tracking-wider bg-[#EF4444] text-white px-2 py-0.5 rounded-sm font-semibold flex items-center">
                            <Flame className="h-2.5 w-2.5 mr-0.5" />
                            Spicy
                          </span>
                        )}
                        {dish.vegetarian && (
                          <span className="text-[8px] uppercase tracking-wider bg-green-500 text-white px-2 py-0.5 rounded-sm font-semibold flex items-center">
                            VEG
                          </span>
                        )}
                      </div>

                      {/* Display price in lower overlay */}
                      <div className="absolute bottom-4 left-4">
                        <span className="font-serif text-2xl font-bold text-gold drop-shadow">
                          ${dish.price}
                        </span>
                      </div>
                    </div>

                    {/* Lower textual descriptive block */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="font-serif text-xl font-medium tracking-wide" style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
                          {dish.name}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm leading-relaxed opacity-75 line-clamp-3" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                          {dish.description}
                        </p>
                      </div>

                      {/* Custom Tags elements */}
                      <div className="flex flex-wrap gap-1 pt-2 border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,26,0.06)' }}>
                        {dish.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] uppercase tracking-widest font-sans font-medium px-2 py-0.5 rounded-sm"
                            style={{
                              backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)',
                              color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(26,26,26,0.6)',
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
