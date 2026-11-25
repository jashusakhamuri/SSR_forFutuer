/**
 * SSR — Header & Navigation Component
 * Uses the authentic SSR logo from assets/images/ssr_logo_icon.jpg,
 * sticky header, announcement bar, and real-time cart badge.
 * Premium redesign: nav icons, gold/green theme, WhatsApp float, mobile dark drawer.
 */

import { SITE_CONFIG } from "../config/site-config.js";
import { CartService } from "../services/cart-service.js";

export function renderHeader(activePage = "") {
  const headerContainer = document.getElementById("site-header-container");
  if (!headerContainer) return;

  // Auto-detect active page from current window pathname if not explicitly passed
  if (!activePage) {
    const path = window.location.pathname.toLowerCase();
    if (path.endsWith("story.html")) {
      activePage = "story";
    } else if (path.endsWith("products.html") || path.endsWith("product-details.html")) {
      activePage = "products";
    } else if (path.endsWith("cart.html")) {
      activePage = "cart";
    } else if (path.endsWith("contact.html")) {
      activePage = "contact";
    } else if (path.endsWith("index.html") || path.endsWith("/") || path === "") {
      activePage = "home";
    }
  }

  const summary = CartService.getSummary();
  const cartBadgeCount = summary.totalCount;

  const announcementHtml = SITE_CONFIG.announcement.enabled
    ? `
    <div class="announcement-bar" role="region" aria-label="Announcement">
      <div class="site-container announcement-content">
        <span class="announcement-text">
          <svg class="announcement-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:inline-block;vertical-align:middle;margin-right:6px;opacity:0.9;">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zM12 2L4.5 11h3.5v7h8v-7h3.5L12 2z"/>
          </svg>
          ${SITE_CONFIG.announcement.message}
        </span>
        ${SITE_CONFIG.announcement.linkText ? `<a href="${SITE_CONFIG.announcement.linkUrl}" class="announcement-link">${SITE_CONFIG.announcement.linkText} &rarr;</a>` : ""}
      </div>
    </div>
  `
    : "";

  headerContainer.innerHTML = `
    ${announcementHtml}
    <header class="main-header" id="mainHeader">
      <div class="site-container header-inner">
        <!-- Brand Link with Real SSR Farms Logo -->
        <a href="index.html" class="brand-link" aria-label="SSR Farms Home">
          <div class="brand-mark">
            <img 
              src="assets/images/ssr_farms_emblem.png" 
              alt="SSR Farms Emblem" 
              class="brand-logo-img" 
              width="42" 
              height="44" 
              style="object-fit: contain; filter: drop-shadow(0 2px 6px rgba(20,53,34,0.18));"
            />
            <div class="brand-text">
              <span class="brand-name">${SITE_CONFIG.brandName}</span>
              <span class="brand-sub">${SITE_CONFIG.tagline} &bull; Guntur</span>
            </div>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav" aria-label="Main Navigation">
          <ul class="nav-links">
            <li>
              <a href="index.html" class="nav-link ${activePage === "home" ? "active" : ""}">
                <svg class="nav-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="story.html" class="nav-link ${activePage === "story" ? "active" : ""}">
                <svg class="nav-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                <span>Our Story</span>
              </a>
            </li>
            <li>
              <a href="products.html" class="nav-link ${activePage === "products" ? "active" : ""}">
                <svg class="nav-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>
                </svg>
                <span>Products</span>
              </a>
            </li>
            <li>
              <a href="contact.html" class="nav-link ${activePage === "contact" ? "active" : ""}">
                <svg class="nav-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </nav>

        <!-- Header Actions: Search, Cart, Mobile Toggle -->
        <div class="header-actions">
          <button type="button" class="action-btn search-toggle-btn" id="searchToggleBtn" aria-label="Search products">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <a href="cart.html" class="action-btn cart-btn ${activePage === "cart" ? "active" : ""}" aria-label="Shopping Cart (${cartBadgeCount} items)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span class="cart-badge ${cartBadgeCount > 0 ? "has-items" : ""}" id="headerCartBadge">${cartBadgeCount}</span>
          </a>

          <a href="products.html" class="btn btn-chilli btn-sm hide-mobile">
            Shop Karams
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin-left:5px;vertical-align:middle;">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button type="button" class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobileDrawer">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </div>

      <!-- Quick Search Overlay Bar -->
      <div class="search-bar-dropdown" id="searchDropdown" hidden>
        <div class="site-container">
          <form action="products.html" method="get" class="search-form" id="headerSearchForm">
            <input type="search" name="search" class="search-input" id="headerSearchInput" placeholder="Search by karam name, e.g. Guddu Karam, Masala, Nalla, Kobbari..." aria-label="Search spices">
            <button type="submit" class="btn btn-chilli btn-sm">Search</button>
            <button type="button" class="search-close-btn" id="searchCloseBtn" aria-label="Close search">&times;</button>
          </form>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Drawer -->
    <div class="mobile-drawer-overlay" id="mobileDrawerOverlay"></div>
    <div class="mobile-drawer" id="mobileDrawer" aria-hidden="true" style="background:#0B2014">
      <div class="mobile-drawer-header">
        <div class="brand-mark">
          <img src="assets/images/ssr_farms_emblem.png" alt="SSR Farms Emblem" width="36" height="38" style="object-fit: contain; filter: drop-shadow(0 2px 6px rgba(212,168,67,0.3));" />
          <div class="brand-text">
            <span class="brand-name" style="color:#FFFFFF; font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);">${SITE_CONFIG.brandName}</span>
            <span class="brand-sub" style="color:#D4A843;">${SITE_CONFIG.tagline}</span>
          </div>
        </div>
        <button type="button" class="drawer-close-btn" id="drawerCloseBtn" aria-label="Close navigation">&times;</button>
      </div>
      <nav class="mobile-nav" aria-label="Mobile Navigation">
        <ul class="mobile-nav-links">
          <li>
            <a href="index.html" class="mobile-nav-link ${activePage === "home" ? "active" : ""}" style="color:${activePage === "home" ? "#D4A843" : "#FFFFFF"};">
              <svg class="mobile-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Home
            </a>
          </li>
          <li>
            <a href="story.html" class="mobile-nav-link ${activePage === "story" ? "active" : ""}" style="color:${activePage === "story" ? "#D4A843" : "#FFFFFF"};">
              <svg class="mobile-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              Our Story
            </a>
          </li>
          <li>
            <a href="products.html" class="mobile-nav-link ${activePage === "products" ? "active" : ""}" style="color:${activePage === "products" ? "#D4A843" : "#FFFFFF"};">
              <svg class="mobile-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>
              </svg>
              All four blends
            </a>
          </li>
          <li>
            <a href="cart.html" class="mobile-nav-link ${activePage === "cart" ? "active" : ""}" style="color:${activePage === "cart" ? "#D4A843" : "#FFFFFF"};">
              <svg class="mobile-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Shopping Cart
            </a>
          </li>
          <li>
            <a href="contact.html" class="mobile-nav-link ${activePage === "contact" ? "active" : ""}" style="color:${activePage === "contact" ? "#D4A843" : "#FFFFFF"};">
              <svg class="mobile-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Contact &amp; Support
            </a>
          </li>
        </ul>
      </nav>
      <div class="mobile-drawer-footer">
        <a href="products.html" class="btn btn-chilli btn-block">Shop All Products</a>
        <div class="mobile-support-link">
          <span style="color:rgba(253,251,247,0.7);">Need help ordering from Guntur?</span>
          <a href="https://wa.me/${SITE_CONFIG.whatsappNumber}" target="_blank" rel="noopener noreferrer" class="whatsapp-text-link" style="color:#D4A843;">
            Chat on WhatsApp &rarr;
          </a>
        </div>
      </div>
    </div>

    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/${SITE_CONFIG.whatsappNumber}" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  `;

  _initHeaderInteractions();

  CartService.subscribe(summary => {
    const badge = document.getElementById("headerCartBadge");
    if (badge) {
      badge.textContent = summary.totalCount;
      if (summary.totalCount > 0) {
        badge.classList.add("has-items");
      } else {
        badge.classList.remove("has-items");
      }
    }
  });
}

function _initHeaderInteractions() {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileDrawerOverlay");
  const closeBtn = document.getElementById("drawerCloseBtn");

  function openDrawer() {
    drawer?.classList.add("open");
    overlay?.classList.add("open");
    toggleBtn?.setAttribute("aria-expanded", "true");
    drawer?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer?.classList.remove("open");
    overlay?.classList.remove("open");
    toggleBtn?.setAttribute("aria-expanded", "false");
    drawer?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  toggleBtn?.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  overlay?.addEventListener("click", closeDrawer);

  const searchToggle = document.getElementById("searchToggleBtn");
  const searchDropdown = document.getElementById("searchDropdown");
  const searchClose = document.getElementById("searchCloseBtn");
  const searchInput = document.getElementById("headerSearchInput");

  searchToggle?.addEventListener("click", () => {
    const isHidden = searchDropdown.hasAttribute("hidden");
    if (isHidden) {
      searchDropdown.removeAttribute("hidden");
      searchInput?.focus();
    } else {
      searchDropdown.setAttribute("hidden", "");
    }
  });

  searchClose?.addEventListener("click", () => {
    searchDropdown?.setAttribute("hidden", "");
  });

  const header = document.getElementById("mainHeader");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }, { passive: true });
}
