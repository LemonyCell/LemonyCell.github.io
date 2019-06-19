window.addEventListener('load', function(){
  const body = document.body;
  const k = new Karatsuba();
  k.html(body);
});

class Karatsuba {
  constructor(){

  }

  async caculate(){
    const x = this.isNumber(this._Xinput.value);
    const y = this.isNumber(this._Yinput.value);
    const cn = this.isNumber(this._Yinput.value);
    if( !(x && y && cn) ){
      this.showError("Inputed data should be numbers that is greater than 0");
      return;
    }

    const X = BigInt( this._Xinput.value );
    const Y = BigInt( this._Yinput.value );
    const CN = + this._Yinput.value;

    const n = Object.create(null);
    n.iteration = 0;
    const res = await this.karatsuba(X, Y, CN, n);
    this.showResult(res, n.iteration);
  }

  isNumber(text){
    if(text.match( "[^0-9]" ) == null)
      return true; 
    return false;
  }

  async karatsuba(x, y, controlNumber, n){
    let X = x.toString();
    let Y = y.toString();

    let digit = 0;
    if (X.length > Y.length)
    {
      digit = X.length;
      // шукаємо різницю між довжинами символів
      const zero = X.length - Y.length;
      // заповнимо цю різницю нулями на початку ( напр було 345 та 5 -> стало 345 та 005 )
      Y = '0'.repeat(zero) + Y;
    }
    else
    {
      digit = Y.length;
      const zero = Y.length - X.length;
      X = '0'.repeat(zero) + X;
    }

    if(digit == 1) 
      return await BigInt(x*y) ;
    
    if (digit % 2 != 0)
    {
      digit++;
      X = '0' + X;
      Y = '0' + Y;
    }

    const a = BigInt( X.substring(0, Math.floor(digit / 2)) );
    const b = BigInt( X.substring( Math.floor(digit / 2)) );

    const c = BigInt( Y.substring(0,  Math.floor(digit / 2)) );
    const d = BigInt( Y.substring( Math.floor(digit / 2)) );

    // шукаємо потрібні множники
    const ac = await this.karatsuba(a, c, controlNumber, n);
    const bd = await this.karatsuba(b, d, controlNumber, n);
    const adbc = await this.karatsuba((a + b), (c + d), controlNumber, n) -ac -bd ;

    // якщо число ad_bc дорівнює перевірочному числу то збільшуємо кількість співпадінь на 1 
    if (adbc == controlNumber)
    {
      n.iteration++;
    }
    const powN = BigInt( Math.pow(10, digit) );
    const powN2 = BigInt( Math.pow(10,  Math.floor(digit / 2)) );
    const res = powN * ac + powN2 * adbc + bd;
    return await res ;
  }

  showResult(result, iterations){
    for (const child of this._divResult.childNodes) {
      this._divResult.removeChild(child);
    }

    const p = document.createElement('p');
    p.textContent = `Result = ${result} Number of iterations : ${iterations}`;
    this._divResult.appendChild(p);
  }

  showError(message){
    // creating Error div
    const alertError = document.createElement("div");
    const node = document.createTextNode(message);
    alertError.appendChild(node);
    alertError.classList.add("alert");
    alertError.classList.add("alert-danger");
    alertError.addEventListener('animationend', function(e) { 
      //alert('Animation ' + e.animationName + ' has ended');
      this.remove();
    });
    
    this._divErrors.appendChild(alertError);
  }

  html(container){
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.textContent = "Enter X and Y";

    div.appendChild(p);

    const Xparagraph = document.createElement('p');
    Xparagraph.textContent = "X : ";
    const Xinput = document.createElement('input');
    Xinput.setAttribute('type', 'number');

    this._Xinput = Xinput;
    Xparagraph.appendChild(Xinput);
    div.appendChild(Xparagraph);

    const Yparagraph = document.createElement('p');
    Yparagraph.textContent = "Y : ";
    const Yinput = document.createElement('input');
    Yinput.setAttribute('type', 'number');

    this._Yinput = Yinput;
    Yparagraph.appendChild(Yinput);
    div.appendChild(Yparagraph);

    const CNparagraph = document.createElement('p');
    CNparagraph.textContent = "Control numbers ad + bc : ";
    const CNinput = document.createElement('input');
    CNinput.setAttribute('type', 'number');

    this._CNinput = CNinput;
    CNparagraph.appendChild(CNinput);
    div.appendChild(CNparagraph);

    const button = document.createElement('button');
    button.textContent = "Caculate";
    button.addEventListener('click', this.caculate.bind(this));

    div.appendChild(button);

    const divRes = document.createElement('div');

    this._divResult = divRes;
    div.appendChild(divRes);

    const errors = document.createElement('div');

    this._divErrors = errors;
    div.appendChild(errors);

    container.appendChild(div);
  }
}