function modalWindow() {
  const openModalBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("modal");
  const closeModalBtn = modal.querySelector(".modal-close");

  if (!openModalBtn || !modal || !closeModalBtn) return;

  // Open modal
  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex"; // Flex for centered layout
    setTimeout(() => {
      modal.classList.add("open");
    }, 10);
  });

  // Close modal on close button
  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("open");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  });

  // Close modal on outside click
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("open");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  });
}

document.addEventListener("DOMContentLoaded", modalWindow);
