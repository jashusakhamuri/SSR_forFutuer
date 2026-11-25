/**
 * SSR — Authoritative Cart Service
 * Manages cart persistence in localStorage, resolves live product pricing strictly
 * against the product catalogue data (tamper-proof), and publishes change events.
 */

import { Storage } from "../utils/storage.js";
import { ProductService } from "./product-service.js";
import { SITE_CONFIG } from "../config/site-config.js";

const CART_STORAGE_KEY = "shopping_cart_items";
const listeners = new Set();

export const CartService = {
  /**
   * Raw items stored as { productId, variantId, quantity }
   */
  _getRawItems() {
    return Storage.get(CART_STORAGE_KEY, []) || [];
  },

  _saveRawItems(items) {
    const saved = Storage.set(CART_STORAGE_KEY, items);
    if (!saved) return false;
    this._notifyListeners();
    return true;
  },

  _notifyListeners() {
    const summary = this.getSummary();
    listeners.forEach(fn => {
      try {
        fn(summary);
      } catch (err) {
        console.error("[CartService] Listener callback failed:", err);
      }
    });
  },

  /**
   * Subscribe to cart updates (e.g. for header badge and cart page re-renders)
   */
  subscribe(callback) {
    listeners.add(callback);
    // Initial call
    try {
      callback(this.getSummary());
    } catch (e) {}
    return () => listeners.delete(callback);
  },

  /**
   * Add item to cart
   */
  addItem(productId, variantId, quantity = 1) {
    let qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) return { success: false, message: "Invalid quantity." };
    if (qty > 50) qty = 50; // Enforce reasonable maximum for retail orders

    const product = ProductService.getById(productId);
    if (!product) return { success: false, message: "Product not found." };

    const variant = product.variants.find(v => v.id === variantId) || product.variants[0];
    if (!variant) return { success: false, message: "Product variant not found." };

    const items = this._getRawItems();
    const existingIndex = items.findIndex(
      item => item.productId === product.id && item.variantId === variant.id
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity = Math.min(50, items[existingIndex].quantity + qty);
    } else {
      items.push({
        productId: product.id,
        variantId: variant.id,
        quantity: qty
      });
    }

    if (!this._saveRawItems(items)) {
      return { success: false, message: "Your cart could not be saved. Check your browser storage and try again." };
    }
    return {
      success: true,
      message: `Added ${qty} × ${product.name} (${variant.label}) to cart.`,
      product,
      variant
    };
  },

  /**
   * Update item quantity (quantity <= 0 removes it)
   */
  updateQuantity(productId, variantId, quantity) {
    const qty = parseInt(quantity, 10);
    const items = this._getRawItems();

    if (isNaN(qty) || qty <= 0) {
      return this.removeItem(productId, variantId);
    }

    // Limit maximum per line item to prevent erroneous orders
    const maxQty = 50;
    const finalQty = Math.min(qty, maxQty);

    const index = items.findIndex(
      item => item.productId === productId && item.variantId === variantId
    );

    if (index > -1) {
      items[index].quantity = finalQty;
      this._saveRawItems(items);
      return { success: true };
    }
    return { success: false, message: "Item not found in cart." };
  },

  /**
   * Remove item from cart
   */
  removeItem(productId, variantId) {
    const items = this._getRawItems();
    const filtered = items.filter(
      item => !(item.productId === productId && item.variantId === variantId)
    );
    this._saveRawItems(filtered);
    return { success: true };
  },

  /**
   * Clear entire cart
   */
  clearCart() {
    Storage.remove(CART_STORAGE_KEY);
    this._notifyListeners();
    return { success: true };
  },

  /**
   * Returns fully resolved cart items where name, price, images are populated directly
   * from the product catalogue (never trust stored or manipulated client prices)
   */
  getResolvedItems() {
    const rawItems = this._getRawItems();
    const resolved = [];

    for (const raw of rawItems) {
      const product = ProductService.getById(raw.productId);
      if (!product || !product.active) {
        // Obsolete or deactivated product; skip
        continue;
      }

      const variant = product.variants.find(v => v.id === raw.variantId) || product.variants[0];
      if (!variant) continue;

      const unitPrice = variant.price;
      const quantity = Math.max(1, parseInt(raw.quantity, 10) || 1);
      const lineSubtotal = unitPrice * quantity;

      resolved.push({
        productId: product.id,
        variantId: variant.id,
        slug: product.slug,
        name: product.name,
        category: product.category,
        image: product.images[0]?.thumbUrl || product.images[0]?.url || "",
        imageAlt: product.images[0]?.alt || product.name,
        variantLabel: variant.label,
        weight: variant.weight,
        unitPrice,
        quantity,
        lineSubtotal
      });
    }

    return resolved;
  },

  /**
   * Computes complete financial totals and item counts
   */
  getSummary() {
    const items = this.getResolvedItems();
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.lineSubtotal, 0);

    return {
      items,
      totalCount,
      subtotal,
      deliveryPolicyNotice: SITE_CONFIG.delivery.policyNotice,
      // Delivery fee is confirmed before order dispatch
      deliveryFeeLabel: "To be confirmed via WhatsApp",
      estimatedTotal: subtotal
    };
  }
};
