function applyFilter() {
  const filterSelect = document.getElementById("filterSelect");
  const clearFilterBtn = document.getElementById("clearFilterBtn"); // Отримуємо кнопку
  const filterButton = document.querySelector(
    ".dropdown-container .menu-dropdown-btn"
  );
  const filterTooltip =
    filterButton?.querySelector(".tooltip-text") ||
    filterButton?.querySelector("span");

  if (!filterSelect) {
    console.error("Filter select element not found.");
    return;
  }

  const filterValue = filterSelect.value;
  console.log("Applying filter:", filterValue);

  const items = Array.from(
    document.querySelectorAll(".table-row:not(.wishlist-header)")
  );

  if (items.length === 0) {
    console.log("No wishlist items to filter.");
    // Приховати кнопку очищення фільтра, якщо немає елементів
    if (clearFilterBtn) {
      clearFilterBtn.style.display = "none";
    }
    return;
  }

  items.forEach((item) => {
    const statusValue = item.querySelector(".status-cell .status-label")
      ?.dataset.statusValue;
    const isReserved = statusValue === "1";
    const priorityValue = item.querySelector(
      ".priority-cell [data-priority-value]"
    )?.dataset.priorityValue;
    const isPrivate = item.classList.contains("private-item");

    let shouldShow = true;

    if (filterValue === "all") {
      shouldShow = true; // Показуємо всі, якщо вибрано "All Items"
    } else if (filterValue === "reserved") {
      shouldShow = isReserved;
    } else if (filterValue === "not-reserved") {
      shouldShow = !isReserved;
    } else if (filterValue === "priority-low") {
      shouldShow = priorityValue === "0";
    } else if (filterValue === "priority-medium") {
      shouldShow = priorityValue === "1";
    } else if (filterValue === "priority-high") {
      shouldShow = priorityValue === "2";
    } else if (filterValue === "private") {
      shouldShow = isPrivate;
    } else if (filterValue === "not-private") {
      shouldShow = !isPrivate;
    }

    item.style.display = shouldShow ? "" : "none";
  });

  // --- НОВА ЛОГІКА ДЛЯ КНОПКИ "Clear Filter" та підказки ---
  if (filterSelect.value === "all") {
    // Якщо вибрано "All Items", приховуємо кнопку "Clear Filter" та показуємо стандартну підказку
    if (clearFilterBtn) {
      clearFilterBtn.style.display = "none";
    }
    if (filterTooltip) {
      filterTooltip.textContent = "Filter";
    }
  } else {
    // Якщо вибрано інший фільтр, показуємо кнопку "Clear Filter" та оновлюємо підказку
    if (clearFilterBtn) {
      clearFilterBtn.style.display = "inline-block"; // Або 'block'
    }
    if (filterTooltip) {
      const selectedOptionText =
        filterSelect.options[filterSelect.selectedIndex].text;
      filterTooltip.textContent = `Filtered: ${selectedOptionText}`;
    }
  }
  // --- КІНЕЦЬ НОВОЇ ЛОГІКИ ---

  // Close dropdown after filtering
  const dropdown = filterSelect.closest(".dropdown-container");
  if (dropdown) {
    dropdown.querySelector(".menu-dropdown").classList.remove("show");
    dropdown.classList.remove("dropdown-active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.getElementById("filterSelect");
  const clearFilterBtn = document.getElementById("clearFilterBtn"); // Отримуємо кнопку

  if (filterSelect) {
    // Переконайтеся, що "All Items" вибрано на початку
    if (filterSelect.selectedIndex === -1 || filterSelect.value === "") {
      filterSelect.value = "all";
    }

    applyFilter(); // Застосувати фільтр при завантаженні сторінки

    filterSelect.addEventListener("change", applyFilter); // Застосувати фільтр при зміні вибору
  }

  // Додаємо обробник подій для кнопки "Clear Filter"
  if (clearFilterBtn && filterSelect) {
    clearFilterBtn.addEventListener("click", () => {
      filterSelect.value = "all"; // Встановлюємо значення фільтра на "All Items"
      applyFilter(); // Застосовуємо фільтр
      // Додатково: Закриваємо випадаюче меню фільтрації
      const dropdown = clearFilterBtn.closest(".dropdown-container");
      if (dropdown) {
        dropdown.querySelector(".menu-dropdown").classList.remove("show");
        dropdown.classList.remove("dropdown-active");
      }
    });
  }
});
