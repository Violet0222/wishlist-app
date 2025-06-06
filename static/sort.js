function sort() {
  const sort_filter = document.getElementById("sortSelect");
  sort_filter.addEventListener("change", () => {
    const sort_field = sort_filter.value.split("-")[0];
    const sort_order = sort_filter.value.split("-")[1];

    // Select all actual item rows, excluding the header
    const rows = Array.from(
      document.querySelectorAll(".table-row:not(.wishlist-header)")
    );
    console.log(rows);
    rows.sort((a, b) => {
      const aId = a.id.replace("item-", "");
      const bId = b.id.replace("item-", "");
      let aValue, bValue;

      if (sort_field === "date") {
        aValue = new Date(
          document.querySelector(`#value-date-${aId}`)?.textContent
        );
        bValue = new Date(
          document.querySelector(`#value-date-${bId}`)?.textContent
        );
      } else if (sort_field === "status") {
        // Get the data-status-value attribute for sorting (0 or 1)
        aValue = parseInt(
          document.querySelector(`#value-status-${aId}`)?.dataset.statusValue
        );
        bValue = parseInt(
          document.querySelector(`#value-status-${bId}`)?.dataset.statusValue
        );
      } else if (sort_field === "priority") {
        // Get the data-priority-value attribute for sorting (0, 1, 2)
        aValue = parseInt(
          document.querySelector(`#value-priority-${aId}`)?.dataset
            .priorityValue
        );
        bValue = parseInt(
          document.querySelector(`#value-priority-${bId}`)?.dataset
            .priorityValue
        );
      } else if (sort_field === "price") {
        aValue = parseFloat(
          document.querySelector(`#value-price-${aId}`)?.textContent
        );
        bValue = parseFloat(
          document.querySelector(`#value-price-${bId}`)?.textContent
        );
        // Handle cases where price might be "Empty" or null
        aValue = isNaN(aValue) ? -Infinity : aValue; // Put empty prices at the bottom for asc
        bValue = isNaN(bValue) ? -Infinity : bValue;
      } else {
        // For other text fields (title, description, currency, list_name, url, wanted_by)
        aValue =
          document.querySelector(`#value-${sort_field}-${aId}`)?.textContent ||
          "";
        bValue =
          document.querySelector(`#value-${sort_field}-${bId}`)?.textContent ||
          "";
      }

      // Convert to lowercase for case-insensitive string comparison
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
      }
      if (typeof bValue === "string") {
        bValue = bValue.toLowerCase();
      }

      if (sort_order === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    const container = document.querySelector(".table"); // Target the inner .table container
    rows.forEach((row) => container.appendChild(row));
  });

  // Close dropdown after sorting
  const dropdown = sort_filter.closest(".dropdown-container");
  dropdown.querySelector(".menu-dropdown").classList.remove("show");
  dropdown.classList.remove("dropdown-active");

  // to check: Show a visual cue
  const tooltip = dropdown.querySelector(".tooltip-text");
  if (tooltip) {
    const selectedOption = sort_filter.options[sort_filter.selectedIndex].text;
    tooltip.textContent = `Sorted: ${selectedOption}`;
  }
}

document.addEventListener("DOMContentLoaded", sort);
