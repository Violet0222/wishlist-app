function menu_dropdown() {
  const dropdown_containers = document.querySelectorAll(".dropdown-container");

  dropdown_containers.forEach((dropdown_container) => {
    const menuButton = dropdown_container.querySelector(".menu-dropdown-btn");
    const dropdown_menu = dropdown_container.querySelector(".menu-dropdown");

    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();

      // Close all other open dropdowns
      document.querySelectorAll(".menu-dropdown.show").forEach((menu) => {
        if (menu !== dropdown_menu) {
          menu.classList.remove("show");
          menu
            .closest(".dropdown-container")
            ?.classList.remove("dropdown-active");
        }
      });

      // Toggle current dropdown
      dropdown_menu.classList.toggle("show");
      dropdown_container.classList.toggle(
        "dropdown-active",
        dropdown_menu.classList.contains("show")
      );
    });
  });

  // ✅ Global click to close all dropdowns
  document.addEventListener("click", (event) => {
    const clickedInsideDropdown = event.target.closest(".dropdown-container");

    if (!clickedInsideDropdown) {
      document.querySelectorAll(".menu-dropdown.show").forEach((menu) => {
        menu.classList.remove("show");
        menu
          .closest(".dropdown-container")
          ?.classList.remove("dropdown-active");
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", menu_dropdown);
