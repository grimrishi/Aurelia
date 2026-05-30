/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MenuCategory =
  | 'Starters'
  | 'Soups'
  | 'Salads'
  | 'Main Course'
  | 'Pasta'
  | 'Pizza'
  | 'Seafood'
  | 'Steaks'
  | 'Desserts'
  | 'Beverages';

export type GalleryCategory = 'all' | 'food' | 'interior' | 'exterior' | 'events' | 'chef' | 'kitchen';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  tags: string[];
  vegetarian: boolean;
  spicy: boolean;
  popular: boolean;
  chefRecommended: boolean;
}

export interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  role: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  category: Exclude<GalleryCategory, 'all'>;
  imageUrl: string;
  title: string;
  description: string;
}

export interface Reservation {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export type ActivePage = 'home' | 'about' | 'menu' | 'gallery' | 'reservations' | 'contact';

export type Language = 'EN' | 'FR' | 'IT';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Award {
  id: string;
  year: string;
  title: string;
  institution: string;
  description: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
}
