async function loadEmojis() {
  const response = await fetch("/static/data/emoji.json");
  const emojis = await response.json();

  // Select all emoji picker wrappers
  const pickerWrappers = document.querySelectorAll(".emoji-picker-wrapper");

  pickerWrappers.forEach((wrapper) => {
    const emojiTextInput = wrapper.querySelector(".emoji-input"); // Use class
    const emojiDropdown = wrapper.querySelector(".emoji-dropdown"); // Use class
    const emojiDisplay = wrapper
      .closest(".editable-field")
      .querySelector(".emoji-display");
    const hiddenEmojiInput = wrapper
      .closest("form")
      .querySelector('input[name="emoji"]');
    const categoryId = emojiDisplay.dataset.categoryId;

    if (
      !emojiTextInput ||
      !emojiDropdown ||
      !emojiDisplay ||
      !hiddenEmojiInput ||
      !categoryId
    ) {
      console.error(
        "Could not find all elements for emoji picker in category:",
        categoryId
      );
      return; // Skip if elements are missing
    }

    // Populate the dropdown for this specific picker
    emojis.forEach((emoji) => {
      if (!emoji.emoji) return;

      const button = document.createElement("button");
      button.textContent = emoji.emoji;
      button.title = emoji.description || "";
      button.onclick = () => {
        emojiTextInput.value = emoji.emoji; // Update the text input
        hiddenEmojiInput.value = emoji.emoji; // Update the hidden input for the form
        emojiDisplay.textContent = emoji.emoji; // Update the displayed emoji
        emojiDropdown.style.display = "none"; // Hide the dropdown

        // Automatically submit the form after selecting an emoji
        const form = wrapper.closest("form");
        if (form) {
          form.submit();
        }
      };
      emojiDropdown.appendChild(button);
    });

    // Add event listener to the text input to toggle the dropdown
    emojiTextInput.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent document click from closing immediately
      emojiDropdown.style.display =
        emojiDropdown.style.display === "none" ||
        emojiDropdown.style.display === ""
          ? "flex"
          : "none"; // Toggle display
    });

    // Set initial value of the text input if an emoji is already set
    if (hiddenEmojiInput.value) {
      emojiTextInput.value = hiddenEmojiInput.value;
    }
  });

  // Add a single document click listener to close all open dropdowns
  document.addEventListener("click", (e) => {
    pickerWrappers.forEach((wrapper) => {
      const emojiDropdown = wrapper.querySelector(".emoji-dropdown");
      if (emojiDropdown && !wrapper.contains(e.target)) {
        emojiDropdown.style.display = "none";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", loadEmojis);
