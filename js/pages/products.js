/**
 * SSR — Product Catalogue Controller (products.html)
 */

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { ProductService } from "../services/product-service.js";
import { WhatsAppService } from "../services/whatsapp-service.js";
import { createProductCardElement } from "../components/product-card.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader("products");
  renderFooter();

  const internationalDeliveryLink = document.getElementById("internationalDeliveryLink");
  if (internationalDeliveryLink) {
    internationalDeliveryLink.href = WhatsAppService.buildInquiryUrl(
      "international delivery to my country. Please confirm availability, shipping costs and estimated delivery time."
    );
  }

  const bulkOrderLink = document.getElementById("bulkOrderLink");
  if (bulkOrderLink) {
    bulkOrderLink.href = WhatsAppService.buildInquiryUrl(
      "bulk/catering quantity order (10Kg+). Please share bulk wholesale pricing and dispatch terms."
    );
  }

  // State
  const urlParams = new URLSearchParams(window.location.search);
  let currentSearch = urlParams.get("search") || "";
  let currentSort = "default";

  const gridContainer = document.getElementById("catalogueProductsGrid");
  const countLabel = document.getElementById("productCountLabel");
  const searchInput = document.getElementById("catalogueSearchInput");
  const sortSelect = document.getElementById("catalogueSortSelect");

  if (searchInput && currentSearch) {
    searchInput.value = currentSearch;
  }

  // Search input listener
  searchInput?.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderProducts();
  });

  // Sort listener
  sortSelect?.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  function renderProducts() {
    if (!gridContainer) return;

    const products = ProductService.query({
      search: currentSearch,
      sortBy: currentSort
    });

    if (countLabel) {
      countLabel.textContent = `Showing ${products.length} product${products.length === 1 ? "" : "s"}`;
    }

    gridContainer.innerHTML = "";

    if (products.length === 0) {
      gridContainer.innerHTML = `
        <div class="empty-state-card" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3 class="empty-state-title">No products match your search</h3>
          <p class="empty-state-text">We couldn't find any products matching "${currentSearch}". Try a different search or clear it to see all products.</p>
          <button type="button" class="btn btn-secondary" id="clearSearchBtn">Clear Search</button>
        </div>
      `;

      document.getElementById("clearSearchBtn")?.addEventListener("click", () => {
        currentSearch = "";
        currentSort = "default";
        if (searchInput) searchInput.value = "";
        if (sortSelect) sortSelect.value = "default";
        renderProducts();
      });
      return;
    }

    products.forEach(p => {
      gridContainer.appendChild(createProductCardElement(p));
    });
  }

  // Initial render
  renderProducts();
});
