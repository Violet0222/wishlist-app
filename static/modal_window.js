function modalWindow() {
  // Modal for New Item Category
  const openModalBtnNewItem = document.getElementById("openModalBtnNewItem");
  const modalNewItem = document.getElementById("modalNewItem");
  const closeModalBtnNewItem = document.getElementById("closeModalBtnNewItem");

  if (openModalBtnNewItem && modalNewItem && closeModalBtnNewItem) {
    openModalBtnNewItem.addEventListener("click", () => {
      modalNewItem.classList.add("open");
    });

    closeModalBtnNewItem.addEventListener("click", () => {
      modalNewItem.classList.remove("open");
    });

    modalNewItem.addEventListener("click", (event) => {
      if (event.target === modalNewItem) {
        modalNewItem.classList.remove("open");
      }
    });
  }

  // Modals for Image
  const openModalBtnImgs = document.querySelectorAll(".openModalBtnImg");

  openModalBtnImgs.forEach((openModalBtnImg) => {
    openModalBtnImg.addEventListener("click", () => {
      const itemId = openModalBtnImg.dataset.itemId;
      const modalImg = document.getElementById(`modalImg-${itemId}`);
      if (modalImg) {
        modalImg.classList.add("open");
      }
    });
  });
  const closeModalBtnImg = document.querySelectorAll(".closeModalBtnImg");
  closeModalBtnImg.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal-overlay");
      if (modal) {
        modal.classList.remove("open");
      }
    });
  });

  // Close image modal on outside click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    if (overlay.id.startsWith("modalImg-")) {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          overlay.classList.remove("open");
        }
      });
    }
  });

  const cancelButtons = document.querySelectorAll(".cancel-btn");

  cancelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal-overlay");
      if (modal) {
        modal.classList.remove("open");
      }
    });
  });

  const openModalBtnDescriptions = document.querySelectorAll(
    ".openModalBtnDescription"
  );
  openModalBtnDescriptions.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.dataset.itemId;
      const modal = document.getElementById(`modalDescription-${itemId}`);
      if (modal) {
        modal.classList.add("open");
      }
    });
  });

  const closeModalBtnDescriptions = document.querySelectorAll(
    ".closeModalBtnDescription"
  );
  closeModalBtnDescriptions.forEach((button) => {
    button.addEventListener("click", () => {
      // Find the closest ancestor with the class 'description-modal'
      const modal = button.closest(".modal-overlay");
      if (modal) {
        modal.classList.remove("open");
      }
    });
  });

  // Close description modal on outside click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    if (overlay.id.startsWith("modalDescription-")) {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          overlay.classList.remove("open");
        }
      });
    }
  });
  // Open Currency Modal
  document.querySelectorAll(".openModalBtnCurrency").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.dataset.itemId;
      const modal = document.getElementById(`modalCurrency-${itemId}`);
      if (modal) {
        modal.classList.add("open");
      }
    });
  });

  // Close Currency Modal
  document
    .querySelectorAll(".closeModalBtnCurrency, .cancelCurrencyBtn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.dataset.itemId;
        const modal = document.getElementById(`modalCurrency-${itemId}`);
        if (modal) {
          modal.classList.remove("open");
        }
      });
    });

  // Close currency modal on outside click
  document.querySelectorAll(".currency-modal").forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        overlay.classList.remove("open");
      }
    });
  });

  // Open Priority Modal
  document.querySelectorAll(".openModalBtnPriority").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.getAttribute("data-item-id");
      const modal = document.getElementById(`modalPriority-${itemId}`);
      if (modal) {
        modal.classList.add("open");
      }
    });
  });

  // Close Priority Modal
  document
    .querySelectorAll(".closeModalBtnPriority, .cancelPriorityBtn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.getAttribute("data-item-id");
        document.getElementById(`modalPriority-${itemId}`).style.display =
          "none"; // Змінив з remove("open") на style.display
      });
    });

  // Open List Name Modal
  document.querySelectorAll(".openModalBtnListName").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.getAttribute("data-item-id");
      const modal = document.getElementById(`modalListName-${itemId}`);
      if (modal) {
        modal.classList.add("open");
      }
    });
  });

  // Close List Name Modal
  document
    .querySelectorAll(".closeModalBtnListName, .cancelListNameBtn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.getAttribute("data-item-id");
        const modal = document.getElementById(`modalListName-${itemId}`);
        if (modal) {
          modal.classList.remove("open");
        }
      });
    });

  document.querySelectorAll(".list-name-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      const select = form.querySelector('select[name="list_name"]');
      const selectedOption = select.options[select.selectedIndex];
      const emoji = selectedOption.getAttribute("data-emoji");

      const emojiInput = form.querySelector('input[name="emoji"]');
      if (emojiInput) {
        emojiInput.value = emoji;
      }
    });
  });

  // --- Start: Share Wishlist Modal Logic ---
  const openModalBtnCopyLink = document.querySelector(".openModalBtnCopyLink");
  const modalCopyLink = document.getElementById("modalCopyLink");
  const closeModalBtnCopyLink = document.querySelector(
    ".closeModalBtnCopyLink"
  );
  const wishlistSelector = document.getElementById("wishlistSelector"); // Цей елемент може бути null
  const generatedLink = document.getElementById("generatedPublicLink"); // Цей елемент може бути null
  const copyBtn = document.getElementById("copyLinkBtn"); // Цей елемент може бути null

  // Тільки якщо кнопка "Share a wishlist" та модалка існують, ініціалізуємо їх
  // І найважливіше: ініціалізуємо логіку селектора, тільки якщо wishlistSelector існує.
  if (openModalBtnCopyLink && modalCopyLink && closeModalBtnCopyLink) {
    // Открытие модалки
    // Добавляем проверку openModalBtnCopyLink.disabled
    if (!openModalBtnCopyLink.disabled) {
      openModalBtnCopyLink.addEventListener("click", () => {
        modalCopyLink.classList.add("open");
        // Вызываем updatePublicLink только если wishlistSelector существует
        if (wishlistSelector) {
          updatePublicLink();
        }
      });
    }

    // Закрытие по кнопке
    closeModalBtnCopyLink.addEventListener("click", () => {
      modalCopyLink.classList.remove("open");
    });

    // Закрытие по клику снаружи
    modalCopyLink.addEventListener("click", (event) => {
      if (event.target === modalCopyLink) {
        modalCopyLink.classList.remove("open");
      }
    });

    // --- Логика обновления и копирования ссылки (обернута в if) ---
    if (wishlistSelector && generatedLink && copyBtn) {
      // <--- КЛЮЧЕВАЯ ПРОВЕРКА
      // Обновление ссылки при выборе другого списка
      wishlistSelector.addEventListener("change", updatePublicLink);

      function updatePublicLink() {
        const selectedOption =
          wishlistSelector.options[wishlistSelector.selectedIndex];
        // Убедитесь, что selectedOption не null/undefined, если select был пустым
        if (
          selectedOption &&
          selectedOption.value &&
          selectedOption.dataset.token
        ) {
          const listId = selectedOption.value;
          const token = selectedOption.dataset.token;
          const baseUrl = window.location.origin;
          const link = `${baseUrl}/public/wishlist/${listId}?token=${token}`;
          generatedLink.textContent = link;
          // generatedLink.href = link; // Если generatedLink это <a href>
          copyBtn.style.display = "inline-block"; // Показываем кнопку "Копировать"
        } else {
          // Если нет выбранной опции или данные отсутствуют
          generatedLink.textContent = "Please select a list.";
          copyBtn.style.display = "none"; // Приховуємо кнопку "Копіювати"
        }
      }

      // Копировать ссылку
      copyBtn.addEventListener("click", () => {
        const linkToCopy = generatedLink.textContent;
        if (
          navigator.clipboard &&
          linkToCopy &&
          generatedLink.textContent !== "Please select a list."
        ) {
          // Не копируем сообщение об ошибке
          navigator.clipboard
            .writeText(linkToCopy)
            .then(() => {
              copyBtn.textContent = "Copied!";
              setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
            })
            .catch((err) => {
              console.error("Failed to copy text: ", err);
              alert("Failed to copy link. Please copy it manually.");
            });
        } else if (generatedLink.textContent === "Please select a list.") {
          alert("Cannot copy: No list selected or link not generated.");
        }
      });

      // Инициализируем ссылку при первом открытии модалки, если элементы существуют
      // Это уже вызывается через обработчик openModalBtnCopyLink click.
      // updatePublicLink();
    } else {
      // Если wishlistSelector или другие элементы для генерации посилання не існують (has_shareable_lists is false)
      // Модалка покаже повідомлення з Jinja2. JS не має нічого робити.
      // Забезпечуємо, що елементи приховані, якщо JS працює.
      if (generatedLink) generatedLink.textContent = "";
      if (copyBtn) copyBtn.style.display = "none";
    }
  }
  // --- End: Share Wishlist Modal Logic ---

  // Full image modal (the larger view when clicking on an image)
  const imgModal = document.getElementById("imgModal");
  const imgModalContent = document.getElementById("modalImgContent");
  const imgModalClose = document.querySelector(".img-modal-close");

  if (imgModal && imgModalContent && imgModalClose) {
    document.querySelectorAll(".clickable-image").forEach((img) => {
      img.addEventListener("click", () => {
        imgModalContent.src = img.dataset.full || img.src;
        imgModal.classList.add("open");
      });
    });

    imgModalClose.addEventListener("click", () => {
      imgModal.classList.remove("open");
    });

    imgModal.addEventListener("click", (event) => {
      if (event.target === imgModal) {
        imgModal.classList.remove("open");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  modalWindow();
});
