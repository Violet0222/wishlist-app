function nav_bar() {
  const navBarBtn = document.querySelector(".nav-bar-btn");
  const navBarContainer = document.querySelector(".nav_bar_container");

  if (navBarBtn && navBarContainer) {
    navBarBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navBarContainer.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (
        !navBarContainer.contains(e.target) &&
        !navBarBtn.contains(e.target)
      ) {
        navBarContainer.classList.remove("show");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", nav_bar);
