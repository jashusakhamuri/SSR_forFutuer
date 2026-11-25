/**
 * SSR — Policy & Static Pages Controller
 */

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader("");
  renderFooter();
});
