const template = document.createElement("template");
template.innerHTML = `
	<style>
		.container{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 10px;
			border-radius: 10px;
			background: pink;
		}

		.btn-cont{
			display: flex;
			gap: 10px;
		}
	</style>
	<div class="container">
		<p><span>The count is: </span><span id="count">0</span></p>
		<div class="btn-cont">
			<button id="increment">+</button>
			<button id="decrement">-</button>
		</div>
		<slot></slot>
	</div>
`;

export class CounterButton extends HTMLElement {
  private _shadowRoot: ShadowRoot;
  private count: number;
  private counterDisplay: HTMLSpanElement;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.count = 0;
    this.counterDisplay = this._shadowRoot.querySelector(
      "#count"
    ) as HTMLSpanElement;

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement() {
    this.count++;
    this.counterDisplay.textContent = `${this.count}`;
  }

  handleDecrement() {
    if (this.count < 1) {
      alert("C'mon, don't go below 0");
      return;
    }
    this.count--;
    this.counterDisplay.textContent = `${this.count}`;
  }

  connectedCallback() {
    const incrementBtn = this._shadowRoot.querySelector("#increment");
    incrementBtn?.addEventListener("click", this.handleIncrement);

    const decrementBtn = this._shadowRoot.querySelector("#decrement");
    decrementBtn?.addEventListener("click", this.handleDecrement);
  }
}
