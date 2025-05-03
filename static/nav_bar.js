document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("content");
  const main_content = document.getElementById("main-content");
  const toggleButton = document.getElementById("toggleSidebar");
  const closeButton = document.getElementById("closeSidebar");
  const links = document.querySelectorAll(".nav_bar_container a");

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function closeSidebar() {
    sidebar.classList.add("hidden");
    toggleButton.classList.remove("hidden");
    if (!isMobile()) {
      content.classList.remove("shifted");
      main_content.classList.remove("shifted");
    }
  }

  function toggleSidebar() {
    sidebar.classList.toggle("hidden");
    toggleButton.classList.toggle("hidden");
    if (!isMobile()) {
      content.classList.toggle("shifted");
      main_content.classList.toggle("shifted");
    }
  }

  toggleButton?.addEventListener("click", toggleSidebar);
  closeButton?.addEventListener("click", closeSidebar);

  links.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });
});
