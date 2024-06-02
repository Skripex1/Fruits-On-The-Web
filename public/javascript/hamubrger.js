export function setupHamburgerMenu(container) {
  const menuButton = container.querySelector(".hamburger");
  const mobile_menu = container.querySelector(".div-routes-phone");
  console.log(menuButton);
  console.log(mobile_menu);
  menuButton.addEventListener("click", function () {
    menuButton.classList.toggle("is-active");
    mobile_menu.classList.toggle("is-active");
  });
  const links = mobile_menu.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuButton.classList.contains("is-active")) {
        menuButton.classList.remove("is-active");
      }
      if (mobile_menu.classList.contains("is-active")) {
        mobile_menu.classList.remove("is-active");
      }
    });
  });
}
