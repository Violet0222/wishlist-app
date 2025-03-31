function modalWindow() {




    const openModalBtn = document.getElementById("openModalBtn");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.getElementById("closeModalBtn");

    // modal window opening
   openModalBtn.addEventListener("click", () => {
       modal.style.display = "block";
       setTimeout(function() {
           modal.classList.add("open");
       }, 10);
   })
    // Close modal window
    closeModalBtn.addEventListener("click", function() {
        modal.classList.remove("open");
        setTimeout(function() {
            modal.style.display = "none";
        }, 300);
    });

    // Close modal if clicked outside of modal content
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.classList.remove("open");
            setTimeout(function() {
                modal.style.display = "none";
            }, 300);
        }
    });

}

document.addEventListener("DOMContentLoaded", modalWindow);
