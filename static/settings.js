function settings() {
  const setCursorToEnd = (input) => {
    const length = input.value.length;
    input.setSelectionRange(length, length);
  };

  const editableFields = document.querySelectorAll(".editable-field");

  editableFields.forEach((field) => {
    const valueDisplay = field.querySelector(".value-display");
    const form = field.querySelector("form");
    const input = form.querySelector("input, select");

    if (!valueDisplay || !form || !input) return;

    // Enable editing on click
    field.addEventListener("click", (event) => {
      event.stopPropagation();
      valueDisplay.hidden = true;
      form.classList.remove("hidden");
      input.focus();
      setCursorToEnd(input);
    });
  });

  // Save on click outside
  document.addEventListener("click", (event) => {
    document
      .querySelectorAll(".editable-field form:not(.hidden)")
      .forEach((form) => {
        if (!form.contains(event.target)) {
          const field = form.closest(".editable-field");
          const valueDisplay = field.querySelector(".value-display");
          form.classList.add("hidden");
          valueDisplay.hidden = false;
        }
      });
  });

  // Save on Enter key
  document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      document
        .querySelectorAll(".editable-field form:not(.hidden)")
        .forEach((form) => {
          if (form.contains(event.target)) {
            event.preventDefault(); // prevent page refresh
            form.submit(); // or handle it manually
          }
        });
    }
  });
}

// function settings() {
//   const setCursorToEnd = (input) => {
//     const length = input.value.length;
//     input.setSelectionRange(length, length);
//   };
//   const editableFields = document.querySelectorAll(".editable-field");
//   editableFields.forEach((field) => {
//     const valueElement = field.querySelector(".value-display");
//     const form = field.querySelector("form");
//     const input = form.querySelector("input, select");

//     if (!valueElement || !form || !input) return;
//     field.addEventListener("click", (event) => {
//       event.stopPropagation(); // prevent the click from bubbling to document
//       valueElement.hidden = true;
//       form.classList.remove("hidden");
//       input.focus();
//       setCursorToEnd(input);
//       if (input.tagName === "INPUT") {
//         input.setSelectionRange(input.value.length, input.value.length);
//       }
//     });
//   });

//   document.addEventListener("click", (event) => {
//     const openFields = document.querySelectorAll(
//       ".editable-field form:not(.hidden)"
//     );
//     openFields.forEach((form) => {
//       if (!form.contains(event.target)) {
//         const field = form.closest(".editable-field");
//         const valueElement = field.querySelector(".value-display");
//         form.classList.add("hidden");
//         valueElement.hidden = false;
//       }
//     });
//   });

//   // document.querySelectorAll('select[name="currency"]').forEach((select) => {
//   //   select.addEventListener("change", () => {
//   //     select.closest("form").submit();
//   //   });
//   // });
//   document.addEventListener("keypress", (event) => {
//     editableFields.forEach((el) => {
//       const forms = el.querySelector("form");
//       if (form && form.contains(event.target) && event.key === "Enter") {
//         const field = form.closest(".editable-field");
//         const valueElement = field.querySelector(".value-display");
//         form.classList.add("hidden");
//         valueElement.hidden = false;
//         form.submit();
//       }
//     });
//   });
// }

function link_toggle() {
  const links = document.querySelectorAll(".settings-link");
  const sections = document.querySelectorAll(".settings-section");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.dataset.target + "-content"; // e.g., "account-content"

      // Hide all sections
      sections.forEach((section) => section.classList.add("hidden"));
      links.forEach((l) => l.classList.remove("active"));
      // Show the selected section
      document.getElementById(target).classList.remove("hidden");
      link.classList.add("active");
    });
  });
  // Trigger click on the first link to show initial section
  if (links.length > 0) {
    links[0].click();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  settings();
  link_toggle();
});
