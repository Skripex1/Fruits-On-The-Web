import { setupHamburgerMenu } from "./hamubrger.js";

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
      })
      .catch((error) => console.error("error loading html ", error));
  }
}
customElements.define("my-navbar", NavBar);
