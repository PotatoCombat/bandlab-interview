const menuTmpl = document.createElement('template');
menuTmpl.innerHTML = `
  <style>
  :host {
  }
  nav {
    display: flex;
    flex-direction: row;
    background-color: #d92626; //#4a3b3b;
    border: solid gray 0;
    border-bottom-width: 1px;
    width: 100%;
    height: 3em;
    line-height: 3em;
  }
  nav > a {
    color: whitesmoke;
    font-weight: bold;
    padding: 0 1em;
    height: 100%;
    text-decoration: none;
  }
  </style>
  <nav>
    <a id="nav-posts" href="posts.html">Posts</a>
    <a id="nav-samples" href="samples.html">Samples</a>
  </nav>
`

customElements.define('menu-element', class extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: `closed`});
    shadowRoot.appendChild(menuTmpl.content.cloneNode(true));
  }
})
