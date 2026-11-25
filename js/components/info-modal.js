/**
 * SSR — Product Information Modal Component
 * Clean, corporate, mobile-friendly dialog displaying verified ingredients,
 * culinary pairing guidelines, and quality differentiation vs supermarket alternatives.
 */

let activeModal = null;
let overlayEl = null;

function ensureOverlay() {
  if (overlayEl) return overlayEl;
  overlayEl = document.createElement("div");
  overlayEl.className = "info-modal-overlay";
  overlayEl.addEventListener("click", closeInfoModal);
  document.body.appendChild(overlayEl);
  return overlayEl;
}

export function openInfoModal(product) {
  if (activeModal) closeInfoModal();

  const overlay = ensureOverlay();
  const modal = document.createElement("div");
  modal.className = "info-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", `${product.name} Specifications`);

  const primaryImage = product.images?.[0] || {
    url: "assets/images/goddu_karam.png",
    alt: product.name
  };

  const ingredientRows = (product.ingredientsList || []).map((ing, idx) => `
    <tr class="info-ingredient-row">
      <td class="info-ing-index">${idx + 1}</td>
      <td class="info-ing-name">
        <strong>${ing.name}</strong>
      </td>
      <td class="info-ing-note">${ing.note || ""}</td>
    </tr>
  `).join("");

  const usageItems = (product.bestUsage || []).map(u => `
    <li class="info-usage-item">
      <span class="info-usage-bullet" aria-hidden="true"></span>
      <span>${u}</span>
    </li>
  `).join("");

  modal.innerHTML = `
    <div class="info-modal-header">
      <div class="info-modal-header-product">
        <img 
          src="${primaryImage.thumbUrl || primaryImage.url}" 
          alt="${product.name}" 
          class="info-modal-thumb"
          width="54" 
          height="54"
          onerror="this.src='assets/images/goddu_karam.png'"
        />
        <div class="info-modal-header-text">
          <span class="info-modal-badge">${product.store || "Guntur Mirchi Store"}</span>
          <h3 class="info-modal-title">${product.name}</h3>
        </div>
      </div>
      <button type="button" class="info-modal-close" aria-label="Close dialog">&times;</button>
    </div>

    <div class="info-modal-body">
      <!-- Ingredients Specification -->
      <section class="info-section">
        <div class="info-section-header">
          <div class="info-section-title-wrap">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            <h4>Ingredient Composition</h4>
          </div>
          <span class="info-section-meta">100% De-Stemmed &bull; Zero Additives</span>
        </div>
        <div class="info-table-wrapper">
          <table class="info-ingredient-table">
            <thead>
              <tr>
                <th style="width: 32px;">#</th>
                <th style="width: 38%;">Ingredient</th>
                <th>Preparation & Quality Standards</th>
              </tr>
            </thead>
            <tbody>
              ${ingredientRows}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Culinary Usage & Pairings -->
      ${usageItems ? `
        <section class="info-section">
          <div class="info-section-header">
            <div class="info-section-title-wrap">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
              <h4>Recommended Culinary Applications</h4>
            </div>
            <span class="info-section-meta">Traditional Andhra Pairings</span>
          </div>
          <ul class="info-usage-list">
            ${usageItems}
          </ul>
        </section>
      ` : ""}

      <!-- Quality Difference Matrix -->
      ${product.ourDifference ? `
        <section class="info-section info-diff-section">
          <div class="info-section-header">
            <div class="info-section-title-wrap">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <h4>Why SSR Differs from Supermarket Brands</h4>
            </div>
          </div>
          <p class="info-diff-text">${product.ourDifference}</p>
        </section>
      ` : ""}
    </div>

    <div class="info-modal-footer">
      <a href="product-details.html?id=${encodeURIComponent(product.id)}" class="btn btn-outline btn-sm">
        View Product Specifications &rarr;
      </a>
      <button type="button" class="btn btn-primary btn-sm info-modal-dismiss-btn">
        Close
      </button>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    overlay.classList.add("is-visible");
    modal.classList.add("is-visible");
  });

  const closeBtn = modal.querySelector(".info-modal-close");
  const dismissBtn = modal.querySelector(".info-modal-dismiss-btn");
  closeBtn?.addEventListener("click", closeInfoModal);
  dismissBtn?.addEventListener("click", closeInfoModal);

  const escHandler = (e) => {
    if (e.key === "Escape") closeInfoModal();
  };
  document.addEventListener("keydown", escHandler);

  activeModal = { modal, escHandler };
}

export function closeInfoModal() {
  if (!activeModal) return;

  const { modal, escHandler } = activeModal;
  document.removeEventListener("keydown", escHandler);

  modal.classList.remove("is-visible");
  overlayEl?.classList.remove("is-visible");

  modal.addEventListener("transitionend", () => {
    modal.remove();
    document.body.style.overflow = "";
  }, { once: true });

  setTimeout(() => {
    if (modal.parentNode) {
      modal.remove();
      document.body.style.overflow = "";
    }
  }, 350);

  activeModal = null;
}
