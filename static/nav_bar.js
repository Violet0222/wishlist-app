document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("main-content");
  const toggleButton = document.getElementById("toggleSidebar");

  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    content.classList.toggle("shifted");
  });
});
