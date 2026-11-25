/**
 * SSR — Story Page Controller (story.html)
 */

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader("story");
  renderFooter();
});
