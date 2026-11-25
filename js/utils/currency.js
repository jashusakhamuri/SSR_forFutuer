/**
 * SSR — Currency & Financial Formatting Utilities
 */

import { SITE_CONFIG } from "../config/site-config.js";

/**
 * Format a number as Indian Rupee (INR) string, e.g. "₹210" or "₹1,450"
 */
export function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${SITE_CONFIG.currency.symbol}0`;
  }
  const numericAmount = Math.round(Number(amount));
  return `${SITE_CONFIG.currency.symbol}${numericAmount.toLocaleString(SITE_CONFIG.currency.locale)}`;
}

/**
 * Safely compute line item subtotal
 */
export function calculateLineSubtotal(unitPrice, quantity) {
  const p = Number(unitPrice) || 0;
  const q = parseInt(quantity, 10) || 0;
  return p * Math.max(0, q);
}
