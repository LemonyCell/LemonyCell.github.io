class Input {
    constructor(){
    }

    async StartRead(){
      this.startRead();
    }

    html(container) {
        const divFileInput = document.createElement('div');
        divFileInput.classList.add('file-input');

        const divInputgroup = document.createElement('div');
        divInputgroup.classList.add('input-group');

        const divIGP = document.createElement('div');
        divIGP.classList.add('input-group-prepend');

        const span = document.createElement('span');
        span.id = 'inputGroupFileAddon01';
        span.classList.add('input-group-text');
        span.textContent = 'Upload';

        const divCustomFile = document.createElement('div');
        divCustomFile.classList.add('custom-file');

        const input = document.createElement('input');
        input.id = 'inputGroupFile01';
        input.classList.add('custom-file-input');
        input.type = 'file';
        input.setAttribute("aria-describedby", "inputGroupFileAddon01");

        input.addEventListener('change', async e => {
          await this.StartRead();
        });

        this._input = input;

        const label = document.createElement('label');
        label.classList.add('custom-file-label');
        label.setAttribute('for', 'inputGroupFile01');
        label.textContent = 'Choose file';

        this._label = label;

        const divErrors = document.createElement('div');
        divErrors.classList.add('errors');

        this._divErrors = divErrors;

        divFileInput.appendChild(divInputgroup);
        divFileInput.appendChild(divErrors);
        divInputgroup.appendChild(divIGP);
        divIGP.appendChild(span);
        divInputgroup.appendChild(divCustomFile);
        divCustomFile.appendChild(input);
        divCustomFile.appendChild(label);

        container.appendChild(divFileInput);
        this._parent = container;
    }
    
    startRead(){
      // obtain input element through DOM
      const file = this._input.files[0];
      if(file){
        const name = file.name;
        this._label.innerHTML = name;

        console.log("filename : ", name);
        const isTxt = name.match("^.+\.txt$");
        if(isTxt == null){
            this.showFileError("Error! Unsupported format. Only .txt support");
        return; // file has unsupported format
        }

        const reader = new FileReader();

        // Read file into memory as UTF-8
        reader.readAsText(file, "UTF-8");
      
        // Handle progress, success, and errors
        reader.onload = this.loaded.bind(this); // чому передається evt якщо я зробив бінд зіс?
        reader.onerror = this.errorHandler;
      }
    }

    loaded(evt) {
        const fileString = evt.target.result;
        console.log("fileString : \n", fileString);

        let isValid = fileString.match( "[^0-9 \n\r]" );
        console.log("isValid : ", isValid);
        if(isValid != null) {
          this.showFileError("Error! The file must contain only numbners.");
          return; // there are not numbers or spaces
        }

        this.createArr(fileString);
    }

    errorHandler(evt) {
      if(evt.target.error.name == "NotReadableError") {
        // The file could not be read
      }
    }

    showFileError(message){
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

    createArr(fileString){
      const content = fileString.split('\n');
      this.arr = [];
      for(let i=1; i<content.length; i++){
        this.arr.push( +content[i] );
      }
    }
  }

class RadixSort extends Input{
  createArr(fileString){
    super.createArr(fileString);

    this.showInput();
  }  

  showInput(){
    const div = document.createElement('div');
    const input = document.createElement('input');
    div.appendChild(input);
    input.setAttribute('type', 'text');

    this._IteratorInput = input;

    const button = document.createElement('button');
    button.textContent = 'Get Heaps';
    div.appendChild(button);
    button.addEventListener('click', this.getHeaps.bind(this));

    this._parent.appendChild(div);
  }

  getHeaps(){
    if(this._IteratorInput == undefined){
      return;
    }
    const val = this._IteratorInput.value;
    if(val.match( "[^0-9]" )){
      return;
    }
    const stop = +val;

    const low = new HeapLow();
    const high = new HeapHigh();

    let iterator = 0;
    let medians = [];

    for (const a of this.arr) {
      if (low.size == 0 && high.size == 0)
      {
        high.add(a);
        medians.push(high.max);
        continue;
      }
      
      if (a < low.max)
      {
        low.add(a);
      }
      else
      {
        high.add(a);
      }

      if (low.size - high.size == 2)
      {
        var max = low.delete(0);
        high.add(max);
      }
      else if (high.size - low.size == 2)
      {
        var min = high.delete(0);
        low.add(min);
      }

      medians.length = 0;

      if ((low.size + high.size) % 2 == 0)
      {
        medians.push(low.max);
        medians.push(high.min);
      }
      else
      {
        if (low.size > high.size)
        {
          medians.push(low.max);
        }
        else
        {
          medians.push(high.min);
        }
      }
      if (iterator == stop)
      {
        this.showResults(low.arr, high.arr, medians);
        return;
      }
      iterator++;
    }
  }

  showResults(Hlow, Hhigh, Hmedians){
    const div = document.createElement('div');
    const br = document.createElement('br');

    const low = document.createElement('p');
    let result = "Hlow [ ";
    for (const l of Hlow) {
      result += l + " ";
    }
    result += "]";
    low.textContent = result;
    div.appendChild(low);
    div.appendChild(br);

    const high = document.createElement('p');
    result = "Hhigh [ ";
    for (const h of Hhigh) {
      result += h + " ";
    }
    result += "]";
    high.textContent = result;
    div.appendChild(high);
    div.appendChild(br);

    const medians = document.createElement('p');
    result = "Medians [ ";
    for (const m of Hmedians) {
      result += m + " ";
    }
    result += "]";
    medians.textContent = result;
    div.appendChild(medians);

    this._parent.appendChild(div);
  }

}