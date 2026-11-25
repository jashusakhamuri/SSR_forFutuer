/**
 * SSR — High-Animation Toast Notification System
 * Renders sleek, animated floating toasts with slide-in effects, icon badges,
 * and automatic dismissal for real-time customer feedback.
 */

class ToastManager {
  constructor() {
    this.container = null;
    this._initContainer();
  }

  _initContainer() {
    if (document.getElementById("ssr-toast-container")) {
      this.container = document.getElementById("ssr-toast-container");
      return;
    }
    const container = document.createElement("div");
    container.id = "ssr-toast-container";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    document.body.appendChild(container);
    this.container = container;
  }

  /**
   * Show a toast notification
   * @param {Object} options
   * @param {string} options.title - Toast title
   * @param {string} options.message - Toast description
   * @param {'success'|'info'|'warning'|'cart'} [options.type='success']
   * @param {number} [options.duration=3200] - Duration in ms
   * @param {string} [options.actionUrl] - Optional link
   * @param {string} [options.actionText] - Optional link text
   */
  show({ title, message, type = "success", duration = 3200, actionUrl = null, actionText = null }) {
    this._initContainer();

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;

    let iconSvg = "";
    if (type === "cart" || type === "success") {
      iconSvg = `
        <svg class="toast-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
    } else if (type === "warning") {
      iconSvg = `
        <svg class="toast-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      `;
    } else {
      iconSvg = `
        <svg class="toast-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      `;
    }

    toast.innerHTML = `
      <div class="toast-icon-wrap">${iconSvg}</div>
      <div class="toast-content">
        <strong class="toast-title">${title}</strong>
        <p class="toast-desc">${message}</p>
        ${actionUrl && actionText ? `<a href="${actionUrl}" class="toast-action">${actionText} &rarr;</a>` : ""}
      </div>
      <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
      <div class="toast-progress-bar" style="animation-duration: ${duration}ms;"></div>
    `;

    const closeBtn = toast.querySelector(".toast-close");
    let timer = null;

    const dismiss = () => {
      clearTimeout(timer);
      toast.classList.add("toast-leaving");
      toast.addEventListener("animationend", () => {
        toast.remove();
      }, { once: true });
    };

    closeBtn.addEventListener("click", dismiss);
    timer = setTimeout(dismiss, duration);

    this.container.appendChild(toast);
  }
}

export const Toast = new ToastManager();
