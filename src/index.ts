import { CustomElement } from "./customElement";
import { CounterButton } from "./counterButtons";

window.addEventListener("DOMContentLoaded", () => {
  customElements.define("custom-element", CustomElement);
  customElements.define("counter-btn", CounterButton);
});
