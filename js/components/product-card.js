/**
 * SSR — Reusable Product Card Component
 * Accessible product cards shared by the homepage and catalogue.
 * Includes interactive info icon for Ingredients, Best Usage, and SSR Difference.
 */

import { formatCurrency } from "../utils/currency.js";
import { CartService } from "../services/cart-service.js";
import { Toast } from "./toast.js";
import { openInfoModal } from "./info-modal.js";

function createSpiceDotsHTML(rating, heatLevel) {
  const max = 5;
  const dots = Array.from({ length: max }, (_, index) => {
    const filled = index < rating;
    return `<span class="spice-dot ${filled ? "filled" : ""}"></span>`;
  }).join("");

  return `
    <div class="spice-heat-bar">
      <span class="spice-heat-label">Heat</span>
      <span class="spice-dots" aria-hidden="true">${dots}</span>
      <span class="spice-heat-text">${heatLevel}</span>
    </div>
  `;
}

function formatVariantWeight(weight) {
  return weight.replace(/(\d)(kg|g)$/i, "$1 $2");
}

export function createProductCardElement(product) {
  const card = document.createElement("article");
  card.className = "product-card animate-card-fade luxury-card card-gold-shimmer reveal-on-scroll";
  card.setAttribute("data-product-id", product.id);

  const variants = product.variants || [];
  let selectedVariant = variants.find(variant => variant.id === product.defaultVariantId)
    || variants.find(variant => variant.inStock)
    || variants[0];

  if (!selectedVariant) {
    throw new Error(`Product "${product.id}" has no purchasable variants.`);
  }

  const primaryImage = product.images?.[0] || {
    url: "assets/images/goddu_karam.png",
    alt: product.name
  };
  const pairings = (product.bestFor || "").split(",").map(item => item.trim()).filter(Boolean).slice(0, 1);

  card.innerHTML = `
    <div class="card-media-wrapper">
      <div class="card-image-wrap">
        <img
          src="${primaryImage.thumbUrl || primaryImage.url}"
          alt="${primaryImage.alt || product.name}"
          class="card-image"
          loading="lazy"
          width="640"
          height="480"
          onerror="this.src='assets/images/goddu_karam.png'"
        />
      </div>
      <button 
        type="button" 
        class="card-info-trigger-btn" 
        title="View ingredients and specifications for ${product.name}" 
        aria-label="View ingredients and specifications for ${product.name}"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span class="info-btn-text">Ingredients & Use</span>
      </button>
    </div>

    <div class="card-body">
      <div class="card-origin-badge">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12A10 10 0 0 1 12 2z"/><path d="M12 8v4l3 3"/></svg>
        Guntur Harvest Batch
      </div>
      <div class="card-heading">
        ${createSpiceDotsHTML(product.spiceRating || 4, product.heatLevel)}
        <h3 class="card-title">
          <a href="product-details.html?id=${encodeURIComponent(product.id)}">${product.name}</a>
        </h3>
      </div>

      <p class="card-desc">${product.shortDescription}</p>

      ${pairings.length ? `
        <div class="card-pairing-box">
          <span class="pairing-label">Best Paired With</span>
          <span class="pairing-text">${pairings.join(" &bull; ")}</span>
        </div>
      ` : ""}

      <fieldset class="card-variant-selector">
        <legend class="variant-label">Choose pack size</legend>
        <div class="card-variant-options">
          ${variants.map(variant => `
            <button
              type="button"
              class="variant-option ${variant.id === selectedVariant.id ? "is-selected" : ""}"
              data-variant-id="${variant.id}"
              aria-pressed="${variant.id === selectedVariant.id}"
              ${variant.inStock ? "" : "disabled"}
            >${formatVariantWeight(variant.weight)}</button>
          `).join("")}
        </div>
      </fieldset>

      <div class="card-purchase">
        <div class="card-pricing-row" aria-live="polite">
          <div class="card-price-container">
            <span class="card-current-price">${formatCurrency(selectedVariant.price)}</span>
            ${selectedVariant.compareAtPrice > selectedVariant.price
              ? `<span class="card-compare-price">${formatCurrency(selectedVariant.compareAtPrice)}</span>`
              : ""}
          </div>
          <span class="card-unit-label">/${formatVariantWeight(selectedVariant.weight)}</span>
        </div>

        <div class="card-actions">
          <button type="button" class="btn btn-chilli btn-block add-to-cart-btn" data-product-id="${product.id}" ${selectedVariant.inStock ? "" : "disabled"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>${selectedVariant.inStock ? "Add to cart" : "Out of stock"}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const infoBtn = card.querySelector(".card-info-trigger-btn");
  infoBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openInfoModal(product);
  });

  const variantOptions = card.querySelector(".card-variant-options");
  const currentPrice = card.querySelector(".card-current-price");
  const priceContainer = card.querySelector(".card-price-container");
  const unitLabel = card.querySelector(".card-unit-label");
  const addButton = card.querySelector(".add-to-cart-btn");
  const addButtonLabel = addButton.querySelector("span");
  const image = card.querySelector(".card-image");
  let addedFeedbackTimeout;
  let isAddedFeedbackVisible = false;

  image.addEventListener("error", () => {
    const fallbackImage = "assets/images/goddu_karam.png";
    if (!image.src.endsWith(fallbackImage)) {
      image.src = fallbackImage;
      image.alt = `${product.name} spice blend`;
    }
  }, { once: true });

  variantOptions.addEventListener("click", event => {
    const option = event.target.closest(".variant-option");
    if (!option || option.disabled) return;

    const nextVariant = variants.find(variant => variant.id === option.dataset.variantId);
    if (!nextVariant) return;

    selectedVariant = nextVariant;
    variantOptions.querySelectorAll(".variant-option").forEach(button => {
      const isSelected = button === option;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });

    currentPrice.textContent = formatCurrency(selectedVariant.price);
    const comparePrice = priceContainer.querySelector(".card-compare-price");
    if (selectedVariant.compareAtPrice > selectedVariant.price) {
      const price = comparePrice || document.createElement("span");
      price.className = "card-compare-price";
      price.textContent = formatCurrency(selectedVariant.compareAtPrice);
      priceContainer.appendChild(price);
    } else {
      comparePrice?.remove();
    }

    unitLabel.textContent = `/${formatVariantWeight(selectedVariant.weight)}`;
    addButton.disabled = isAddedFeedbackVisible || !selectedVariant.inStock;
    addButtonLabel.textContent = isAddedFeedbackVisible
      ? "Added to cart"
      : selectedVariant.inStock ? "Add to cart" : "Out of stock";
  });

  addButton.addEventListener("click", () => {
    if (addButton.disabled) return;

    const result = CartService.addItem(product.id, selectedVariant.id, 1);
    if (!result.success) {
      Toast.show({
        title: "Couldn't add this item",
        message: result.message || "Please try again.",
        type: "warning"
      });
      return;
    }

    card.classList.add("card-pop-bounce");
    setTimeout(() => card.classList.remove("card-pop-bounce"), 500);
    Toast.show({
      title: "Added to your cart",
      message: `${formatVariantWeight(selectedVariant.weight)} ${product.name} is in your cart.`,
      type: "cart",
      duration: 3500,
      actionUrl: "cart.html",
      actionText: "View cart"
    });

    clearTimeout(addedFeedbackTimeout);
    isAddedFeedbackVisible = true;
    addButton.disabled = true;
    addButton.classList.add("btn-success");
    addButtonLabel.textContent = "Added to cart";
    addedFeedbackTimeout = setTimeout(() => {
      isAddedFeedbackVisible = false;
      addButton.disabled = !selectedVariant.inStock;
      addButton.classList.remove("btn-success");
      addButtonLabel.textContent = selectedVariant.inStock ? "Add to cart" : "Out of stock";
    }, 1500);
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("card-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(card);
  } else {
    card.classList.add("card-visible");
  }

  return card;
}
