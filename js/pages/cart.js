/**
 * SSR — Cart & Checkout Page Controller (cart.html)
 * Implements authoritative cart management, sequential address dropdowns
 * (State -> District -> PIN Code -> Village/Town -> House No & Street -> Landmark),
 * client-side validation, Toast notifications, order review, and WhatsApp order handoff.
 */

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { CartService } from "../services/cart-service.js";
import { WhatsAppService } from "../services/whatsapp-service.js";
import { formatCurrency } from "../utils/currency.js";
import { Validator } from "../utils/validation.js";
import { generateOrderReference } from "../utils/order-reference.js";
import { getStatesList, getDistrictsForState, getSamplePincodes } from "../data/locations.js";
import { Storage } from "../utils/storage.js";
import { Toast } from "../components/toast.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader("cart");
  renderFooter();

  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const emptyCartState = document.getElementById("emptyCartState");
  const cartContentWrapper = document.getElementById("cartContentWrapper");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const internationalCartLink = document.getElementById("internationalCartLink");

  // Summary elements
  const subtotalLabel = document.getElementById("cartSubtotalLabel");
  const itemCountLabel = document.getElementById("cartItemCountLabel");
  const totalLabel = document.getElementById("cartTotalLabel");
  const deliveryPolicyNotice = document.getElementById("deliveryPolicyNotice");

  // Address form elements
  const checkoutForm = document.getElementById("checkoutAddressForm");
  const stateSelect = document.getElementById("addressState");
  const districtSelect = document.getElementById("addressDistrict");
  const pincodeInput = document.getElementById("addressPincode");
  const pincodeSuggestions = document.getElementById("pincodeSuggestions");
  const villageInput = document.getElementById("addressVillage");
  const houseNoInput = document.getElementById("addressHouseNo");
  const landmarkInput = document.getElementById("addressLandmark");
  const customerNameInput = document.getElementById("customerName");
  const customerPhoneInput = document.getElementById("customerPhone");
  const deliveryNotesInput = document.getElementById("deliveryNotes");

  // Review & Submit Section
  const orderReviewSection = document.getElementById("orderReviewSection");
  const reviewCustomerName = document.getElementById("reviewCustomerName");
  const reviewCustomerPhone = document.getElementById("reviewCustomerPhone");
  const reviewAddressDisplay = document.getElementById("reviewAddressDisplay");
  const reviewItemsList = document.getElementById("reviewItemsList");
  const reviewSubtotal = document.getElementById("reviewSubtotal");
  const reviewTotal = document.getElementById("reviewTotal");
  const placeWhatsAppOrderBtn = document.getElementById("placeWhatsAppOrderBtn");
  const editAddressBtn = document.getElementById("editAddressBtn");

  // Populate States Dropdown
  if (stateSelect) {
    const states = getStatesList();
    stateSelect.innerHTML = `<option value="">-- Select Your State --</option>` +
      states.map(s => `<option value="${s}">${s}</option>`).join("");

    stateSelect.addEventListener("change", () => {
      const selectedState = stateSelect.value;
      populateDistricts(selectedState);
    });
  }

  function populateDistricts(stateName) {
    if (!districtSelect) return;
    if (!stateName) {
      districtSelect.innerHTML = `<option value="">-- First Select State --</option>`;
      districtSelect.disabled = true;
      clearPincodeSuggestions();
      return;
    }

    const districts = getDistrictsForState(stateName);
    districtSelect.disabled = false;
    districtSelect.innerHTML = `<option value="">-- Select District --</option>` +
      districts.map(d => `<option value="${d}">${d}</option>`).join("");

    clearPincodeSuggestions();
  }

  districtSelect?.addEventListener("change", () => {
    const stateName = stateSelect?.value;
    const districtName = districtSelect.value;
    updatePincodeSuggestions(stateName, districtName);
  });

  function clearPincodeSuggestions() {
    if (pincodeSuggestions) pincodeSuggestions.innerHTML = "";
  }

  function updatePincodeSuggestions(stateName, districtName) {
    if (!pincodeSuggestions) return;
    const samplePins = getSamplePincodes(stateName, districtName);
    if (samplePins && samplePins.length > 0) {
      pincodeSuggestions.innerHTML = `
        <span style="font-size: 11px; font-weight:700; color: var(--color-charcoal-muted); margin-right: 4px;">Click to Select Pincode:</span>
        ${samplePins.map(pin => `<button type="button" class="pincode-chip" data-pin="${pin}">${pin}</button>`).join(" ")}
      `;

      pincodeSuggestions.querySelectorAll(".pincode-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          if (pincodeInput) {
            pincodeInput.value = chip.dataset.pin;
            pincodeInput.classList.remove("is-invalid");
          }
        });
      });
    } else {
      clearPincodeSuggestions();
    }
  }

  // Pre-fill default/prior address from storage if exists
  const savedAddress = Storage.get("last_checkout_address", null);
  if (savedAddress) {
    if (customerNameInput) customerNameInput.value = savedAddress.name || "";
    if (customerPhoneInput) customerPhoneInput.value = savedAddress.phone || "";
    if (stateSelect && savedAddress.state) {
      stateSelect.value = savedAddress.state;
      populateDistricts(savedAddress.state);
      if (districtSelect && savedAddress.district) {
        districtSelect.value = savedAddress.district;
        updatePincodeSuggestions(savedAddress.state, savedAddress.district);
      }
    }
    if (pincodeInput) pincodeInput.value = savedAddress.pincode || "";
    if (villageInput) villageInput.value = savedAddress.village || "";
    if (houseNoInput) houseNoInput.value = savedAddress.houseNo || "";
    if (landmarkInput) landmarkInput.value = savedAddress.landmark || "";
  }

  // Render Cart Items
  function renderCart() {
    const summary = CartService.getSummary();

    if (summary.totalCount === 0) {
      if (cartContentWrapper) cartContentWrapper.style.display = "none";
      if (emptyCartState) emptyCartState.style.display = "block";
      return;
    }

    if (internationalCartLink) {
      internationalCartLink.href = WhatsAppService.buildInternationalOrderInquiry(summary);
    }

    if (cartContentWrapper) cartContentWrapper.style.display = "grid";
    if (emptyCartState) emptyCartState.style.display = "none";

    // Update Totals
    if (subtotalLabel) subtotalLabel.textContent = formatCurrency(summary.subtotal);
    if (totalLabel) totalLabel.textContent = formatCurrency(summary.estimatedTotal);
    if (itemCountLabel) itemCountLabel.textContent = `${summary.totalCount} pack${summary.totalCount === 1 ? "" : "s"}`;
    if (deliveryPolicyNotice) deliveryPolicyNotice.textContent = summary.deliveryPolicyNotice;

    // Render Rows
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = "";
      summary.items.forEach(item => {
        const row = document.createElement("div");
        row.className = "cart-item-row";
        row.innerHTML = `
          <img src="${item.image}" alt="${item.imageAlt}" class="cart-item-thumb" />
          <div class="cart-item-details">
            <div class="cart-item-header">
              <div>
                <a href="product-details.html?id=${encodeURIComponent(item.productId)}" class="cart-item-name">${item.name}</a>
                <div class="cart-item-variant">${item.variantLabel} &bull; ${formatCurrency(item.unitPrice)} each</div>
              </div>
              <button type="button" class="cart-item-remove-btn" data-product-id="${item.productId}" data-variant-id="${item.variantId}">Remove</button>
            </div>
            <div class="cart-item-controls">
              <div class="qty-stepper">
                <button type="button" class="qty-btn minus" data-product-id="${item.productId}" data-variant-id="${item.variantId}" aria-label="Decrease quantity">&minus;</button>
                <span class="qty-val">${item.quantity}</span>
                <button type="button" class="qty-btn plus" data-product-id="${item.productId}" data-variant-id="${item.variantId}" aria-label="Increase quantity">&plus;</button>
              </div>
              <div class="cart-item-subtotal">${formatCurrency(item.lineSubtotal)}</div>
            </div>
          </div>
        `;

        row.querySelector(".cart-item-remove-btn")?.addEventListener("click", () => {
          CartService.removeItem(item.productId, item.variantId);
          Toast.show({
            title: "Item Removed",
            message: `Removed ${item.name} from cart.`,
            type: "warning",
            duration: 2500
          });
          renderCart();
        });

        row.querySelector(".qty-btn.minus")?.addEventListener("click", () => {
          CartService.updateQuantity(item.productId, item.variantId, item.quantity - 1);
          renderCart();
        });

        row.querySelector(".qty-btn.plus")?.addEventListener("click", () => {
          CartService.updateQuantity(item.productId, item.variantId, item.quantity + 1);
          renderCart();
        });

        cartItemsContainer.appendChild(row);
      });
    }
  }

  // Clear Cart
  clearCartBtn?.addEventListener("click", () => {
    if (confirm("Are you sure you want to remove all items from your cart?")) {
      CartService.clearCart();
      Toast.show({
        title: "Cart Cleared",
        message: "Your shopping cart is now empty.",
        type: "info",
        duration: 2500
      });
      renderCart();
    }
  });

  // Handle Proceed to Order Review Form Submit
  checkoutForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const summary = CartService.getSummary();
    if (summary.totalCount === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }

    let hasError = false;

    function validateField(inputEl, result, errorElId) {
      const errEl = document.getElementById(errorElId);
      if (!result.isValid) {
        inputEl?.classList.add("is-invalid");
        if (errEl) errEl.textContent = result.message;
        hasError = true;
      } else {
        inputEl?.classList.remove("is-invalid");
        if (errEl) errEl.textContent = "";
      }
    }

    validateField(customerNameInput, Validator.validateName(customerNameInput?.value), "nameError");
    validateField(customerPhoneInput, Validator.validateMobile(customerPhoneInput?.value), "phoneError");
    validateField(stateSelect, Validator.validateRequired(stateSelect?.value, "State"), "stateError");
    validateField(districtSelect, Validator.validateRequired(districtSelect?.value, "District"), "districtError");
    validateField(pincodeInput, Validator.validatePincode(pincodeInput?.value), "pincodeError");
    validateField(villageInput, Validator.validateRequired(villageInput?.value, "Village / Town / City"), "villageError");
    validateField(houseNoInput, Validator.validateRequired(houseNoInput?.value, "House No. & Street"), "houseNoError");

    if (hasError) {
      const firstInvalid = document.querySelector(".is-invalid");
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalid?.focus();
      return;
    }

    const currentAddress = {
      name: customerNameInput.value.trim(),
      phone: customerPhoneInput.value.trim(),
      state: stateSelect.value,
      district: districtSelect.value,
      pincode: pincodeInput.value.trim(),
      village: villageInput.value.trim(),
      houseNo: houseNoInput.value.trim(),
      landmark: landmarkInput ? landmarkInput.value.trim() : "",
      instructions: deliveryNotesInput ? deliveryNotesInput.value.trim() : ""
    };
    Storage.set("last_checkout_address", currentAddress);

    showOrderReview(currentAddress, summary);
  });

  let currentPendingOrder = null;

  function showOrderReview(address, summary) {
    const orderRef = generateOrderReference();
    currentPendingOrder = {
      orderReference: orderRef,
      customer: {
        name: address.name,
        phone: address.phone
      },
      address,
      cartSummary: summary
    };

    if (reviewCustomerName) reviewCustomerName.textContent = address.name;
    if (reviewCustomerPhone) reviewCustomerPhone.textContent = `+91 ${address.phone}`;
    if (reviewAddressDisplay) {
      const eHouse = Validator.escapeHtml(address.houseNo);
      const eVillage = Validator.escapeHtml(address.village);
      const eDistrict = Validator.escapeHtml(address.district);
      const eState = Validator.escapeHtml(address.state);
      const ePincode = Validator.escapeHtml(address.pincode);
      const eLandmark = address.landmark ? Validator.escapeHtml(address.landmark) : "";
      const eInstructions = address.instructions ? Validator.escapeHtml(address.instructions) : "";

      reviewAddressDisplay.innerHTML = `
        <strong>${eHouse}</strong><br>
        ${eVillage}, ${eDistrict}, ${eState} — <strong>${ePincode}</strong>
        ${eLandmark ? `<br><span style="color:var(--color-charcoal-muted)">Landmark: ${eLandmark}</span>` : ""}
        ${eInstructions ? `<br><span style="color:var(--color-charcoal-muted)">Instructions: ${eInstructions}</span>` : ""}
      `;
    }

    if (reviewItemsList) {
      reviewItemsList.innerHTML = summary.items.map((item, idx) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px;">
          <span>${idx + 1}. ${item.name} (${item.variantLabel}) &times; ${item.quantity}</span>
          <strong>${formatCurrency(item.lineSubtotal)}</strong>
        </div>
      `).join("");
    }

    if (reviewSubtotal) reviewSubtotal.textContent = formatCurrency(summary.subtotal);
    if (reviewTotal) reviewTotal.textContent = `${formatCurrency(summary.estimatedTotal)} (plus confirmed delivery)`;

    if (orderReviewSection) {
      orderReviewSection.removeAttribute("hidden");
      orderReviewSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  editAddressBtn?.addEventListener("click", () => {
    orderReviewSection?.setAttribute("hidden", "");
    checkoutForm?.scrollIntoView({ behavior: "smooth" });
  });

  placeWhatsAppOrderBtn?.addEventListener("click", () => {
    if (!currentPendingOrder) return;

    currentPendingOrder.cartSummary = CartService.getSummary();

    const orderMsg = WhatsAppService.generateOrderMessage(currentPendingOrder);
    const whatsappUrl = WhatsAppService.buildWhatsAppUrl(orderMsg);

    // Save complete completed order details to sessionStorage for the success screen
    Storage.set("last_placed_order", currentPendingOrder);
    sessionStorage.setItem("ssr_last_order_ref", currentPendingOrder.orderReference);

    // CLEAR CART STORAGE: User has submitted/delivered the order request
    CartService.clearCart();

    // Launch WhatsApp handoff and redirect
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    window.location.href = `order-success.html?ref=${encodeURIComponent(currentPendingOrder.orderReference)}`;
  });

  renderCart();
});
