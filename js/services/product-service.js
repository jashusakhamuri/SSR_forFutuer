/**
 * SSR — Product Service
 * Encapsulates all catalogue querying, filtering, search, and sorting logic.
 */

import { PRODUCTS, getAllProducts, getProductByIdOrSlug, getFeaturedProducts, getProductCategories } from "../data/products.js";

export const ProductService = {
  getAll() {
    return getAllProducts();
  },

  getFeatured() {
    return getFeaturedProducts();
  },

  getCategories() {
    return getProductCategories();
  },

  getById(idOrSlug) {
    return getProductByIdOrSlug(idOrSlug);
  },

  /**
   * Filter, search, and sort products
   */
  query({ search = "", category = "all", sortBy = "default" } = {}) {
    let results = getAllProducts();

    // Category filter
    if (category && category !== "all") {
      results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Search query filter (matches name, description, ingredients, bestFor)
    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.heatLevel && p.heatLevel.toLowerCase().includes(q)) ||
        (p.bestFor && p.bestFor.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      results.sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;
        return priceA - priceB;
      });
    } else if (sortBy === "price-high") {
      results.sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;
        return priceB - priceA;
      });
    } else if (sortBy === "name-asc") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      results.sort((a, b) => b.name.localeCompare(a.name));
    }

    return results;
  },

  /**
   * Get related products for product details page
   */
  getRelatedProducts(currentProductId, limit = 3) {
    const current = this.getById(currentProductId);
    if (!current) return this.getAll().slice(0, limit);

    return this.getAll()
      .filter(p => p.id !== current.id)
      .sort((a, b) => {
        // Prioritize same category
        if (a.category === current.category && b.category !== current.category) return -1;
        if (b.category === current.category && a.category !== current.category) return 1;
        return 0;
      })
      .slice(0, limit);
  }
};
