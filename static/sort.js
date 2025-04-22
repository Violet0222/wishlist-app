function sort() {
  const sort_filter = document.getElementById("sortSelect");
  sort_filter.addEventListener("change", () => {
    const sort_field = sort_filter.value.split("-")[0];
    const sort_order = sort_filter.value.split("-")[1];
    console.log(sort_field);
    console.log(sort_order);
    const items = document.querySelectorAll('[id^="item-"]');
    const rows = Array.from(document.querySelectorAll(".wishlist-row")).filter(
      (row) => !row.classList.contains("wishlist-header")
    );
    rows.sort((a, b) => {
      const aId = a.id.replace("item-", "");
      const bId = b.id.replace("item-", "");
      const aValue = parseFloat(
        document.querySelector(`[id^="value-${sort_field}-${aId}"]`)
          ?.textContent || 0
      );
      const bValue = parseFloat(
        document.querySelector(`[id^="value-${sort_field}-${bId}"]`)
          ?.textContent || 0
      );

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
