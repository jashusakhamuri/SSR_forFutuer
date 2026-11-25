/**
 * SSR — Order Handoff Success Controller (order-success.html)
 * Displays order reference and submitted customer address & items,
 * and clears transient order states appropriately.
 */

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { SITE_CONFIG } from "../config/site-config.js";
import { Storage } from "../utils/storage.js";
import { formatCurrency } from "../utils/currency.js";
import { WhatsAppService } from "../services/whatsapp-service.js";
import { Validator } from "../utils/validation.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader("");
  renderFooter();

  const urlParams = new URLSearchParams(window.location.search);
  const refFromUrl = urlParams.get("ref");
  const refFromStorage = sessionStorage.getItem("ssr_last_order_ref");
  const finalRef = refFromUrl || refFromStorage || "SSR-DIRECT-REQ";

  const refBadge = document.getElementById("displayOrderRef");
  if (refBadge) {
    refBadge.textContent = finalRef;
  }

  // Retrieve placed order details from storage
  const placedOrder = Storage.get("last_placed_order", null);
  const detailsCard = document.getElementById("placedOrderDetailsCard");
  const addressContainer = document.getElementById("placedOrderAddress");
  const itemsContainer = document.getElementById("placedOrderItemsList");
  const totalContainer = document.getElementById("placedOrderTotal");
  const directWhatsAppBtn = document.getElementById("reopenWhatsAppBtn");

  if (placedOrder && detailsCard) {
    detailsCard.style.display = "block";

    const addr = placedOrder.address;
    if (addressContainer && addr) {
      const eName = Validator.escapeHtml(addr.name);
      const ePhone = Validator.escapeHtml(addr.phone);
      const eHouse = Validator.escapeHtml(addr.houseNo);
      const eVillage = Validator.escapeHtml(addr.village);
      const eDistrict = Validator.escapeHtml(addr.district);
      const eState = Validator.escapeHtml(addr.state);
      const ePincode = Validator.escapeHtml(addr.pincode);
      const eLandmark = addr.landmark ? Validator.escapeHtml(addr.landmark) : "";

      addressContainer.innerHTML = `
        <strong>${eName}</strong> (+91 ${ePhone})<br>
        ${eHouse}, ${eVillage}<br>
        ${eDistrict}, ${eState} — <strong>${ePincode}</strong>
        ${eLandmark ? `<br><span style="color:var(--color-charcoal-muted); font-size:12px;">Landmark: ${eLandmark}</span>` : ""}
      `;
    }

    if (itemsContainer && placedOrder.cartSummary && placedOrder.cartSummary.items) {
      itemsContainer.innerHTML = placedOrder.cartSummary.items.map((item, idx) => `
        <div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px solid rgba(0,0,0,0.04);">
          <span>${idx + 1}. ${item.name} (${item.variantLabel}) &times; ${item.quantity}</span>
          <strong>${formatCurrency(item.lineSubtotal)}</strong>
        </div>
      `).join("");
    }

    if (totalContainer && placedOrder.cartSummary) {
      totalContainer.textContent = `${formatCurrency(placedOrder.cartSummary.estimatedTotal)} (plus confirmed delivery)`;
    }

    if (directWhatsAppBtn) {
      const orderMsg = WhatsAppService.generateOrderMessage(placedOrder);
      directWhatsAppBtn.href = WhatsAppService.buildWhatsAppUrl(orderMsg);
    }
  } else if (directWhatsAppBtn) {
    directWhatsAppBtn.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  }
});
