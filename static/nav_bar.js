// document.addEventListener("DOMContentLoaded", () => {
//   const sidebar = document.getElementById("sidebar");
//   const content = document.getElementById("main-content");
//   const toggleButton = document.getElementById("toggleSidebar");
//   const closeButton = document.getElementById("closeSidebar");
//   const links = document.querySelectorAll(".nav_bar_container a");

//   toggleButton?.addEventListener("click", () => {
//     sidebar.classList.toggle("hidden");
//     content.classList.toggle("shifted");
//   });

//   closeButton?.addEventListener("click", () => {
//     sidebar.classList.add("hidden");
//     content.classList.remove("shifted");
//   });

//   links.forEach((link) => {
//     link.addEventListener("click", () => {
//       sidebar.classList.add("hidden");
//       content.classList.remove("shifted");
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("main-content");
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
    }
  }

  function toggleSidebar() {
    sidebar.classList.toggle("hidden");
    toggleButton.classList.toggle("hidden");
    if (!isMobile()) {
      content.classList.toggle("shifted");
    }
  }

  toggleButton?.addEventListener("click", toggleSidebar);
  closeButton?.addEventListener("click", closeSidebar);

  links.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });
});
