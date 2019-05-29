class Addition {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  html(container) {
    const elem = document.createElement('form');

    elem.innerHTML = `
      X: <input name="x"><br>
      Y: <input name="y"><br>
      <button onclick="Addition.process(this)">Calculate</button>
      Result: <b></b>
    `;

    elem.onsubmit = this.constructor.ignore;
    elem[this.constructor.object] = this;
    container.appendChild(elem);
  }

  static ignore() {
    return false;
  }

  static process(button) {
    const form = button.parentNode;
    const res = form.getElementsByTagName('b')[0];

    try {
      this.x = + form.x.value;
      this.y = + form.y.value;
      const sum = this.x + this.y;
      res.textContent = sum;
    } catch (err) {
      res.textContent = err.message;
    }
  }
}

Addition.object = Symbol('object');
