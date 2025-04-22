function sort() {
  const sort_filter = document.getElementById("sortSelect");
  sort_filter.addEventListener("change", () => {
    const sort_field = sort_filter.value.split("-")[0];
    const sort_order = sort_filter.value.split("-")[1];
    const items = document.querySelectorAll('[id^="item-"]');
    const rows = Array.from(document.querySelectorAll(".wishlist-row")).filter(
      (row) => !row.classList.contains("wishlist-header")
    );
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
      } else {
        aValue =
          document.querySelector(`#value-${sort_field}-${aId}`)?.textContent ||
          "";
        bValue =
          document.querySelector(`#value-${sort_field}-${bId}`)?.textContent ||
          "";

        // convert to number if sorting numeric fields like price or priority
        if (sort_field === "price" || sort_field === "priority") {
          aValue = parseFloat(aValue) || 0;
          bValue = parseFloat(bValue) || 0;
        }
      }
      if (sort_order === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
    const container = document.querySelector(".wishlist-table");
    rows.forEach((row) => container.appendChild(row));
  });
}

document.addEventListener("DOMContentLoaded", sort);
