function initWishListItems() {
    console.log('hello')
    const items = document.querySelectorAll('[id^="item-"]');

    for (const item of items){
        const title = item.querySelector('[id^="title-container-"]')
        const description = item.querySelector('[id^="description-container-"]')
        const url = item.querySelector('[id^="url-container-"]')
        const price = item.querySelector('[id^="price-container-"]')

        if (title) {
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
                // Submit the form when 'Enter' is pressed
                const form = title.closest('form');  // Find the closest form
                form.submit();  // Submit the form
            }
        })
        }

        if (description) {
            description.addEventListener('click', (e) => {
                const input = description.querySelector('input');
                const descText = description.querySelector('[id^="description-text-"]');
                input.hidden = false
                descText.hidden = true

            })
            description.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const input = description.querySelector('input');
                    const descText = description.querySelector('[id^="description-text-"]');
                    input.hidden = true
                    descText.hidden = false
                    // Submit the form when 'Enter' is pressed
                    const form = description.closest('form');  // Find the closest form
                    form.submit();  // Submit the form
                }
            })
        }
        if (url) {
            url.addEventListener('click', (e) => {
                const input = url.querySelector('input');
                const urlLink = url.querySelector('[id^="url-link-"]');
                input.hidden = false
                urlLink.hidden = true
            })
            url.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const input = url.querySelector('input');
                    const urlLink = url.querySelector('[id^="url-link-"]');
                    input.hidden = true
                    urlLink.hidden = false
                    // Submit the form when 'Enter' is pressed
                    const form = url.closest('form');  // Find the closest form
                    form.submit();  // Submit the form
                }
            })
        }
        if (price) {
            price.addEventListener('click', (e) => {
                const input = price.querySelector('input');
                const priceValue = price.querySelector('[id^="price-value-"]');
                input.hidden = false
                priceValue.hidden = true
            })
            price.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const input = price.querySelector('input');
                    const priceValue = price.querySelector('[id^="price-value-"]');
                    input.hidden = true
                    priceValue.hidden = false
                    const form = price.closest('form');
                    form.submit();
                }
            })
        }
    }
    console.log(items)
}

document.addEventListener("DOMContentLoaded", initWishListItems);
