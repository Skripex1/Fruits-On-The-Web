import { setupHamburgerMenu } from "./hamburger.js";
import { setupUserInfo } from "./userInfo.js";

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    fetch("../html/navbar.html")
      .then((response) => response.text())
      .then((html) => {
        this.shadowRoot.innerHTML = html;

        const globalLinkElem = document.createElement("link");
        globalLinkElem.setAttribute("rel", "stylesheet");
        globalLinkElem.setAttribute("href", "../css/global.css");
        this.shadowRoot.appendChild(globalLinkElem);

        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "../css/navbar.css");
        this.shadowRoot.appendChild(linkElem);

        setupHamburgerMenu(this.shadowRoot);
        setupUserInfo(this.shadowRoot);
      })
      .catch((error) => console.error("Error loading HTML:", error));
  }
}
customElements.define("my-navbar", NavBar);
