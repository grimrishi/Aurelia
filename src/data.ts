/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dish, Testimonial, GalleryItem, FAQItem, TeamMember, Award, TimelineMilestone, Language } from './types';

export const DICTIONARY: Record<Language, Record<string, string>> = {
  EN: {
    heroTitle: "Exceptional Dining Experience",
    heroSubtitle: "Discover handcrafted dishes, unforgettable flavors, and a warm atmosphere designed to create memorable moments.",
    reserveBtn: "Reserve Table",
    viewMenuBtn: "View Menu",
    aboutTitle: "About Aurelia",
    chefTitle: "The Culinary Master",
    menuTitle: "The Menu",
    galleryTitle: "Gallery",
    contactTitle: "Contact Us",
    reservationTitle: "Book a Table",
    experienceYears: "Years of Experience",
    customersServed: "Customers Served",
    averageRating: "Average Rating",
    signatureDishes: "Signature Dishes",
    whyChooseUs: "Why Choose Aurelia",
    testimonialsTitle: "What Our Guests Say",
    featuredDishes: "Chef's Handpicked Selections",
    allCategories: "All Categories",
    searchPlaceholder: "Search our menu...",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    sortDefault: "Recommended",
    noDishesFound: "No dishes match your preferences.",
    quickReservations: "Reservations",
    openingHours: "Opening Hours",
    address: "Location",
    phone: "Reservations Line",
    email: "Inquiries",
    newsletterTitle: "Receive Our Culinary Chronicles",
    newsletterBtn: "Subscribe",
    newsletterPlaceholder: "Your email address",
    newsletterSuccess: "Thank you for subscribing to Aurelia Dining.",
    specialRequests: "Special Requests (Dietary needs, anniversaries, etc.)",
    bookSuccess: "Your table at Aurelia is successfully reserved!",
    bookSuccessSub: "A confirmation email and text message have been sent with your reservation details.",
    learnMoreBtn: "Our Philosophy",
    chefPhilosophy: "Great cooking is not about complicated designs; it's about letting the raw soul of premium ingredients speak with clarity and elegance.",
    allPhotos: "All Photos",
    favorites: "Favorites only",
  },
  FR: {
    heroTitle: "Expérience Culinaire d'Exception",
    heroSubtitle: "Découvrez des plats artisanaux, des saveurs inoubliables et une atmosphère chaleureuse conçue pour créer des moments mémorables.",
    reserveBtn: "Réserver une Table",
    viewMenuBtn: "Voir le Menu",
    aboutTitle: "À Propos d'Aurelia",
    chefTitle: "Le Maître Culinaire",
    menuTitle: "Le Menu",
    galleryTitle: "Galerie",
    contactTitle: "Contactez-nous",
    reservationTitle: "Réserver",
    experienceYears: "Années d'Expérience",
    customersServed: "Clients Servis",
    averageRating: "Note Moyenne",
    signatureDishes: "Plats Signature",
    whyChooseUs: "Pourquoi Aurelia",
    testimonialsTitle: "Les Avis de nos Convives",
    featuredDishes: "Sélections du Chef",
    allCategories: "Toutes les Catégories",
    searchPlaceholder: "Rechercher dans le menu...",
    sortPriceAsc: "Prix : Du moins cher",
    sortPriceDesc: "Prix : Du plus cher",
    sortDefault: "Recommandé",
    noDishesFound: "Aucun plat ne correspond à vos critères.",
    quickReservations: "Réservations",
    openingHours: "Heures d'Ouverture",
    address: "Adresse",
    phone: "Ligne de Réservation",
    email: "Informations",
    newsletterTitle: "Abonnez-vous à notre Chronique",
    newsletterBtn: "S'abonner",
    newsletterPlaceholder: "Votre adresse e-mail",
    newsletterSuccess: "Merci de vous être abonné à Aurelia Dining.",
    specialRequests: "Demandes Spéciales (Régimes, anniversaires, etc.)",
    bookSuccess: "Votre table chez Aurelia est réservée avec succès !",
    bookSuccessSub: "Un e-mail et un SMS de confirmation vous ont été envoyés avec les détails.",
    learnMoreBtn: "Notre Philosophie",
    chefPhilosophy: "La grande cuisine ne réside pas dans la complexité, mais dans l'élégance de laisser s'exprimer l'âme pure des ingrédients.",
    allPhotos: "Toutes les Photos",
    favorites: "Favoris seulement",
  },
  IT: {
    heroTitle: "Esperienza Gastronomica d'Eccellenza",
    heroSubtitle: "Scopri piatti artigianali, sapori indimenticabili e un'atmosfera calda e accogliente concepita per creare momenti magici.",
    reserveBtn: "Riserva un Tavolo",
    viewMenuBtn: "Vedi il Menu",
    aboutTitle: "A proposito di Aurelia",
    chefTitle: "Il Maestro della Cucina",
    menuTitle: "Il Menu",
    galleryTitle: "Galleria",
    contactTitle: "Contattaci",
    reservationTitle: "Prenota",
    experienceYears: "Anni di Esperienza",
    customersServed: "Clienti Serviti",
    averageRating: "Valutazione Media",
    signatureDishes: "Piatti d'Autore",
    whyChooseUs: "Perché Aurelia",
    testimonialsTitle: "Cosa dicono i nostri Ospiti",
    featuredDishes: "Selezionati dallo Chef",
    allCategories: "Tutte le Categorie",
    searchPlaceholder: "Cerca nel menu...",
    sortPriceAsc: "Prezzo: Dal più basso",
    sortPriceDesc: "Prezzo: Dal più alto",
    sortDefault: "Consigliati",
    noDishesFound: "Nessun piatto corrisponde alla ricerca.",
    quickReservations: "Prenotazioni",
    openingHours: "Orari di Apertura",
    address: "Indirizzo",
    phone: "Linea Prenotazioni",
    email: "Richieste",
    newsletterTitle: "Iscriviti alle nostre Cronache Culinarie",
    newsletterBtn: "Iscriviti",
    newsletterPlaceholder: "La tua email",
    newsletterSuccess: "Grazie per esserti iscritto alla Aurelia Chronicles.",
    specialRequests: "Richieste Speciali (Intolleranze, anniversari, ecc.)",
    bookSuccess: "Il tuo tavolo ad Aurelia è stato riservato!",
    bookSuccessSub: "Ti abbiamo inviato un'email e un SMS di conferma con tutti i dettagli.",
    learnMoreBtn: "La nostra Filosofia",
    chefPhilosophy: "La grande cucina non consiste in design complicati; si tratta di far parlare l'anima pura degli ingredienti con eleganza.",
    allPhotos: "Tutte le Foto",
    favorites: "Solo preferiti",
  }
};

