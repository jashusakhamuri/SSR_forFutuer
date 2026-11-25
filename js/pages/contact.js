/**
 * SSR — Contact & Support Page Controller (contact.html)
 */

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { SITE_CONFIG } from "../config/site-config.js";
import { WhatsAppService } from "../services/whatsapp-service.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader("contact");
  renderFooter();

  // Populate dynamic contact fields
  const waBtn = document.getElementById("contactWhatsAppDirect");
  const waNumberDisplay = document.getElementById("contactWhatsAppDisplay");
  const emailDisplay = document.getElementById("contactEmailDisplay");
  const hoursDisplay = document.getElementById("contactHoursDisplay");

  if (waBtn) waBtn.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  if (waNumberDisplay) waNumberDisplay.textContent = SITE_CONFIG.whatsappDisplayNumber;
  if (emailDisplay) {
    emailDisplay.textContent = SITE_CONFIG.supportEmail;
    emailDisplay.href = `mailto:${SITE_CONFIG.supportEmail}`;
  }
  if (hoursDisplay) hoursDisplay.textContent = SITE_CONFIG.businessHours;

  // Contact Quick Message Form
  const inquiryForm = document.getElementById("quickInquiryForm");
  inquiryForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("inquiryName")?.value.trim() || "Customer";
    const topic = document.getElementById("inquiryTopic")?.value || "General Question";
    const msg = document.getElementById("inquiryMessage")?.value.trim() || "";

    const fullMessage = `Hello SSR Team, my name is ${name}. I have an inquiry regarding *${topic}*:\n\n${msg}`;
    const url = WhatsAppService.buildWhatsAppUrl(fullMessage);
    window.open(url, "_blank", "noopener,noreferrer");
  });
});
