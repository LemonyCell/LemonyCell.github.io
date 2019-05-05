window.onload = function(){
    const upload = document.querySelector("[aria-describedby='inputGroupFileAddon01']");
    upload.addEventListener('change',function(){
       startRead();
    });
}

 function startRead() {
    // obtain input element through DOM
    var file = document.querySelector("[aria-describedby='inputGroupFileAddon01']").files[0];
    if(file){
      const name = file.name;
      document.querySelector("[for='inputGroupFile01']").innerHTML = name;
      
      console.log("filename : ", name);
      const isTxt = name.match("^.+\.txt$");
      if(isTxt == null){
        showFileError("Error! Unsupported format. Only .txt support");
        return; // file has unsupported format
      }
      const text = getAsText(file);
      console.log(text);
      //return text;
    }
  }
  
  function getAsText(readFile) {
    console.log("readFile : ", readFile);

    var reader = new FileReader();
  
    // Read file into memory as UTF-8
    reader.readAsText(readFile, "UTF-8");
  
    // Handle progress, success, and errors
    reader.onprogress = updateProgress;
    reader.onload = loaded;
    reader.onerror = errorHandler;
  }
  
  function updateProgress(evt) {
    if (evt.lengthComputable) {
      // evt.loaded and evt.total are ProgressEvent properties
      //if (isTxt == null) {
        // Increase the prog bar length
        // style.width = (loaded * 200) + "px";
      //}
    }
  }
  
  function loaded(evt) {
    // Obtain the read file data
    const fileString = evt.target.result;
    console.log("fileString : ", fileString);

    let isValid = fileString.match( "[^ 0-9 || ' ' || '\n' ]" );
    console.log("isValid : ", isValid);
    if(isValid != null) {
      showFileError("Error! The file must contain only numbers and spaces.");
      //throw "Not supportes format.";
      return; // there are not numbers or spaces
    }
    const arr = fileString.split('\n');
    console.log("arr : ", arr);
  }
  
  function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      // The file could not be read
    }
  }

  function showFileError(message){
    const groupFile = document.querySelector(".input-group");
    const errorDiv = document.createElement("div");
    const node = document.createTextNode(message);
    errorDiv.appendChild(node);
    //errorDiv.innerHTML = message;
    errorDiv.classList.add("alert");
    errorDiv.classList.add("alert-danger");
    //errorDiv.after(groupFile);
    groupFile.parentNode.insertBefore(errorDiv, groupFile.nextSibling);
  }