export const STATISTICS = [
  { value: 15, labelKey: "experienceYears", suffix: "+" },
  { value: 50000, labelKey: "customersServed", suffix: "+" },
  { value: 4.9, labelKey: "averageRating", suffix: "" },
  { value: 100, labelKey: "signatureDishes", suffix: "+" }
];

export const DISHES: Dish[] = [
  // Starters
  {
    id: "dish-1",
    name: "Truffle Burrata",
    description: "Creamy Italian Burrata, fresh heirloom tomatoes, white truffle oil, and aged balsamic glaze served with toasted focaccia.",
    price: 24,
    category: "Starters",
    image: "https://i.pinimg.com/736x/50/7d/a6/507da6bd63e91f55d385deea89a44c37.jpg",
    tags: ["Signature", "Creamy", "Aromatic"],
    vegetarian: true,
    spicy: false,
    popular: true,
    chefRecommended: true,
  },
  {
    id: "dish-2",
    name: "Octopus Carpaccio",
    description: "Thinly sliced Mediterranean octopus, Meyer lemon citronette, caper berries, pickled micro-radish, and cold-pressed olive oil.",
    price: 28,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
    tags: ["Seafood", "Delicate"],
    vegetarian: false,
    spicy: false,
    popular: false,
    chefRecommended: true,
  },
  // Soups
  {
    id: "dish-3",
    name: "Roasted Saffron Lobster Bisque",
    description: "Rich and velvety lobster essence infused with Spanish saffron, cognac cream, and butter-poached Maine lobster knuckle pieces.",
    price: 22,
    category: "Soups",
    image: "https://i.pinimg.com/1200x/2c/9a/bf/2c9abf0b60cf910d86bc57599ea5454a.jpg",
    tags: ["Luxury", "Rich"],
    vegetarian: false,
    spicy: false,
    popular: true,
    chefRecommended: false,
  },
  {
    id: "dish-4",
    name: "Forest Mushroom Consume",
    description: "Clear, deeply flavored broth made from wild porcini and chanterelle mushrooms, garnished with dry sherry and fresh thyme.",
    price: 18,
    category: "Soups",
    image: "https://images.unsplash.com/photo-1621996346565-e19759f59963?w=800&q=80",
    tags: ["Earthoy", "Light"],
    vegetarian: true,
    spicy: false,
    popular: false,
    chefRecommended: false,
  },
  // Salads
  {
    id: "dish-5",
    name: "Aurelia Heirloom Salad",
    description: "Organic baby kale, heritage heirloom tomatoes, compressed watermelon, crumbled goat cheese, roasted pumpkin seeds, and champagne dressing.",
    price: 19,
    category: "Salads",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    tags: ["Fresh", "Organic"],
    vegetarian: true,
    spicy: false,
    popular: false,
    chefRecommended: false,
  },
  {
    id: "dish-6",
    name: "Warm Goat Cheese & Fig Salad",
    description: "Pistachio-crusted chèvre, black mission figs, wild arugula, caramelized walnuts, and a honey-lavender emulsion.",
    price: 21,
    category: "Salads",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    tags: ["Warm", "Sweet & Savory"],
    vegetarian: true,
    spicy: false,
    popular: true,
    chefRecommended: true,
  },
  // Main Course
  {
    id: "dish-7",
    name: "Heritage Duck À L'Orange",
    description: "Pan-roasted Barbarie breast, parsnip purée, Grand Marnier citrus reduction, and roasted baby root vegetables.",
    price: 46,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=800&q=80",
    tags: ["Classic", "Flavorsome"],
    vegetarian: false,
    spicy: false,
    popular: false,
    chefRecommended: true,
  },
  // Pasta
  {
    id: "dish-8",
    name: "Black Truffle Cavatelli",
    description: "Hand-rolled cavatelli pasta in a silky pecorino and black winter truffle emulsion, shaved fresh Alba truffles.",
    price: 36,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80",
    tags: ["Shaved Truffles", "Rich"],
    vegetarian: true,
    spicy: false,
    popular: true,
    chefRecommended: true,
  },
  {
    id: "dish-9",
    name: "Spicy Calabrian Prawn Spaghetti",
    description: "House-made artisanal spaghetti, wild red prawns, fiery Calabrian chili oil, cherry tomatoes, and garlic confit.",
    price: 34,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
    tags: ["Seafood", "Fiery"],
    vegetarian: false,
    spicy: true,
    popular: true,
    chefRecommended: false,
  },
  // Pizza
  {
    id: "dish-10",
    name: "The Gold Standard",
    description: "Naples style sourdough, fresh buffalo mozzarella, Prosciutto di San Daniele, shaved white truffles, and edible gold leaf decoration.",
    price: 42,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    tags: ["Luxurious", "Gold Leaf"],
    vegetarian: false,
    spicy: false,
    popular: true,
    chefRecommended: false,
  },
  // Seafood
  {
    id: "dish-11",
    name: "Chilean Sea Bass",
    description: "Pan-seared sea bass over a bed of baby bok choy, lemongrass-ginger dashi, and crisp lotus root chips.",
    price: 49,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    tags: ["Delicated", "Seared"],
    vegetarian: false,
    spicy: false,
    popular: true,
    chefRecommended: true,
  },
  // Steaks
  {
    id: "dish-12",
    name: "Wagyu Ribeye MS9+",
    description: "Aged 12oz Miyazaki Wagyu Ribeye, glazed baby shallots, smoked sea salt flakes, and black garlic demi-glace.",
    price: 110,
    category: "Steaks",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    tags: ["A5 Grade", "Insane Marbling"],
    vegetarian: false,
    spicy: false,
    popular: true,
    chefRecommended: true,
  },
  // Desserts
  {
    id: "dish-13",
    name: "Aurelia Lava Soufflé",
    description: "Warm 72% Valrhona single-origin dark chocolate soufflé with a core of fluid raspberry ganache, toasted pistachio ice cream.",
    price: 18,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    tags: ["Decadent", "Warm"],
    vegetarian: true,
    spicy: false,
    popular: true,
    chefRecommended: true,
  },
  // Beverages
  {
    id: "dish-14",
    name: "The Golden Empress Cocktail",
    description: "Premium Japanese gin, saffron syrup, elderflower liqueur, sparkling champagne, and flakes of real 24k gold leaf.",
    price: 25,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    tags: ["Alcoholic", "Shimmering"],
    vegetarian: true,
    spicy: false,
    popular: true,
    chefRecommended: false,
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    customerName: "Eleanor Vance",
    rating: 5,
    review: "An absolute masterpiece. The Wagyu Ribeye melted in my mouth, and the service was pristine. It feels highly intimate yet grand. We will definitely make Aurelia a regular reservation.",
    role: "Culinary Enthusiast",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80"
  },
  {
    id: "test-2",
    customerName: "Maximilian DuPont",
    rating: 5,
    review: "The truffle cave pasta was theatrical, rich, and unforgettable. The sommelier curated breathtaking pairings for each coarse. Aurelia is undoubtedly our city's premier dining lounge.",
    role: "Michelin Guide Reviewer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
  },
  {
    id: "test-3",
    customerName: "Clara Bellini",
    rating: 5,
    review: "Stunning architecture paired with phenomenal dining. Every dish felt crafted with precise, deliberate care and deep soul. True modern luxury.",
    role: "Interior Architect",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
  },
  {
    id: "test-4",
    customerName: "Aron Sterling",
    rating: 5,
    review: "We booked the Wine Cave for an executive board dinner and my clients were mesmerized. The hospitality of Chef Alain Ducasse and his staff was truly world class.",
    role: "Venture Partner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80"
  },
  {
    id: "test-5",
    customerName: "Siddharth Nair",
    rating: 5,
    review: "Incredible attention to dietary parameters. The custom vegan options they created for my wife were just as inventive and satisfying as the regular fine dining menu.",
    role: "Travel Journalist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
  },
  {
    id: "test-6",
    customerName: "Sophia Lorenza",
    rating: 5,
    review: "Exceptional dining, highly romantic ambiance, and stunning golden lighting. The lava soufflé alone deserves standard accolades. Truly memorable.",
    role: "Sommelier & Influencer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    category: "food",
    imageUrl: "https://i.pinimg.com/736x/50/7d/a6/507da6bd63e91f55d385deea89a44c37.jpg",
    title: "Truffle Burrata Starter",
    description: "Locally sourced creamy burrata surrounded by premium heritage tomatoes and cold-pressed extra virgin oils."
  },
  {
    id: "gal-2",
    category: "interior",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    title: "The Main dining Salon",
    description: "An elegant setting featuring warm velvet booths, gold accents, and custom artistic pendant lighting."
  },
  {
    id: "gal-3",
    category: "chef",
    imageUrl: "https://i.pinimg.com/736x/0b/0f/4f/0b0f4fb9427f205795d4c10abcc297e9.jpg",
    title: "Chef Alain Ducasse",
    description: "Our founding culinary director tasting our signature wood-fired seafood reductions."
  },
  {
    id: "gal-4",
    category: "food",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    title: "Miyazaki Ribeye Steak",
    description: "Sizzled over japanese oak wood and finished with smoked sea salt and micro herb infusions."
  },
  {
    id: "gal-5",
    category: "interior",
    imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    title: "The Golden Bar & Lounge",
    description: "A customized back-lit quartz counter serving rare vintage scotches and shimmer golden cocktails."
  },
  {
    id: "gal-6",
    category: "kitchen",
    imageUrl: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80",
    title: "Behind the Culinary Line",
    description: "Precision, intense focus, and creative chemistry unite in our state-of-the-art kitchen."
  },
  {
    id: "gal-7",
    category: "events",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    title: "Private Anniversary Celebration",
    description: "Tailored luxury set tables for bespoke private event bookings and birthday chronicles."
  },
  {
    id: "gal-8",
    category: "exterior",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    title: "Urban Facade Entrance",
    description: "The sleek glass and cast-iron exterior framed by modern atmospheric warm lighting trees."
  },
  {
    id: "gal-9",
    category: "food",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    title: "The Golden Pizza Sourdough",
    description: "Slow-fermented for 72 hours, topped with creamy buffalo mozzarella and white gold leaf."
  },
  {
    id: "gal-10",
    category: "chef",
    imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80",
    title: "The Culinary Brigade",
    description: "A skilled assembly of world-renowned culinary minds shaping high gastronomic culture."
  },
  {
    id: "gal-11",
    category: "exterior",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    title: "Atmospheric Al Fresco Dining",
    description: "Intimate street-side patio booths sheltered by warm heated gazebos and soft golden string lights."
  },
  {
    id: "gal-12",
    category: "kitchen",
    imageUrl: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&q=80",
    title: "Sauce Reduction Concoctions",
    description: "Hand-stirring aromatic wild jus and dark berry reductions with dedicated focus."
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do you have a dress code at Aurelia Dining?",
    answer: "Yes, we encourage a Smart Elegant dress code. We kindly request guests refrain from wearing athletic wear, beach attire, or torn denim to maintain our sophisticated fine-dining atmosphere."
  },
  {
    id: "faq-2",
    question: "How far in advance can I book a table?",
    answer: "Our booking calendar opens exactly 30 days in advance at 9:00 AM local time daily. For exclusive parties or events of more than 10 people, please contact our events team via our custom contact form."
  },
  {
    id: "faq-3",
    question: "Can you accommodate absolute dietary requirements?",
    answer: "Our chefs have crafted specific vegetarian, vegan, and gluten-free offerings marked in the menu. If you have severe and complex allergies, please mention them in detail inside the reservations special request box."
  },
  {
    id: "faq-4",
    question: "Do you provide valet parking services?",
    answer: "Complimentary professional valet parking is offered to all dining guests. Simply drive up to our main entrance at Urban City Center and hand your keys to the concierge."
  }
];

