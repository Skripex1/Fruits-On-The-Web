class BodyContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    fetch("../html/body-container.html")
      .then((response) => response.text())
      .then((html) => {
        this.shadowRoot.innerHTML = html;
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "../css/global.css");
        this.shadowRoot.appendChild(linkElem);
      })
      .catch((error) => console.error("error loading html ", error));
  }
}
customElements.define("my-body-container", BodyContainer);
