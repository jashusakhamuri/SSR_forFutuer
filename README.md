# SSR — Guntur Mirchi Store (Authentic Farm-Made Andhra Karam)

> **Brand Tagline:** *"Built on Trust. Grown Together."*  
> **Origin:** Guntur District, Andhra Pradesh (Capital of Mirchi)  
> **Core Products:** Guntur Goddu Karam, Guntur Masala Karam, Guntur Nalla Karam, Guntur Kobbari Karam  
> **Pack Sizes:** 500 g, 1 kg and 2 kg  
> **Architecture:** Pure Static Web Application (Semantic HTML5, Modern CSS3, Modular Vanilla JavaScript ES6+)

---

## 1. Project Overview & Founder Vision

SSR is a direct-from-farm food startup established in **Guntur, Andhra Pradesh**—the world capital of chillies. 

Rather than selling dozens of generic industrial spice packets, SSR focuses exclusively on the **4 traditional Andhra home essentials**:
1. **Guntur Guddu Karam (గుడ్డు కారం):** Iconic egg and fry roast karam hand-pounded with fresh country garlic (vellulli), roasted cumin, dhaniyalu, and fiery Guntur Teja chillies.
2. **Guntur Masala Karam (మసాలా కారం):** Traditional all-in-one curry karam blended with roasted coriander, cumin, fenugreek, cloves, and whole garlic.
3. **Guntur Nalla Karam (నల్ల కారం):** A roasted sesame, peanut and chilli blend for dosa, idli and rice.
4. **Guntur Kobbari Karam (కొబ్బరి కారం):** A coconut and chilli blend for rice, dosa and everyday meals.

---

## 2. How SSR Differs from Supermarket Brands (The 5-Step Process)

1. **Handpicking from Guntur Fields:** Plucking only ripe, glossy red pods from black cotton soil fields.
2. **Open Sunlight Solar Curing:** Solar-dried for 5 to 7 days on hygienic fabric floors in Andhra sunshine to lock in natural carotenoids.
3. **100% Manual Hand De-Stemming:** Removing every green stem and dirt particle by hand. Zero stem weight cheating.
4. **Slow Stone Pounding with Garlic & Roasted Spices:** Low-friction traditional pounding that preserves volatile capsaicin aroma.
5. **Fresh Sealed Packaging:** Packed with care in 500 g, 1 kg and 2 kg pouches.

---

## 3. High-Animation & Modern UX Features

- **Toast Notifications:** Built-in animated Toast system (`Toast.show({...})`) delivering visual feedback when items are added to cart or modified, with auto-dismissal and direct checkout links.
- **Card Micro-Interactions:** Subtle card feedback and live price recalculations when switching between 500 g, 1 kg and 2 kg options.
- **Sequential Address Dropdowns:** State dropdown &rarr; dynamically populated District dropdown &rarr; PIN code suggestion chips &rarr; Village/Town &rarr; House No. (H-No) &rarr; Landmark.
- **WhatsApp Order Handoff:** Client-side validated order summary encoded into an official WhatsApp click-to-chat URL (`https://wa.me/...`).

---

## 4. How to Run Locally

Because the project utilizes native ES6 JavaScript modules (`import`/`export`), it must be served through an HTTP/HTTPS protocol:

```bash
cd C:\Users\admin\.gemini\antigravity\scratch\ssr
python -m http.server 8000
```
Then open your browser at:
`http://localhost:8000`

---

## 5. File Registry & Quick Links

- [index.html](file:///C:/Users/admin/.gemini/antigravity/scratch/ssr/index.html) — Guntur-focused homepage with an origin story, five-step preparation process, Andhra cooking context, and links to the catalogue.
- [story.html](file:///C:/Users/admin/.gemini/antigravity/scratch/ssr/story.html) — The Guntur farmer story, plucking, sun-drying, stem removal, and traditional pounding.
- [products.html](file:///C:/Users/admin/.gemini/antigravity/scratch/ssr/products.html) — Catalogue of the four core Guntur karams in 500 g, 1 kg and 2 kg packs with live search.
- [product-details.html](file:///C:/Users/admin/.gemini/antigravity/scratch/ssr/product-details.html) — Detailed view with pack size buttons, spice heat scale, and recipe pairings.
- [cart.html](file:///C:/Users/admin/.gemini/antigravity/scratch/ssr/cart.html) — Sequential address checkout with State/District dropdowns and WhatsApp order handoff.
- [toast.js](file:///C:/Users/admin/.gemini/antigravity/scratch/ssr/js/components/toast.js) — High animation toast notification manager.
- [products.js](file:///C:/Users/admin/.gemini/antigravity/scratch/ssr/js/data/products.js) — Authoritative catalogue with Goddu, Masala, Nalla and Kobbari Karam.
- [IMAGE-SOURCES.md](file:///C:/Users/admin/.gemini/antigravity/scratch/ssr/assets/images/IMAGE-SOURCES.md) — Sourcing and licensing manifest for all agricultural photography.
