/**
 * SSR — Footer Component
 * Consistent brand footer with navigation, 4 core Guntur products,
 * WhatsApp channel, and transparent business disclosures.
 */

import { SITE_CONFIG } from "../config/site-config.js";

export function renderFooter() {
  const footerContainer = document.getElementById("site-footer-container");
  if (!footerContainer) return;

  const currentYear = new Date().getFullYear();

  footerContainer.innerHTML = `
    <footer class="site-footer" role="contentinfo">
      <!-- Trust Banner Ribbon -->
      <div class="footer-trust-ribbon">
        <div class="site-container ribbon-grid">
          <div class="ribbon-item">
            <svg class="ribbon-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <div>
              <strong>100% De-Stemmed Guntur Chillies</strong>
              <p>Stems removed pod-by-pod. Zero bitter stem weight cheating.</p>
            </div>
          </div>
          <div class="ribbon-item">
            <svg class="ribbon-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div>
              <strong>Pure Solar-Cured Natural Red</strong>
              <p>Zero Sudan dyes, synthetic brighteners, or starch fillers.</p>
            </div>
          </div>
          <div class="ribbon-item">
            <svg class="ribbon-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <div>
              <strong>Direct WhatsApp Dispatch</strong>
              <p>Fresh batch verified & postal rate calculated before you pay.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Footer Columns -->
      <div class="site-container footer-main">
        <div class="footer-grid">
          <!-- Col 1: Brand Info -->
          <div class="footer-col brand-col">
            <a href="index.html" class="footer-brand" aria-label="SSR Farms Home">
              <div class="brand-mark" style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
                <img 
                  src="assets/images/ssr_farms_emblem.png" 
                  alt="SSR Farms Emblem" 
                  width="46" 
                  height="48" 
                  style="object-fit: contain; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));"
                />
                <div class="brand-text">
                  <span class="brand-name" style="color: #FFFFFF; font-family: var(--font-serif); font-size: 1.6rem; letter-spacing: 0.05em; font-weight: 700; line-height: 1;">${SITE_CONFIG.brandName}</span>
                  <span style="color: #D49B35; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; display: block; margin-top: 3px;">${SITE_CONFIG.subTagline}</span>
                </div>
              </div>
            </a>
            <p class="brand-tagline-text" style="color: #FBBF24; font-weight: 600; font-size: 0.95rem; margin-bottom: 8px;">${SITE_CONFIG.tagline}</p>
            <p class="footer-desc">${SITE_CONFIG.description}</p>
            
            <div class="compliance-badge">
              <span class="badge-label">Guntur Agricultural Cluster</span>
              <p class="compliance-text">100% Sun-Dried in Andhra Pradesh &bull; Fresh Milling</p>
            </div>

            <!-- Social Media & Contact Links -->
            <div class="footer-social-row" aria-label="Social Channels">
              <a href="https://wa.me/${SITE_CONFIG.whatsappNumber}" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.838 11.838 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.18-1.238-6.168-3.486-8.414z"/>
                </svg>
              </a>
              <a href="https://instagram.com" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://youtube.com" class="social-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Watch on YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          <!-- Col 2: Navigation Links -->
          <div class="footer-col">
            <h3 class="footer-heading">Quick Links</h3>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="story.html">Our Story</a></li>
              <li><a href="products.html">All four blends</a></li>
              <li><a href="cart.html">Cart & WhatsApp Checkout</a></li>
              <li><a href="contact.html">Customer Support & FAQs</a></li>
            </ul>
          </div>

          <!-- Col 3: The 4 Signature Products -->
          <div class="footer-col">
            <h3 class="footer-heading">${SITE_CONFIG.inauguralStoreName}</h3>
            <ul class="footer-links">
              <li><a href="product-details.html?id=guntur-goddu-karam">Goddu Karam (గుడ్డు కారం)</a></li>
              <li><a href="product-details.html?id=guntur-masala-karam">Masala Karam (మసాలా కారం)</a></li>
              <li><a href="product-details.html?id=guntur-nalla-karam">Nalla Karam (నల్ల కారం)</a></li>
              <li><a href="product-details.html?id=guntur-kobbari-karam">Kobbari Karam (కొబ్బరి కారం)</a></li>
            </ul>
          </div>

          <!-- Col 4: Direct WhatsApp Support -->
          <div class="footer-col">
            <h3 class="footer-heading">Order Direct from Guntur</h3>
            <p class="support-intro">Speak directly with our team in Guntur for batch inquiries, custom grinding, and parcel tracking:</p>
            <a href="https://wa.me/${SITE_CONFIG.whatsappNumber}" target="_blank" rel="noopener noreferrer" class="whatsapp-badge-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.838 11.838 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.18-1.238-6.168-3.486-8.414z"/>
              </svg>
              <span>WhatsApp: ${SITE_CONFIG.whatsappDisplayNumber}</span>
            </a>
            <div class="footer-meta-item">
              <span class="meta-label">Hours:</span>
              <span>${SITE_CONFIG.businessHours}</span>
            </div>
            <div class="footer-meta-item">
              <span class="meta-label">Hub:</span>
              <span>Guntur District, Andhra Pradesh</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="site-container footer-bottom-inner">
          <p class="copyright-text">&copy; ${currentYear} ${SITE_CONFIG.parentCompany}. All rights reserved. Guntur Mirchi Store is a proprietary direct-to-consumer trademark.</p>
          <ul class="policy-links">
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms & Conditions</a></li>
            <li><a href="shipping-returns.html">Shipping & Returns</a></li>
          </ul>
        </div>
      </div>
    </footer>
  `;
}
