function modalWindow() {
  const openModalBtnNewItem = document.getElementById("openModalBtnNewItem");
  const openModalBtnImgs = document.querySelectorAll(
    '[id^="openModalBtnImg-"]'
  );
  console.log(openModalBtnImgs);
  if (openModalBtnNewItem) {
    const modalNewItem = document.getElementById("modalNewItem");
    const closeModalBtn = modalNewItem.querySelector(".modal-close");
    // Open modal
    openModalBtnNewItem.addEventListener("click", () => {
      modalNewItem.style.display = "flex"; // Flex for centered layout
      setTimeout(() => {
        modalNewItem.classList.add("open");
      }, 10);
    });

    // Close modal on close button
    closeModalBtn.addEventListener("click", () => {
      modalNewItem.classList.remove("open");
      setTimeout(() => {
        modalNewItem.style.display = "none";
      }, 300);
    });

    // Close modal on outside click
    window.addEventListener("click", (event) => {
      if (event.target === modalNewItem) {
        modalNewItem.classList.remove("open");
        setTimeout(() => {
          modalNewItem.style.display = "none";
        }, 300);
      }
    });
  }

  openModalBtnImgs.forEach((openModalBtnImg) => {
    const modalImg = openModalBtnImg.querySelector('[id^="modalImg-"]');
    const closeModalBtnImg = modalImg.querySelector(
      '[id^="closeModalBtnImg-"]'
    );
    console.log(modalImg);
    openModalBtnImg.addEventListener("click", () => {
      modalImg.style.display = "flex"; // Flex for centered layout
      setTimeout(() => {
        modalImg.classList.add("open");
      }, 10);
    });
    closeModalBtnImg.addEventListener("click", () => {
      modalImg.classList.remove("open");
      setTimeout(() => {
        modalImg.style.display = "none";
      }, 300);
    });

    // Close modal on outside click
    window.addEventListener("click", (event) => {
      if (event.target === modalImg) {
        modalImg.classList.remove("open");
        setTimeout(() => {
          modalImg.style.display = "none";
        }, 300);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", modalWindow);
