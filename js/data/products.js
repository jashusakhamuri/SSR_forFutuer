/**
 * SSR — Guntur Mirchi Store Products Catalogue
 * Authentic Guntur farm formulas, exact ingredient breakdowns, usage guide & transparency matrix.
 */

export const PRODUCTS = [
  {
    id: "guntur-goddu-karam",
    slug: "guntur-goddu-karam-egg-fry-special",
    name: "Guntur Goddu Karam",
    store: "Guntur Mirchi Store",
    category: "Signature Specialty Karam",
    heatLevel: "Fiery Hot",
    spiceRating: 5,
    tagline: "The King of Andhra Fry Karams",
    shortDescription: "Sun-dried Guntur Teja chillies de-stemmed and stone-pounded with country garlic, roasted cumin, and whole spices.",
    description: "Every Andhra household knows the magic of Goddu Karam. We pick pure Guntur Teja chillies, sun-dry them until crisp, remove 100% of the stems, and coarse-pound them with whole peeled country garlic and slow-roasted spices. Toss a spoonful over golden ghee-fried eggs, crispy potato fry, or hot steamed rice with a dollop of fresh ghee. Pure rustic flavor, zero chemical dyes.",
    images: [
      {
        url: "assets/images/goddu_karam.png",
        thumbUrl: "assets/images/goddu_karam.png",
        alt: "Guntur Goddu Karam in brass bowl with chillies and garlic",
        caption: "Hand-pounded Goddu Karam with whole country garlic"
      },
      {
        url: "assets/images/hero-chillies-drying.png",
        thumbUrl: "assets/images/hero-chillies-drying.png",
        alt: "Sun drying red chillies in Guntur",
        caption: "Solar-dried on open fabric yards"
      },
      {
        url: "assets/images/story-selecting.png",
        thumbUrl: "assets/images/story-selecting.png",
        alt: "Hand de-stemming chillies",
        caption: "100% de-stemmed by hand"
      }
    ],
    defaultVariantId: "1kg",
    variants: [
      {
        id: "500g",
        label: "500g (Trial Pack)",
        weight: "500g",
        price: 260,
        compareAtPrice: 295,
        inStock: true
      },
      {
        id: "1kg",
        label: "1 Kg (Most Popular Family Pack)",
        weight: "1kg",
        price: 490,
        compareAtPrice: 560,
        inStock: true
      },
      {
        id: "2kg",
        label: "2 Kg (Pantry Saver Pack)",
        weight: "2kg",
        price: 940,
        compareAtPrice: 1080,
        inStock: true
      }
    ],
    stockStatus: "In Stock (Freshly Ground Batch)",
    ingredients: "Sun-Dried Guntur Teja Chillies (100% De-Stemmed), Country Garlic, Coriander Seeds, Cumin Seeds, Mustard Seeds, Fenugreek Seeds, Curry Leaves, Sesame Seeds, Roasted Bengal Gram, Natural Sea Salt.",
    ingredientsList: [
      { name: "Dried Red Chillies (Guntur Teja)", note: "100% manual hand de-stemmed pod flesh. Zero stalk weight cheating." },
      { name: "Country Garlic (Desi Vellulli)", note: "Freshly peeled small-clove local country garlic, cold-pounded." },
      { name: "Coriander Seeds (Dhaniyalu)", note: "Dry-roasted whole on iron tawa for deep, fragrant undertone." },
      { name: "Cumin Seeds (Jeera)", note: "Low-flame toasted to unlock essential digestive oils." },
      { name: "Mustard Seeds (Aavalu)", note: "Lightly cracked for rustic Andhra pungency." },
      { name: "Fenugreek Seeds (Menthulu)", note: "Measured micro-quantity for rich depth and digestive balance." },
      { name: "Curry Leaves (Karivepaku)", note: "Crisp sun-dried whole sprigs stone-crushed into the mix." },
      { name: "Sesame Seeds (Nuvvulu)", note: "Slow-roasted unpolished sesame for nutty aroma and texture." },
      { name: "Roasted Bengal Gram (Putnala Pappu)", note: "Gives coarse rustic body, crunch, and natural binding." },
      { name: "Natural Sea Salt", note: "Pure unrefined solar-crystallized salt, balanced preservation." }
    ],
    ourDifference: "Commercial brands mill whole chillies with stalks and debris to gain 15% to 20% artificial bulk weight, masked with synthetic red color. SSR Goddu Karam is 100% hand de-stemmed, solar-cured for 7 days, and stone-crushed with authentic whole country garlic and roasted spices.",
    bestUsage: [
      "Guddu Roast: Sprinkle 1 tbsp over boiled egg halves sizzling in ghee or groundnut oil.",
      "Nethi Annam: Mix 1 tsp directly into hot piping white rice with melted village cow ghee.",
      "Crispy Aloo & Bendi Fry: Dust during the final 3 minutes of pan roasting for crunchy crust.",
      "Chicken & Mutton Vepudu: Rub into meat cuts as the dry finishing spice crust."
    ],
    storageInstructions: "Store in an airtight ceramic jar or glass container. Always use a clean, dry spoon.",
    allergenInformation: "Contains garlic, sesame, and legumes. 100% Gluten-free. Zero artificial colorants.",
    manufacturerOrPackerDetails: "SSR Foods & Spices, Guntur, Andhra Pradesh.",
    foodLicenceDetails: "FSSAI Registration Ref: Guntur Mirchi Cluster Batch #2026",
    featured: true,
    active: true,
    bestFor: "Guddu Roast (Egg Fry), Nethi Annam (Hot Rice with Ghee), Aloo Fry, Chicken Vepudu, Bendi Fry."
  },
  {
    id: "guntur-masala-karam",
    slug: "guntur-masala-karam-traditional-spice-blend",
    name: "Guntur Masala Karam",
    store: "Guntur Mirchi Store",
    category: "Signature Specialty Karam",
    heatLevel: "Medium-High & Aromatic",
    spiceRating: 4,
    tagline: "Grandmother's All-in-One Curry Karam",
    shortDescription: "Complete Andhra curry base hand-blended with roasted coriander, cumin, fenugreek, cloves, cinnamon, and country garlic.",
    description: "The secret behind rich, authentic Andhra village curries. Instead of measuring separate chilli powder, coriander powder, and garam masala, Masala Karam gives you the complete balanced blend in one spoon. Ripe Guntur chillies stone-pounded with roasted dhaniyalu, jeera, methi, cloves, cinnamon, and country garlic. Thickens gravies naturally with rich color and deep aroma.",
    images: [
      {
        url: "assets/images/masala_karam.png",
        thumbUrl: "assets/images/masala_karam.png",
        alt: "Aromatic Guntur Masala Karam in bowl",
        caption: "Blended with slow-roasted whole spices and garlic"
      },
      {
        url: "assets/images/story-grinding.png",
        thumbUrl: "assets/images/story-grinding.png",
        alt: "Stone grinding of spiced chilli powder",
        caption: "Slow stone pounding locks in essential oils"
      },
      {
        url: "assets/images/recipe-curry.png",
        thumbUrl: "assets/images/recipe-curry.png",
        alt: "Rich Andhra curry prepared with Masala Karam",
        caption: "Velvety, rich restaurant-style gravies"
      }
    ],
    defaultVariantId: "1kg",
    variants: [
      {
        id: "500g",
        label: "500g",
        weight: "500g",
        price: 270,
        compareAtPrice: 310,
        inStock: true
      },
      {
        id: "1kg",
        label: "1 Kg (Standard Family Size)",
        weight: "1kg",
        price: 510,
        compareAtPrice: 590,
        inStock: true
      },
      {
        id: "2kg",
        label: "2 Kg (Pantry Saver Pack)",
        weight: "2kg",
        price: 980,
        compareAtPrice: 1140,
        inStock: true
      }
    ],
    stockStatus: "In Stock (Fresh Batch)",
    ingredients: "Sun-Dried Guntur Chillies (100% De-Stemmed), Whole Coriander Seeds, Cumin Seeds, Country Garlic, Cloves, Cinnamon Bark, Fenugreek Seeds, Mustard Seeds, Turmeric, Sea Salt.",
    ingredientsList: [
      { name: "Sun-Dried Guntur Chillies", note: "De-stemmed pods selected for bright natural crimson tone and punch." },
      { name: "Whole Coriander Seeds", note: "Triple-volume roasted dhaniyalu forming the rich, thick gravy backbone." },
      { name: "Cumin Seeds (Jeera)", note: "Slow dry-roasted to bring earthy, fragrant aroma to gravies." },
      { name: "Country Garlic", note: "Desi garlic crushed into the spice meal during stone pounding." },
      { name: "Cloves (Lavangam)", note: "Adds authentic Andhra warmth and natural preservative properties." },
      { name: "Cinnamon Bark (Dalchina Chekka)", note: "Sweet-spiced woody notes that balance fiery chilli pungency." },
      { name: "Fenugreek Seeds (Menthulu)", note: "Lightly toasted to eliminate bitterness, giving distinct pulusu aroma." },
      { name: "Mustard Seeds (Aavalu)", note: "Provides nutty pungency when cooked into hot oil or boiling sauce." },
      { name: "Pure Turmeric (Pasupu)", note: "High-curcumin turmeric root powder for natural golden-red vibrancy." },
      { name: "Natural Sea Salt", note: "Locks freshness and assists in traditional slow-mortar grinding." }
    ],
    ourDifference: "Factory curry powders rely on spent spice residue, wheat flour husk fillers, and artificial red Sudan dyes. SSR Masala Karam uses whole whole-grade spice berries and pods ground fresh on low-speed stone mills so natural essential spice oils never scorch.",
    bestUsage: [
      "Chepala Pulusu (Fish Curry): Add 2 tbsp straight into tamarind gravy for authentic Guntur style.",
      "Natu Kodi Kura (Country Chicken): Use as single base spice without extra garam masala.",
      "Gutti Vankaya: Mix with roasted peanut paste and oil to stuff whole baby brinjals.",
      "Tomato Rasam & Sambar: Stir in half a spoonful for rich village feast depth."
    ],
    storageInstructions: "Store sealed in a dry container. Shelf life 9 months.",
    allergenInformation: "Naturally gluten-free. Free from artificial fillers.",
    manufacturerOrPackerDetails: "SSR Foods & Spices, Guntur, Andhra Pradesh.",
    foodLicenceDetails: "FSSAI Registration Reference: Guntur Mirchi Cluster Batch #2026",
    featured: true,
    active: true,
    bestFor: "Chepala Pulusu (Fish Curry), Natu Kodi Kura (Chicken Curry), Sambar, Gutti Vankaya, Royyala Kura (Prawns)."
  },
  {
    id: "guntur-nalla-karam",
    slug: "guntur-nalla-karam-sesame-roasted",
    name: "Guntur Nalla Karam",
    store: "Guntur Mirchi Store",
    category: "Everyday Kitchen Essentials",
    heatLevel: "Fiery & Nutty",
    spiceRating: 4,
    tagline: "The Ultimate Dosa & Idli Karam",
    shortDescription: "Traditional tiffin dry chutney karam slow-roasted with black sesame, peanuts, country garlic, and sour tamarind.",
    description: "Famous across Andhra breakfast tables and military hotels. We slow-roast unpolished black sesame seeds, country peanuts, garlic cloves, and cumin over charcoal embers, then coarse-pound them with sun-cured Guntur chillies and dark aged tamarind. Sprinkle over crispy hot Ghee Karam Dosa, fluffy steamed idlis, or mix into hot rice with butter.",
    images: [
      {
        url: "assets/images/nalla_karam.png",
        thumbUrl: "assets/images/nalla_karam.png",
        alt: "Guntur Nalla Karam with roasted sesame seeds",
        caption: "Traditional Guntur Nalla Karam with roasted sesame and garlic"
      },
      {
        url: "assets/images/story-grinding.png",
        thumbUrl: "assets/images/story-grinding.png",
        alt: "Coarse stone pounding",
        caption: "Coarse texture with nutty crunch"
      }
    ],
    defaultVariantId: "1kg",
    variants: [
      {
        id: "500g",
        label: "500g",
        weight: "500g",
        price: 250,
        compareAtPrice: 290,
        inStock: true
      },
      {
        id: "1kg",
        label: "1 Kg (Household Staple)",
        weight: "1kg",
        price: 480,
        compareAtPrice: 550,
        inStock: true
      },
      {
        id: "2kg",
        label: "2 Kg (Season Saver Pack)",
        weight: "2kg",
        price: 920,
        compareAtPrice: 1060,
        inStock: true
      }
    ],
    stockStatus: "In Stock",
    ingredients: "Guntur Red Chillies (De-Stemmed), Roasted Black Sesame Seeds, Roasted Country Peanuts, Country Garlic, Aged Tamarind, Cumin Seeds, Curry Leaves, Roasted Gram, Natural Sea Salt.",
    ingredientsList: [
      { name: "Roasted Black Sesame (Nalla Nuvvulu)", note: "Unpolished dark sesame roasted on cast-iron to release rich healthy oils." },
      { name: "Sun-Dried Guntur Chillies", note: "Medium-hot pods de-stemmed for balanced heat that complements tiffins." },
      { name: "Roasted Peanuts (Verusanaga)", note: "Hand-roasted crunchy groundnuts that give rich coarse grain." },
      { name: "Whole Country Garlic", note: "Unpeeled thin-skin desi garlic for robust rustic tiffin-room punch." },
      { name: "Aged Country Tamarind (Chintapandu)", note: "Fibre-removed sour tamarind pounded directly into the spice mix." },
      { name: "Dry Roasted Cumin Seeds", note: "Provides warm digestive tone and mouthwatering aroma." },
      { name: "Sun-Dried Curry Leaves", note: "Crisped without oil, packed with natural micronutrients." },
      { name: "Roasted Bengal Gram (Putnala Pappu)", note: "Provides crunch and absorbs excess garlic moisture." },
      { name: "Natural Sea Salt", note: "Pure unrefined sea crystals." }
    ],
    ourDifference: "Commercial tiffin powders use stale discarded oilcake, synthetic souring citric acids, and pre-ground sesame dust that turns bitter. We roast whole unpolished black sesame and country peanuts fresh per batch with aged tamarind.",
    bestUsage: [
      "Ghee Karam Dosa: Generously coat hot dosa with ghee, sprinkle 1 tbsp Nalla Karam.",
      "Steamed Hot Idli: Press steaming idli directly into a pool of sesame oil and Nalla Karam.",
      "Upma & Pongal: Sprinkle over savoury porridge dishes for an instant spicy lift.",
      "Plain Rice & Butter: Mix 1 tbsp with warm white rice and fresh homemade butter."
    ],
    storageInstructions: "Store in an airtight jar to preserve crisp roasted sesame crunch.",
    allergenInformation: "Contains sesame and peanuts. Naturally gluten-free.",
    manufacturerOrPackerDetails: "SSR Foods & Spices, Guntur, Andhra Pradesh.",
    foodLicenceDetails: "FSSAI Application Reference: Guntur Mirchi Cluster Batch #2026",
    featured: true,
    active: true,
    bestFor: "Ghee Karam Dosa, Hot Steamed Idli, Upma, Pesarattu, Hot Rice with Butter."
  },
  {
    id: "guntur-kobbari-karam",
    slug: "guntur-kobbari-karam-dry-coconut-spice",
    name: "Guntur Kobbari Karam",
    store: "Guntur Mirchi Store",
    category: "Signature Specialty Karam",
    heatLevel: "Medium Warmth & Sweet-Nutty",
    spiceRating: 3,
    tagline: "Coastal Andhra Coconut Delight",
    shortDescription: "Grated sun-dried mature copra slow-roasted with Guntur chillies, toasted coriander, garlic, and cumin.",
    description: "A traditional Coastal Andhra and Rayalaseema culinary treasure. Prepared from sweet, mature sun-dried copra (dry coconut) roasted until golden and fragrant, then stone-blended with de-stemmed Guntur chillies, fresh country garlic, and roasted coriander. The natural coconut sweetness softens the chilli heat, creating a balanced savory blend.",
    images: [
      {
        url: "assets/images/kobbari_karam.png",
        thumbUrl: "assets/images/kobbari_karam.png",
        alt: "Guntur Kobbari Karam in traditional bowl",
        caption: "Blended with sun-dried roasted coconut"
      },
      {
        url: "assets/images/brand-jar.png",
        thumbUrl: "assets/images/brand-jar.png",
        alt: "SSR Brand Airtight Glass Jar",
        caption: "Hermetically sealed freshness"
      }
    ],
    defaultVariantId: "1kg",
    variants: [
      {
        id: "500g",
        label: "500g",
        weight: "500g",
        price: 250,
        compareAtPrice: 285,
        inStock: true
      },
      {
        id: "1kg",
        label: "1 Kg (Family Pack)",
        weight: "1kg",
        price: 470,
        compareAtPrice: 540,
        inStock: true
      },
      {
        id: "2kg",
        label: "2 Kg (Bulk Household Pouch)",
        weight: "2kg",
        price: 900,
        compareAtPrice: 1040,
        inStock: true
      }
    ],
    stockStatus: "In Stock (Current Harvest)",
    ingredients: "Sun-Dried Mature Coconut (Copra), Sun-Dried Guntur Chillies, Whole Coriander Seeds, Roasted Cumin Seeds, Country Garlic, Roasted Gram, Natural Sea Salt.",
    ingredientsList: [
      { name: "Sun-Dried Mature Coconut (Endu Kobbari)", note: "Prime sun-cured coconut copra with high natural coconut oil content." },
      { name: "Sun-Dried Guntur Chillies", note: "Medium-pungency pods de-stemmed to give balanced warmth without burning." },
      { name: "Whole Coriander Seeds", note: "Gently toasted to amplify sweet, floral, herbal top notes." },
      { name: "Roasted Cumin Seeds", note: "Balances coconut richness with earthy warmth." },
      { name: "Country Garlic", note: "Desi garlic cloves cold-crushed to infuse garlic aroma into the coconut meal." },
      { name: "Roasted Bengal Gram", note: "Maintains dry crumbly mouthfeel and prevents clumping from coconut oils." },
      { name: "Natural Sea Salt", note: "Pure unrefined crystal salt." }
    ],
    ourDifference: "Commercial coconut podi uses defatted industrial coconut flour where all natural coconut oil has been extracted for soap manufacturing, loaded with artificial coconut flavoring. SSR uses intact, full-fat sun-dried copra with zero chemical additives.",
    bestUsage: [
      "Hot Rice with Sesame Oil: Spoon over hot steamed rice with a drizzle of virgin sesame oil.",
      "Breakfast Dosa & Utappam: Spread dry as an aromatic inner filling layer.",
      "Vegetable Stir-Fry Topping: Dust over potato, cabbage, or beans poriyal right before serving.",
      "Rotis & Parathas: Ideal dry accompaniment when you do not have fresh wet chutney."
    ],
    storageInstructions: "Store sealed in a dry container. Shelf life 6 months.",
    allergenInformation: "Contains coconut. 100% Free from artificial colors and preservatives.",
    manufacturerOrPackerDetails: "SSR Foods & Spices, Guntur, Andhra Pradesh.",
    foodLicenceDetails: "FSSAI Application Reference: Guntur Mirchi Cluster Batch #2026",
    featured: true,
    active: true,
    bestFor: "Hot Steamed Rice, Plain Dosa, Chapati, Dal Rice, Potato Fry Topping."
  }
];

export function getAllProducts() {
  return PRODUCTS.filter(p => p.active);
}

export function getProductByIdOrSlug(idOrSlug) {
  if (!idOrSlug) return null;
  return PRODUCTS.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
}

export function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.active && p.featured);
}

export function getProductCategories() {
  const categories = new Set(PRODUCTS.filter(p => p.active).map(p => p.category));
  return Array.from(categories);
}