export const TEAM: TeamMember[] = [
  {
    id: "team-1",
    name: "Chef Alain Ducasse",
    role: "Founding Culinary Director",
    bio: "With legendary culinary mastery across Paris, Monaco, and London, Chef Alain Ducasse has redefined high gastronomy with his immaculate focus on purity, raw materials, and precision french cuisine.",
    image: "https://i.pinimg.com/736x/0b/0f/4f/0b0f4fb9427f205795d4c10abcc297e9.jpg"
  },
  {
    id: "team-2",
    name: "Jean-Phillippe Marceau",
    role: "Sommelier Director",
    bio: "Extensive keeper of the cellar, Jean-Phillippe has engineered an award-winning selection of over 450 rare vintages, specializing in organic biodynamic and heritage European drops.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80"
  },
  {
    id: "team-3",
    name: "Alessia Costa",
    role: "Pastry Creator",
    bio: "Born in Sicily, Alessia turns sugar, flour, and single-origin dark chocolate into complex sculptured desserts that tell a story of regional Italian romance.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80"
  },
  {
    id: "team-4",
    name: "Marcus Sterling",
    role: "General Manager",
    bio: "Marcus oversees everything service-focused. He ensures that from the second you pull up to Aurelia till your final sip, you experience immaculate, silent hospitality.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80"
  }
];

