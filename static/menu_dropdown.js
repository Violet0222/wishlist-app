function menu_dropdown() {
    const category_items = document.querySelectorAll('[id^="category-"]');

    for (const category_item of category_items) {
        const categoryId = category_item.id.replace("category-", "");
        const toggle = category_item.querySelector(`#toggle-${categoryId}`);
        const dropdown_menu = category_item.querySelector(`#menu-${categoryId}`);
        const delete_category = category_item.querySelector(`#delete-container-${categoryId}`);

        if (toggle && dropdown_menu) {
            toggle.addEventListener("click", () => {
                dropdown_menu.classList.toggle("show");
            });
        }

        if (delete_category) {
            const delete_button = delete_category.querySelector(`#delete-button-${categoryId}`);
            if (delete_button) {
                delete_category.addEventListener('click', (e) => {
                    // e.preventDefault();
                    const form = delete_category.closest('form');
                    console.log(form);
                    if (form) form.submit();
                });
            }
        }
    }

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".menu-btn") && !event.target.closest(".menu-dropdown")) {
            document.querySelectorAll(".menu-dropdown.show").forEach(menu => {
                menu.classList.remove("show");
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", menu_dropdown);
