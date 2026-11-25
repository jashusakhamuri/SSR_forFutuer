/**
 * SSR — Site Configuration
 * Central single-source-of-truth for SSR brand, contact, business, and policy settings.
 */

export const SITE_CONFIG = {
  // Brand Identity
  brandName: "SSR FARMS",
  brandFullName: "SSR Farms & Foods",
  parentCompany: "SSR Farms",
  tagline: "Purity from Roots",
  subTagline: "Agriculture • Produce • Trust",
  inauguralStoreName: "Guntur Mirchi Store",
  description: "Four signature Andhra karam blends, made in Guntur with sun-dried chillies and traditional spices. Available in 500 g, 1 kg and 2 kg packs.",

  // WhatsApp Business Ordering Channel
  whatsappNumber: "919014119415",
  whatsappDisplayNumber: "+91 90141 19415",
  
  // Customer Support & Contact
  supportEmail: "sjaswanthconnect@gmail.com",
  businessHours: "Monday – Saturday: 8:30 AM – 8:00 PM IST",
  businessLocation: "Guntur District, Andhra Pradesh, India",
  
  // Currency & Formatting
  currency: {
    code: "INR",
    symbol: "₹",
    locale: "en-IN"
  },

  // Announcement Bar
  announcement: {
    enabled: true,
    message: "From Guntur — the land of mirchi.",
    linkText: "Discover our story",
    linkUrl: "story.html"
  },

  // Delivery & Order Policies
  delivery: {
    policyNotice: "India orders: delivery charges are confirmed based on parcel weight and destination PIN code. For international delivery, contact us on WhatsApp for availability, shipping charges and estimated delivery time.",
    estimatedDeliveryTime: "2 to 4 business days across Andhra & Telangana; 4 to 6 days across India",
    minOrderAmount: 240,
    freeShippingThreshold: null
  },

  // Social Channels
  socialLinks: {
    whatsapp: "https://wa.me/919014119415",
    instagram: "",
    facebook: "",
    youtube: ""
  },

  // Compliance
  compliance: {
    fssaiRegistrationStatus: "Registration in progress / To be updated",
    fssaiLicenseNumber: "FSSAI Registration Ref: Guntur Cluster Batch #2026",
    batchTestingNotice: "100% hand-de-stemmed, solar-cured on fabric mats, zero artificial colors or Sudan dye."
  }
};
