/**
 * SSR — Product Detail Page Controller (product-details.html)
 * High-Impact UI copy, big pack size toggles (500g, 1Kg, 2Kg), and animated Toast notifications.
 */

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { ProductService } from "../services/product-service.js";
import { CartService } from "../services/cart-service.js";
import { formatCurrency } from "../utils/currency.js";
import { createProductCardElement } from "../components/product-card.js";
import { Toast } from "../components/toast.js";
import { Validator } from "../utils/validation.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader("products");
  renderFooter();

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const container = document.getElementById("productDetailContainer");
  const relatedContainer = document.getElementById("relatedProductsGrid");

  if (!productId || !container) {
    showError("No product specified.");
    return;
  }

  const product = ProductService.getById(productId);
  if (!product) {
    showError("Product not found or currently unavailable.");
    return;
  }

  document.title = `${product.name} — SSR Guntur Mirchi Store`;

  let selectedVariant = product.variants.find(v => v.id === product.defaultVariantId) || product.variants[0];
  let quantity = 1;

  function renderProduct() {
    const hasDiscount = selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price;
    const spiceIcons = "🌶️".repeat(product.spiceRating || 4);

    container.innerHTML = `
      <div class="product-detail-grid">
        <!-- Media Gallery -->
        <div class="product-gallery">
          <div class="detail-gallery-main">
            <img 
              id="mainDetailImage" 
              src="${product.images[0]?.url || ''}" 
              alt="${product.images[0]?.alt || product.name}" 
              loading="eager"
            />
          </div>
          <div class="detail-thumbs">
            ${product.images.map((img, idx) => `
              <button type="button" class="detail-thumb-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}" aria-label="View photo ${idx + 1}">
                <img src="${img.thumbUrl || img.url}" alt="${img.alt}" />
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Product Details Info -->
        <div class="product-detail-info">
          <span class="store-tag">Guntur Mirchi Store &bull; ${product.category}</span>
          <div class="product-detail-telugu">
            ${product.teluguName || ""}
          </div>
          <h1 class="product-detail-title">${product.name}</h1>
          
          <div class="detail-trust-row">
            <span class="badge badge-heat">${spiceIcons} ${product.heatLevel}</span>
            <span class="detail-trust-note">✓ 100% De-Stemmed & Sun-Dried</span>
            <span class="detail-trust-note">✓ No Artificial Colors</span>
          </div>

          <p class="section-desc">${product.description}</p>

          <!-- Pricing Display -->
          <div class="detail-price-box">
            <span class="detail-current-price" id="detailCurrentPrice">${formatCurrency(selectedVariant.price)}</span>
            ${hasDiscount ? `<span class="detail-compare-price" id="detailComparePrice">${formatCurrency(selectedVariant.compareAtPrice)}</span>` : ''}
            <span class="detail-pack-label">per ${selectedVariant.weight} pack</span>
          </div>

          <!-- Pack Size Variants (500g, 1Kg, 2Kg) -->
          <div class="form-group">
            <label class="form-label">Choose Quantity / Pack Size:</label>
            <div class="variant-buttons-group">
              ${product.variants.map(v => `
                <button type="button" class="variant-btn ${v.id === selectedVariant.id ? 'active' : ''}" data-var-id="${v.id}">
                  <strong>${v.label}</strong> — ${formatCurrency(v.price)}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Quantity Stepper & Add to Cart -->
          <div class="detail-actions-row">
            <div class="qty-stepper" aria-label="Select quantity">
              <button type="button" class="qty-btn" id="qtyMinusBtn" aria-label="Decrease quantity">&minus;</button>
              <span class="qty-val" id="qtyVal">${quantity}</span>
              <button type="button" class="qty-btn" id="qtyPlusBtn" aria-label="Increase quantity">&plus;</button>
            </div>

            <button type="button" class="btn btn-chilli btn-lg detail-add-btn" id="detailAddToCartBtn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>Add ${selectedVariant.weight} to Cart</span>
            </button>
          </div>

          <!-- Specifications Table -->
          <table class="specs-table">
            <tbody>
              <tr>
                <th>Best Paired With</th>
                <td><strong class="specs-highlight">${product.bestFor}</strong></td>
              </tr>
              ${product.ingredientsList ? `
              <tr>
                <th>Detailed Composition</th>
                <td>
                  <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:4px;">
                    ${product.ingredientsList.map(ing => `
                      <span class="ingredient-chip">
                        <strong>${ing.name}</strong>
                      </span>
                    `).join("")}
                  </div>
                </td>
              </tr>
              ` : `
              <tr>
                <th>Ingredients</th>
                <td>${product.ingredients}</td>
              </tr>
              `}
              ${product.ourDifference ? `
              <tr>
                <th>SSR vs Market</th>
                <td class="specs-difference">
                  ${product.ourDifference}
                </td>
              </tr>
              ` : ""}
              <tr>
                <th>Purity Standard</th>
                <td>100% De-stemmed pods. Zero Sudan dyes, zero starch fillers, zero artificial oleoresins.</td>
              </tr>
              <tr>
                <th>Storage Advice</th>
                <td>${product.storageInstructions}</td>
              </tr>
              <tr>
                <th>Origin & Soil</th>
                <td>Direct from Guntur District, Andhra Pradesh.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Thumbnails
    const thumbs = container.querySelectorAll(".detail-thumb-btn");
    const mainImg = container.querySelector("#mainDetailImage");
    thumbs.forEach(btn => {
      btn.addEventListener("click", () => {
        thumbs.forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        const idx = parseInt(btn.dataset.idx, 10);
        if (product.images[idx] && mainImg) {
          mainImg.src = product.images[idx].url;
          mainImg.alt = product.images[idx].alt;
        }
      });
    });

    // Variants
    const varButtons = container.querySelectorAll(".variant-btn");
    varButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const varId = btn.dataset.varId;
        const found = product.variants.find(v => v.id === varId);
        if (found) {
          selectedVariant = found;
          renderProduct();
        }
      });
    });

    // Steppers
    const minusBtn = container.querySelector("#qtyMinusBtn");
    const plusBtn = container.querySelector("#qtyPlusBtn");
    const valSpan = container.querySelector("#qtyVal");

    minusBtn?.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        if (valSpan) valSpan.textContent = quantity;
      }
    });

    plusBtn?.addEventListener("click", () => {
      if (quantity < 30) {
        quantity++;
        if (valSpan) valSpan.textContent = quantity;
      }
    });

    // Add to Cart with Toast
    const addBtn = container.querySelector("#detailAddToCartBtn");
    addBtn?.addEventListener("click", () => {
      const res = CartService.addItem(product.id, selectedVariant.id, quantity);
      if (res.success) {
        Toast.show({
          title: "Added to Cart! 🌶️",
          message: `${quantity} × ${selectedVariant.weight} ${product.name} added to your cart.`,
          type: "cart",
          duration: 3500,
          actionUrl: "cart.html",
          actionText: "View Cart & Order"
        });

        const originalText = addBtn.innerHTML;
        addBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Added to Cart!</span>
        `;
        addBtn.classList.add("btn-success");
        setTimeout(() => {
          addBtn.innerHTML = originalText;
          addBtn.classList.remove("btn-success");
        }, 1500);
      }
    });
  }

  function showError(msg) {
    const safeMsg = Validator.escapeHtml(msg);
    container.innerHTML = `
      <div class="empty-state-card">
        <h2 class="empty-state-title">Item Unavailable</h2>
        <p class="empty-state-text">${safeMsg}</p>
        <a href="products.html" class="btn btn-primary">Return to Products</a>
      </div>
    `;
  }

  renderProduct();

  // Populate Related Products
  if (relatedContainer) {
    const related = ProductService.getRelatedProducts(product.id, 3);
    relatedContainer.innerHTML = "";
    related.forEach(p => {
      relatedContainer.appendChild(createProductCardElement(p));
    });
  }
});
