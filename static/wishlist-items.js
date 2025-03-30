function initWishListItems() {
    console.log('hello')
    const items = document.querySelectorAll('[id^="item-"]');

    for (const item of items){
        const title = item.querySelector('[id^="title-container-"]')
        title.addEventListener('click', (e) => {
            const input = title.querySelector('input');
            const titleText = title.querySelector('[id^="title-text-"]');
            input.hidden = false
            titleText.hidden = true

        })
        title.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const input = title.querySelector('input');
                const titleText = title.querySelector('[id^="title-text-"]');
                input.hidden = true
                titleText.hidden = false
            }
        })
    }
    console.log(items)
}

document.addEventListener("DOMContentLoaded", initWishListItems);
