function menu_dropdown() {
  const dropdown_containers = document.querySelectorAll(".dropdown-container");
  dropdown_containers.forEach((dropdown_container) => {
    const menuButton = dropdown_container.querySelector(".menu-dropdown-btn");
    const dropdown_menu = dropdown_container.querySelector(".menu-dropdown");

    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();
      document.querySelectorAll(".menu-dropdown.show").forEach((menu) => {
        if (menu !== dropdown_menu) {
          menu.classList.remove("show");
          menu
            .closest(".dropdown-container")
            .classList.remove("dropdown-active");
        }
      });

      dropdown_menu.classList.toggle("show");
      if (dropdown_menu.classList.contains("show")) {
        dropdown_container.classList.add("dropdown-active");
      } else {
        dropdown_container.classList.remove("dropdown-active");
      }
    });
  });
  // Global click listener to close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    // Check if the click is outside of any dropdown container
    if (!event.target.closest(".dropdown-container")) {
      document.querySelectorAll(".menu-dropdown.show").forEach((menu) => {
        menu.classList.remove("show");
        menu.closest(".dropdown-container").classList.remove("dropdown-active");
      });
    }
  });

  // const category_items = document.querySelectorAll('[id^="category-"]');
  //
  // for (const category_item of category_items) {
  //     const categoryId = category_item.id.replace("category-", "");
  //     const toggle = category_item.querySelector(`#toggle-${categoryId}`);
  //     const dropdown_menu = category_item.querySelector(`#menu-${categoryId}`);
  //     const delete_category = category_item.querySelector(`#delete-container-${categoryId}`);
  //     const dropdown_container = category_item.querySelector('.dropdown-container');
  //     if (toggle && dropdown_menu) {
  //         toggle.addEventListener("click", () => {
  //             dropdown_menu.classList.toggle("show");
  //             if (dropdown_menu.classList.contains("show")) {
  //                 dropdown_container.classList.add('dropdown-active');
  //             } else {
  //                 dropdown_container.classList.remove('dropdown-active');
  //             }
  //         });
  //     }
  //
  //     if (delete_category) {
  //         const delete_button = delete_category.querySelector(`#delete-button-${categoryId}`);
  //         if (delete_button) {
  //             delete_category.addEventListener('click', (e) => {
  //                 const form = delete_category.closest('form');
  //                 console.log(form);
  //                 if (form) form.submit();
  //             });
  //         }
  //     }
  // }
  //
  // document.addEventListener("click", (event) => {
  //     if (!event.target.closest(".menu-dropdown-btn") && !event.target.closest(".menu-dropdown")) {
  //         document.querySelectorAll(".menu-dropdown.show").forEach(menu => {
  //             menu.classList.remove("show");
  //         });
  //         document.querySelectorAll('.dropdown-active').forEach(dropdown => {
  //             dropdown.classList.remove('dropdown-active');
  //         });
  //     }
  // });
}

document.addEventListener("DOMContentLoaded", menu_dropdown);