export const AWARDS: Award[] = [
  {
    id: "award-1",
    year: "2024",
    title: "Best Fine Dining Restaurant",
    institution: "National Gastronomy Society",
    description: "Awarded the triple diamond accolade for outstanding menu balance and world-class wine catalog integration."
  },
  {
    id: "award-2",
    year: "2025",
    title: "Michelin Guide Two Stars",
    institution: "The Michelin Red Guide",
    description: "Highly recognized for our culinary consistency, premium local sourcing of ingredients, and theatrical burrata presenting."
  },
  {
    id: "award-3",
    year: "2023",
    title: "Architectural Grand Prize",
    institution: "Modern Design Review",
    description: "Celebrating the fusion of historic city-center concrete with ambient modern luxury gold quartz layout aesthetics."
  }
];

export const TIMELINE: TimelineMilestone[] = [
  {
    year: "2011",
    title: "The Inception",
    description: "Chef Alain Ducasse opens an intimate 8-seat tasting room in the heart of Paris to celebrate localized butter-poached seafood."
  },
  {
    year: "2016",
    title: "Expansion to the City Center",
    description: "Aurelia relocates to a masterfully restored 1920s architecture bank cathedral, building physical seating capacity to 60."
  },
  {
    year: "2021",
    title: "Receiving the First Star",
    description: "Aurelia is awarded its first Michelin Star, triggering a massive wave of tourist and international fine-dining inquiries."
  },
  {
    year: "2025",
    title: "The Gold Standard Era",
    description: "Upgraded with bespoke gold backlight bars, a private wine vault, and fully customized culinary laboratory spaces."
  }
];
