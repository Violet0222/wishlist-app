function initWishListItems() {
    const items = document.querySelectorAll('[id^="item-"]');

    const setCursorToEnd = (input) => {
        const length = input.value.length;
        input.setSelectionRange(length, length);
    }
    for (const item of items){
        const title = item.querySelector('[id^="title-container-"]')
        const description = item.querySelector('[id^="description-container-"]')
        const url = item.querySelector('[id^="url-container-"]')
        const price = item.querySelector('[id^="price-container-"]')
        const currency = item.querySelector('[id^="currency-container-"]')
        const priority = item.querySelector('[id^="priority-container-"]')
        const delete_wish = item.querySelector('[id^="delete-container-"]')
        if (title) {
            const input = title.querySelector('input');
            const titleText = title.querySelector('[id^="title-text-"]');
            title.addEventListener('click', (e) => {
                input.hidden = false;
                titleText.hidden = true;
                input.focus();
                setCursorToEnd(input);
                })
            input.addEventListener('blur', () => {
                input.hidden = true;
                titleText.hidden = false;
            });
            title.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    input.hidden = true
                    titleText.hidden = false
                    // Submit the form when 'Enter' is pressed
                    const form = title.closest('form');  // Find the closest form
                    form.submit();  // Submit the form
                }
            })
        }

        if (description) {
            const input = description.querySelector('input');
            const descText = description.querySelector('[id^="description-text-"]');
            description.addEventListener('click', (e) => {
                input.hidden = false
                descText.hidden = true
                input.focus();
                setCursorToEnd(input);
            })
            input.addEventListener('blur', () => {
                input.hidden = true;
                descText.hidden = false;
            });
            description.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    input.hidden = true
                    descText.hidden = false
                    // Submit the form when 'Enter' is pressed
                    const form = description.closest('form');  // Find the closest form
                    form.submit();  // Submit the form
                }
            })
        }
        if (url) {
            const input = url.querySelector('input');
            const urlLink = url.querySelector('[id^="url-link-"]');
            url.addEventListener('click', (e) => {
                input.hidden = false
                urlLink.hidden = true
                input.focus();
                setCursorToEnd(input);
            })
            input.addEventListener('blur', () => {
                input.hidden = true;
                urlLink.hidden = false;
            });
            url.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    input.hidden = true
                    urlLink.hidden = false
                    // Submit the form when 'Enter' is pressed
                    const form = url.closest('form');  // Find the closest form
                    form.submit();  // Submit the form
                }
            })
        }
        if (price) {
            const input = price.querySelector('input');
            const priceValue = price.querySelector('[id^="price-value-"]');
            price.addEventListener('click', (e) => {
                input.hidden = false
                priceValue.hidden = true
                input.focus();
                setCursorToEnd(input);
            })
            input.addEventListener('blur', () => {
                input.hidden = true;
                priceValue.hidden = false;
            });
            price.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    input.hidden = true
                    priceValue.hidden = false
                    const form = price.closest('form');
                    form.submit();
                }
            })
        }
        if (currency) {
            const input = currency.querySelector('input');
            const currencyValue = currency.querySelector('[id^="currency-value-"]');
            currency.addEventListener('click', (e) => {
                input.hidden = false
                currencyValue.hidden = true
                input.focus();
                setCursorToEnd(input);
            })
            input.addEventListener('blur', () => {
                input.hidden = true;
                currencyValue.hidden = false;
            });
            currency.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    input.hidden = true
                    currencyValue.hidden = false
                    const form = price.closest('form');
                    form.submit();
                }
            })
        }
        if (priority) {
            const select = priority.querySelector('select');
            const priorityText = priority.querySelector('[id^="priority-value-"]');

            priority.addEventListener('click', (e) => {
                if (priorityText && select) {
                    select.hidden = false;
                    priorityText.hidden = true;
                    select.focus();
                }
            });

            select.addEventListener('blur', () => {
                select.hidden = true;
                priorityText.hidden = false;
            });

            select.addEventListener('change', () => {
                const form = priority.closest('form');
                form.submit();
            });
        }

        if (delete_wish) {
            const input = delete_wish.querySelector('input');
            const delete_wish_button = delete_wish.querySelector('[id^="delete-button-"]');
            delete_wish.addEventListener('click', (e) => {
                const form = delete_wish.closest('form');  // Find the closest form
                form.submit();
            })
        }
    }
}

document.addEventListener("DOMContentLoaded", initWishListItems);
