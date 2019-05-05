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
      const text = getAsText(file);
      document.querySelector("[for='inputGroupFile01']").innerHTML = file.name;
      console.log(text);
      //return text;
    }
  }
  
  function getAsText(readFile) {
  
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
      var loaded = (evt.loaded / evt.total);
      if (loaded < 1) {
        // Increase the prog bar length
        // style.width = (loaded * 200) + "px";
      }
    }
  }
  
  function loaded(evt) {
    // Obtain the read file data
    const fileString = evt.target.result;
    console.log("fileString : ", fileString);

    const isValid = fileString.match( "[^ 0-9 || ' ' || '\n' ]" );
    console.log("isValid : ", isValid);
    if(isValid != null) {
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












