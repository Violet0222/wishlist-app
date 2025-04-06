function menu_dropdown() {
    const category_items = document.querySelectorAll('[id^="category-"]');


    for (const category_item of category_items){
        const toggle = category_item.querySelector(`#toggle-${category_item.id.split('-')[1]}`);
        const dropdown_menu = category_item.querySelector(`#menu-${category_item.id.split('-')[1]}`);
        const delete_category = category_item.querySelector('[id^="delete-container-"]')
        toggle.addEventListener("click", () => {
            dropdown_menu.classList.toggle("show")
        })
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
