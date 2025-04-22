function sort() {
    const sort_filter = document.getElementById('sortSelect');
    sort_filter.addEventListener('change', () => {
        const sort_field = sort_filter.value.split("-")[0];
        const sort_order = sort_filter.value.split("-")[1];
        const items = document.querySelectorAll('[id^="item-"]');
        const rows = Array.from(document.querySelectorAll('.wishlist-row')).filter(row => !row.classList.contains('wishlist-header'));
        rows.sort((a, b) => {
            const aValue = document.querySelector('[id^="${sort_field}-value-${a.id}"]')
            const bValue = document.querySelector('[id^="${sort_field}-value-${b.id}"]')
            if (sort_order === "desc") {
                return aValue - bValue
            }
        });
        const container = document.querySelector('.wishlist-table');
        rows.forEach(row => container.appendChild(row));
    })
}

document.addEventListener("DOMContentLoaded", sort);
