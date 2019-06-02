window.onload = function(){
    const upload = document.querySelector("[aria-describedby='inputGroupFileAddon01']");
    upload.addEventListener('change',function(){
       startRead();
    });
    const button = document.querySelector("#inversion");
    button.addEventListener('click',function(){
      caculateInversion();
   });
}

var Matrix = new Array();


  //#region File reading
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

      getAsText(file);
    }
  }
  
  function getAsText(readFile) {
    //console.log("readFile : ", readFile);

    var reader = new FileReader();
  
    // Read file into memory as UTF-8
    reader.readAsText(readFile, "UTF-8");
  
    // Handle progress, success, and errors
    reader.onload = obj.loaded.bind(obj);
    reader.onerror = errorHandler;
  }

  const obj = {loaded: function loaded(evt) {
    this.x = 10;
    // Obtain the read file data
    const fileString = evt.target.result;
    console.log("fileString : \n", fileString);

    let isValid = fileString.match( "[^0-9 \n\r]" );
    console.log("isValid : ", isValid);
    if(isValid != null) {
      showFileError("Error! The file must contain only numbers and spaces.");
      //throw "Not supportes format.";
      return; // there are not numbers or spaces
    }

    const arr = fileString.split('\n');
    console.log("arr : ", arr);

    createMatrix(arr);
    showTable();
  }};
  
  function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      // The file could not be read
    }
  }

  function showFileError(message){
    // creating Error div
    const errorDiv = document.createElement("div");
    const node = document.createTextNode(message);
    errorDiv.appendChild(node);
    errorDiv.classList.add("alert");
    errorDiv.classList.add("alert-danger");
    errorDiv.addEventListener('animationend', function(e) { 
      //alert('Animation ' + e.animationName + ' has ended');
      this.remove();
    });
    
    const groupFile = document.querySelector(".errors");
    groupFile.appendChild(errorDiv);
  }
  //#endregion

  function createMatrix(matrix){
    if(Matrix != undefined){
      Matrix.length = 0;
    }

    const rows = + matrix[0].split(' ')[0];
    const columns = + matrix[0].split(' ')[1];
    matrix.shift(); // delete text[0]

    for(let i = 0; i<rows; i++){
      let tempArr = matrix[i].split(' ');
      tempArr.shift(); // delete user number

      for(let j = 0; j<columns; j++){
        tempArr[j] = + tempArr[j]; // convert to number = +
      }

      Matrix.push(tempArr);
    }
    console.log("matrix : ", matrix);
  }

  function showTable(){
    const divTables = document.querySelector('.table');

    if(!divTables.classList.contains('table-visible')){
      divTables.classList.add('table-visible');
    }

    const oldTables = document.querySelectorAll('.table table');
    for(let i=0; i< oldTables.length; i++){
      oldTables[i].parentNode.removeChild(oldTables[i]);
    }

    const table = document.createElement("table");
    table.classList.add('table');
    table.classList.add('table-hover');

    const thead = document.createElement('thead');
    const trHead = document.createElement("tr");
    const thHead = document.createElement("th");
    thHead.setAttribute('scope', 'col');
    thHead.textContent = "User id";

    thead.appendChild(trHead);
    trHead.appendChild(thHead);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for(let i = 0; i<Matrix.length; i++){
      // row
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.setAttribute('scope', 'row');
      th.textContent = i + 1;
      tr.appendChild(th);

      let columns = Matrix[i].length;
      for(let j = 0; j< columns; j++){
        // column
        const td = document.createElement("td"); 
        const node = document.createTextNode(Matrix[i][j]);
        td.appendChild(node);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    //console.log("table : \n", table);

    const div = document.querySelector(".table");
    console.log(div);
    div.appendChild(table);
  }

// #region Inversion

function caculateInversion(){
  const user1 =  document.querySelector("#input_1").value;
  const user2 =  document.querySelector("#input_2").value;
  if(user1 == undefined || user2 == undefined){
    showFileError("Empty input");
    return;
  }    

  const indexes = Matrix[user1-1];
  const values = Matrix[user2-1];

  if(indexes == undefined || values == undefined){
    showFileError("Out of range");
    return;
  }  
  
  const inversions = getInversions(merge(indexes, values));

  const result = document.querySelector("#result");
  result.innerHTML = inversions;
}

function merge(indexes, values){
  if (indexes.length != values.length) return null;

  let result = new Array();

  for (let i = 0; i < indexes.length; i++)
  {
      // if indexes start form 1 - indexes[i]-1
      result[indexes[i] - 1] = values[i];
  }

  return result;
}

function getInversions(arr){
  if (arr.length == 1) return 0;

  let inversions = 0;
  for (let i = 0; i < arr.length - 1; i++)
  {
    //if (i == arr.Length - 1) break;
    for (let j = i + 1; j < arr.length; j++)
    {
      if (arr[i] > arr[j])
        {
          inversions++;
        }
    }
  }
  return inversions;
}

//#endregion