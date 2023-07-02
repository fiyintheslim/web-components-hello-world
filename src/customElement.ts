import sheet from "./styles/index.css" assert { type: "css" };

const templ = document.createElement("template");
templ.innerHTML = `
<style>
	:host{
		background: blue;
		display: block;
	}

	:host-context(.cont){
		background: green
	}
</style>
	<slot></slot>
	<h3>
	<span part="yoo">This is</span> some heading text</h3>
	
`;

export class CustomElement extends HTMLElement {
  public sRoot: ShadowRoot;
  constructor() {
    super();
    this.sRoot = this.attachShadow({ mode: "closed" });

    this.sRoot.innerHTML = templ.innerHTML;
  }

  static get observedAttributes() {
    return ["foo"];
  }

  get foo() {
    return this.hasAttribute("foo");
  }

  set foo(val) {
    return;
  }

  connectedCallback() {
    // this.sRoot.adoptedStyleSheets = [sheet];
  }
}

window.customElements.whenDefined("custom-element").then(() => {
  console.log("Element has been registered");
});
