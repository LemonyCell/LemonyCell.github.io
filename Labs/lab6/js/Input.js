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

        input.addEventListener('change', this.StartRead.bind(this));

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

        let isValid = fileString.match( "[^-0-9 \n\r]" );
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
      for(let i=0; i<content.length; i++){
        this.arr.push( + content[i] );
      }
    }
  }

class HashTable extends Input{

  createArr(fileString){
    super.createArr(fileString);

    this.showSums();
  }  

  async showSums(){
    const p = document.createElement('p');
    this.arr = [1, 2, 3, 4];
    const sums = await this.caculateSums();
    p.textContent = `Number of sums = ${sums.length}`;
    this._parent.appendChild(p);
  }

  async caculateSums()
  {
    const size = this.arr.length;
    const T = [];
    T.length = size;

    for (const a of this.arr) {
      this.hashInsert(T, this.hash(a), a);
    }

    let sums = [];
    for (let S = 5; S >= 5; S--)
    {
      for (let i = 0; i < size; i++)
      {
        const y = S - this.arr[i];
        if (this.hashSearch(T, y))
        {
          sums.push(this.arr[i] + y);
          break;
        }
      }
    }
    return await sums;
  }

  hash(x){
    const size = this.arr.length;
    const index = x % size;
    return Math.abs(index);
  }

  hashInsert(T, index, element){
    if(T[index] == undefined){
      T[index] = new Array();
    }
    T[index].unshift(element)
  }

  hashSearch(T, x){
    const index = this.hash(x);
    if (T[index] == undefined || T[index].length == 0)
    {
      return false;
    }
    const arr = T[index];
    for (const t of arr) {
      if (t == x)
        return true;
    }

    return false;
  }
}