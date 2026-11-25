/**
 * SSR — Order Reference Utility
 * Generates an intelligible, readable local order reference for customer service tracking.
 * Stored locally during the checkout handoff to display on order-success.html.
 */

export function generateOrderReference() {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  
  // 4 random alphanumeric characters (omitting confusing characters like 0, O, 1, I)
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `SSR-${year}${month}${day}-${randomPart}`;
}
