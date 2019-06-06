class Input {
    constructor(eventName, eventElement){
      this._eventName = eventName;
      this._eventElement = eventElement;
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

        input.addEventListener('change', function(){
            this.startRead();
         }.bind(this));

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
        
        const innerHTML = `
        <div class="file-input">
                <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                    </div>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01">
                        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                    </div>
                </div>
                <div class="errors">
                </div>
        </div>
        `;
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

        let isValid = fileString.match( "[^a-z \n\r]" );
        console.log("isValid : ", isValid);
        if(isValid != null) {
          this.showFileError("Error! The file must contain only letters.");
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
        const content = fileString.split('\r\n');
        this.arr = content;

        const event = new CustomEvent(this._eventName, { 'detail': content });
        const res = this._eventElement.dispatchEvent(event);
    }
}