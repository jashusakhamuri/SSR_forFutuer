/**
 * SSR — Input Validation Utilities
 * Validates Indian delivery address fields, customer phone, and names.
 */

export const Validator = {
  /**
   * Validates customer full name (at least 2 characters, non-empty)
   */
  validateName(name) {
    if (!name || typeof name !== "string") {
      return { isValid: false, message: "Please enter your full name." };
    }
    const clean = name.trim();
    if (clean.length < 2) {
      return { isValid: false, message: "Name must be at least 2 characters long." };
    }
    return { isValid: true, value: clean };
  },

  /**
   * Validates Indian mobile number (10 digits starting with 6, 7, 8, or 9)
   * Handles optional +91 or 0 prefix
   */
  validateMobile(phone) {
    if (!phone || typeof phone !== "string") {
      return { isValid: false, message: "Please enter your 10-digit mobile number." };
    }
    // Strip non-digits
    let digits = phone.replace(/\D/g, "");
    if (digits.startsWith("91") && digits.length === 12) {
      digits = digits.slice(2);
    } else if (digits.startsWith("0") && digits.length === 11) {
      digits = digits.slice(1);
    }

    if (!/^[6-9]\d{9}$/.test(digits)) {
      return {
        isValid: false,
        message: "Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9)."
      };
    }
    return { isValid: true, value: digits };
  },

  /**
   * Validates Indian 6-digit PIN code (cannot start with 0)
   */
  validatePincode(pincode) {
    if (!pincode || typeof pincode !== "string") {
      return { isValid: false, message: "Please enter your 6-digit postal PIN code." };
    }
    const digits = pincode.replace(/\D/g, "");
    if (!/^[1-9]\d{5}$/.test(digits)) {
      return {
        isValid: false,
        message: "Please enter a valid 6-digit Indian PIN code (e.g. 522001)."
      };
    }
    return { isValid: true, value: digits };
  },

  /**
   * Validates required dropdown/text selections (State, District, Village, House No)
   */
  validateRequired(value, fieldLabel) {
    if (!value || typeof value !== "string" || value.trim().length === 0) {
      return { isValid: false, message: `Please enter or select your ${fieldLabel}.` };
    }
    return { isValid: true, value: value.trim() };
  },

  /**
   * Sanitizes text for safe rendering and message inclusion
   */
  sanitizeText(text) {
    if (!text) return "";
    return String(text)
      .replace(/[\r\n]+/g, " ")
      .trim();
  },

  /**
   * Bulletproof HTML escaping to prevent Cross-Site Scripting (XSS)
   * in dynamic DOM innerHTML insertions.
   */
  escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
};
