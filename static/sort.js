function applySort() {
  const sortSelect = document.getElementById("sortSelect");
  const sortInfo = document.getElementById("sortInfo"); // Отримуємо sortInfo тут
  const hasItems =
    document.querySelectorAll(".table-row:not(.wishlist-header)").length > 0;

  if (!sortSelect) {
    return;
  }

  const sortValue = sortSelect.value;
  const sortField = sortValue.split("-")[0];
  // const sortOrder = sortValue.split("-")[1]; // Змінна більше не потрібна тут, якщо вона не використовується далі

  const rows = Array.from(
    document.querySelectorAll(".table-row:not(.wishlist-header)")
  );

  rows.sort((a, b) => {
    // Handle "Default Order"
    if (sortField === "default") {
      // Sort by the numerical ID of the item to restore original order
      const aIdNum = parseInt(a.id.replace("item-", ""));
      const bIdNum = parseInt(b.id.replace("item-", ""));
      return aIdNum - bIdNum;
    }

    // Existing sorting logic for other fields (same as before)
    const aId = a.id.replace("item-", "");
    const bId = b.id.replace("item-", "");
    let aValue, bValue;

    switch (sortField) {
      case "date":
        const aDateText =
          document.querySelector(`#value-date-${aId}`)?.textContent || "";
        const bDateText =
          document.querySelector(`#value-date-${bId}`)?.textContent || "";
        aValue = new Date(aDateText);
        bValue = new Date(bDateText);
        if (isNaN(aValue)) aValue = new Date(0);
        if (isNaN(bValue)) bValue = new Date(0);
        break;
      case "status":
        aValue = parseInt(
          document.querySelector(`#value-status-${aId}`)?.dataset.statusValue
        );
        bValue = parseInt(
          document.querySelector(`#value-status-${bId}`)?.dataset.statusValue
        );
        aValue = isNaN(aValue) ? 0 : aValue;
        bValue = isNaN(bValue) ? 0 : bValue;
        break;
      case "priority":
        aValue = parseInt(
          document.querySelector(`#value-priority-${aId}`)?.dataset
            .priorityValue
        );
        bValue = parseInt(
          document.querySelector(`#value-priority-${bId}`)?.dataset
            .priorityValue
        );
        aValue = isNaN(aValue) ? -1 : aValue;
        bValue = isNaN(bValue) ? -1 : bValue;
        break;
      case "price":
        aValue = parseFloat(
          document.querySelector(`#value-price-${aId}`)?.textContent
        );
        bValue = parseFloat(
          document.querySelector(`#value-price-${bId}`)?.textContent
        );
        // Залишаємо logic з Infinity/ -Infinity
        if (sortValue.endsWith("-asc")) {
          // Використовуємо sortValue для визначення порядку
          aValue = isNaN(aValue) ? Infinity : aValue;
          bValue = isNaN(bValue) ? Infinity : bValue;
        } else {
          aValue = isNaN(aValue) ? -Infinity : aValue;
          bValue = isNaN(bValue) ? -Infinity : bValue;
        }
        break;
      case "title":
      case "description":
      case "currency":
      case "list_name":
      case "url":
      case "wanted_by":
        aValue =
          document.querySelector(`#value-${sortField}-${aId}`)?.textContent ||
          "";
        bValue =
          document.querySelector(`#value-${sortField}-${bId}`)?.textContent ||
          "";
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
        break;
      default:
        aValue = 0;
        bValue = 0;
    }

    if (sortValue.endsWith("-asc")) {
      // Використовуємо sortValue для визначення порядку
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  const tableContainer = document.querySelector(".table");
  const currentRows = Array.from(
    tableContainer.querySelectorAll(".table-row:not(.wishlist-header)")
  );
  currentRows.forEach((row) => row.remove());

  rows.forEach((row) => tableContainer.appendChild(row));

  // --- НОВА ЛОГІКА ДЛЯ sortInfo та кнопки сортування ---
  const sortButton = document.querySelector(".menu-dropdown-btn");

  if (sortSelect.value === "default") {
    // Якщо вибрано "Default Order", очищаємо sortInfo
    if (sortInfo) {
      sortInfo.textContent = "";
    }
    // Кнопка "Clear Sort" прихована/неактивна, коли вже обраний Default
    if (document.getElementById("clearSortBtn")) {
      document.getElementById("clearSortBtn").style.display = "none";
    }
  } else {
    // Якщо вибрано інший порядок, показуємо sortInfo
    if (sortInfo) {
      const selectedOptionText =
        sortSelect.options[sortSelect.selectedIndex].text;
      sortInfo.textContent = `Sorted by: ${selectedOptionText}`;
    }
    // Кнопка "Clear Sort" видима
    if (document.getElementById("clearSortBtn")) {
      document.getElementById("clearSortBtn").style.display = "inline-block"; // Або 'block', в залежності від стилів
    }
  }

  // Деактивуємо кнопку сортування, якщо немає бажань
  if (sortButton) {
    if (!hasItems) {
      sortButton.disabled = true;
      sortButton.title = "Add wishes to enable sorting."; // Підказка
    } else {
      sortButton.disabled = false;
      sortButton.title = "Sort"; // Повертаємо стандартну підказку
    }
  }
  // --- КІНЕЦЬ НОВОЇ ЛОГІКИ ---
}

document.addEventListener("DOMContentLoaded", () => {
  const sortSelect = document.getElementById("sortSelect");
  const clearSortBtn = document.getElementById("clearSortBtn");

  if (sortSelect) {
    // Переконайтеся, що "Default Order" вибрано на початку
    // Це вже зроблено в HTML, але дублюємо для надійності, якщо JS завантажиться раніше
    if (sortSelect.selectedIndex === -1 || sortSelect.value === "") {
      // Додав перевірку на пусте значення
      sortSelect.value = "default";
    }

    applySort(); // Застосувати сортування при завантаженні сторінки

    sortSelect.addEventListener("change", applySort); // Сортувати при зміні вибору
  }

  if (clearSortBtn && sortSelect) {
    clearSortBtn.addEventListener("click", () => {
      if (sortSelect.value !== "default") {
        // Тільки якщо не "Default Order" вже вибрано
        sortSelect.value = "default"; // Встановлюємо "Default Order"
        applySort(); // Застосовуємо сортування
      }
      // Додатково: Закриваємо випадаюче меню сортування
      const dropdown = clearSortBtn.closest(".dropdown-container");
      if (dropdown) {
        dropdown.querySelector(".menu-dropdown").classList.remove("show");
        dropdown.classList.remove("dropdown-active");
      }
    });
  }
});
