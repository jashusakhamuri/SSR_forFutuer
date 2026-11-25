/**
 * SSR — WhatsApp Ordering Service
 * Formats structured order messages according to strict brand specifications
 * and generates official WhatsApp click-to-chat links.
 */

import { SITE_CONFIG } from "../config/site-config.js";
import { formatCurrency } from "../utils/currency.js";

export const WhatsAppService = {
  /**
   * Generates formatted text message for WhatsApp
   */
  generateOrderMessage({ orderReference, customer, address, cartSummary }) {
    const lines = [];

    lines.push(`*${SITE_CONFIG.brandName.toUpperCase()} — ORDER REQUEST*`);
    lines.push(`Order Reference: *${orderReference}*`);
    lines.push("");

    // Customer details
    lines.push("*CUSTOMER DETAILS*");
    lines.push(`Name: ${customer.name}`);
    lines.push(`Phone: +91 ${customer.phone}`);
    lines.push("");

    // Delivery Address
    lines.push("*DELIVERY ADDRESS*");
    lines.push(`State: ${address.state}`);
    lines.push(`District: ${address.district}`);
    lines.push(`PIN Code: ${address.pincode}`);
    lines.push(`Village / Town / City: ${address.village}`);
    lines.push(`House No. / Street: ${address.houseNo}`);
    if (address.landmark && address.landmark.trim().length > 0) {
      lines.push(`Landmark: ${address.landmark.trim()}`);
    }
    if (address.instructions && address.instructions.trim().length > 0) {
      lines.push(`Delivery Instructions: ${address.instructions.trim()}`);
    }
    lines.push("");

    // Order Items
    lines.push("*ORDER ITEMS*");
    cartSummary.items.forEach((item, index) => {
      lines.push(`${index + 1}. *${item.name}*`);
      lines.push(`   Variant: ${item.variantLabel}`);
      lines.push(`   Quantity: ${item.quantity}`);
      lines.push(`   Unit Price: ${formatCurrency(item.unitPrice)}`);
      lines.push(`   Subtotal: ${formatCurrency(item.lineSubtotal)}`);
    });
    lines.push("");

    // Order Summary
    lines.push("*ORDER SUMMARY*");
    lines.push(`Total Items: ${cartSummary.totalCount}`);
    lines.push(`Product Subtotal: ${formatCurrency(cartSummary.subtotal)}`);
    lines.push(`Delivery Charges: ${cartSummary.deliveryFeeLabel}`);
    lines.push(`Estimated Total: *${formatCurrency(cartSummary.estimatedTotal)}* (plus delivery)`);
    lines.push("");

    // Closing
    lines.push("Please confirm product availability, delivery charges for my pincode, and expected delivery date.");
    lines.push("");
    lines.push(`Thank you for choosing ${SITE_CONFIG.brandName}.`);

    return lines.join("\n");
  },

  /**
   * Generates the official wa.me link with encoded text
   */
  buildWhatsAppUrl(messageText) {
    // Sanitize business phone number: strictly numbers only
    const cleanNumber = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
    const encoded = encodeURIComponent(messageText);
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  },

  /**
   * Generates general inquiry / customer support WhatsApp link
   */
  buildInquiryUrl(subject = "General Inquiry") {
    const cleanNumber = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
    const text = encodeURIComponent(`Hello SSR Team, I have a question regarding: ${subject}`);
    return `https://wa.me/${cleanNumber}?text=${text}`;
  },

  buildInternationalOrderInquiry(cartSummary) {
    const items = cartSummary.items
      .map(item => `- ${item.name} (${item.variantLabel}) x ${item.quantity}`)
      .join("\n");
    const message = [
      "Hello SSR Team, I would like to arrange an international order.",
      "",
      "Items:",
      items,
      "",
      "Please confirm delivery availability, shipping charges and estimated delivery time for my country. I understand destination customs or import charges may apply separately."
    ].join("\n");

    return this.buildWhatsAppUrl(message);
  }
};
