function initWishListItems() {
  const items = document.querySelectorAll('[id^="item-"]');

  const setCursorToEnd = (input) => {
    const length = input.value.length;
    input.setSelectionRange(length, length);
  };
  for (const item of items) {
    const editableFields = item.querySelectorAll(".editable-field");
    editableFields.forEach((field) => {
      const valueElement = field.querySelector(".value-display");
      const form = field.querySelector("form");
      const input = form.querySelector("input, select");

      if (!valueElement || !form || !input) return;

      field.addEventListener("click", (event) => {
        event.stopPropagation(); // prevent the click from bubbling to document
        valueElement.hidden = true;
        form.classList.remove("hidden");
        input.focus();
        setCursorToEnd(input);
        if (input.tagName === "INPUT") {
          input.setSelectionRange(input.value.length, input.value.length);
        }
      });
    });
  }

  // const title = item.querySelector('[id^="title-container-"]')
  // const description = item.querySelector('[id^="description-container-"]')
  // const url = item.querySelector('[id^="url-container-"]')
  // const price = item.querySelector('[id^="price-container-"]')
  // const currency = item.querySelector('[id^="currency-container-"]')
  // const priority = item.querySelector('[id^="priority-container-"]')
  // const delete_wish = item.querySelector('[id^="delete-container-"]')
  // if (title) {
  //     const input = title.querySelector('input');
  //     const form = title.querySelector('form');
  //     const titleText = title.querySelector('[id^="title-text-"]');
  //     title.addEventListener('click', (e) => {
  //
  //         form.classList.remove('hidden');
  //         titleText.hidden = true;
  //         input.focus();
  //         setCursorToEnd(input);
  //         })
  //     document.addEventListener('click', (event) => {
  //         if (!form.classList.contains('hidden') && !form.contains(event.target) && !title.contains(event.target)) {
  //             form.classList.add('hidden');
  //             titleText.hidden = false;
  //         }
  //     });
  //     form.addEventListener('keypress', (e) => {
  //         if (e.key === 'Enter') {
  //             form.classList.add('hidden')
  //             titleText.hidden = false
  //             // Submit the form when 'Enter' is pressed
  //             const form = title.closest('form');  // Find the closest form
  //             form.submit();  // Submit the form
  //         }
  //     })
  // }
  //
  // if (description) {
  //     const input = description.querySelector('input');
  //     const descText = description.querySelector('[id^="description-text-"]');
  //     description.addEventListener('click', (e) => {
  //         input.hidden = false
  //         descText.hidden = true
  //         input.focus();
  //         setCursorToEnd(input);
  //     })
  //     input.addEventListener('blur', () => {
  //         input.hidden = true;
  //         descText.hidden = false;
  //     });
  //     input.addEventListener('keypress', (e) => {
  //         if (e.key === 'Enter') {
  //             input.hidden = true
  //             descText.hidden = false
  //             // Submit the form when 'Enter' is pressed
  //             const form = description.closest('form');  // Find the closest form
  //             form.submit();  // Submit the form
  //         }
  //     })
  // }
  // if (url) {
  //     const input = url.querySelector('input');
  //     const urlLink = url.querySelector('[id^="url-link-"]');
  //     url.addEventListener('click', (e) => {
  //         input.hidden = false
  //         urlLink.hidden = true
  //         input.focus();
  //         setCursorToEnd(input);
  //     })
  //     input.addEventListener('blur', () => {
  //         input.hidden = true;
  //         urlLink.hidden = false;
  //     });
  //     input.addEventListener('keypress', (e) => {
  //         if (e.key === 'Enter') {
  //             input.hidden = true
  //             urlLink.hidden = false
  //             // Submit the form when 'Enter' is pressed
  //             const form = url.closest('form');  // Find the closest form
  //             form.submit();  // Submit the form
  //         }
  //     })
  // }
  // if (price) {
  //     const input = price.querySelector('input');
  //     const priceValue = price.querySelector('[id^="price-value-"]');
  //     price.addEventListener('click', (e) => {
  //         input.hidden = false
  //         priceValue.hidden = true
  //         input.focus();
  //         setCursorToEnd(input);
  //     })
  //     input.addEventListener('blur', () => {
  //         input.hidden = true;
  //         priceValue.hidden = false;
  //     });
  //     input.addEventListener('keypress', (e) => {
  //         if (e.key === 'Enter') {
  //             input.hidden = true
  //             priceValue.hidden = false
  //             const form = price.closest('form');
  //             form.submit();
  //         }
  //     })
  // }
  // if (currency) {
  //     const input = currency.querySelector('input');
  //     const currencyValue = currency.querySelector('[id^="currency-value-"]');
  //     currency.addEventListener('click', (e) => {
  //         input.hidden = false
  //         currencyValue.hidden = true
  //         input.focus();
  //         setCursorToEnd(input);
  //     })
  //     input.addEventListener('blur', () => {
  //         input.hidden = true;
  //         currencyValue.hidden = false;
  //     });
  //     currency.addEventListener('keypress', (e) => {
  //         if (e.key === 'Enter') {
  //             input.hidden = true
  //             currencyValue.hidden = false
  //             const form = price.closest('form');
  //             form.submit();
  //         }
  //     })
  // }
  // if (priority) {
  //     const select = priority.querySelector('select');
  //     const priorityText = priority.querySelector('[id^="priority-value-"]');
  //
  //     priority.addEventListener('click', (e) => {
  //         if (priorityText && select) {
  //             select.hidden = false;
  //             priorityText.hidden = true;
  //             select.focus();
  //         }
  //     });
  //
  //     select.addEventListener('blur', () => {
  //         select.hidden = true;
  //         priorityText.hidden = false;
  //     });
  //
  //     select.addEventListener('change', () => {
  //         const form = priority.closest('form');
  //         form.submit();
  //     });
  // }

  // if (delete_wish) {
  //     const input = delete_wish.querySelector('input');
  //     const delete_wish_button = delete_wish.querySelector('[id^="delete-button-"]');
  //     delete_wish.addEventListener('click', (e) => {
  //         const form = delete_wish.closest('form');  // Find the closest form
  //         form.submit();
  //     })
  // }

  document.addEventListener("click", (event) => {
    const openFields = document.querySelectorAll(
      ".editable-field form:not(.hidden)"
    );
    openFields.forEach((form) => {
      if (!form.contains(event.target)) {
        const field = form.closest(".editable-field");
        const valueElement = field.querySelector(".value-display");
        form.classList.add("hidden");
        valueElement.hidden = false;
      }
    });
  });
  document.querySelectorAll('select[name="currency"]').forEach((select) => {
    select.addEventListener("change", () => {
      select.closest("form").submit();
    });
  });
  document.addEventListener("keypress", (event) => {
    items.forEach((item) => {
      const forms = item.querySelector("form");
      forms.forEach((form) => {
        if (event.key === "Enter") {
          const field = form.closest(".editable-field");
          const valueElement = field.querySelector(".value-display");
          form.classList.add("hidden");
          valueElement.hidden = false;
          form.submit();
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", initWishListItems);
