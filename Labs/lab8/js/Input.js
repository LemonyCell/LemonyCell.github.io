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
      const content = fileString.split('\r\n');
      this.arr = [];
      for (const elem of content) {
        const [a, b] = elem.split(" ");
        const u = +a;
        const v = +b;
        this.arr.push( [ u-1, v-1 ] );
      }
    }
  }

class StrongConnectedComponent extends Input{

  createArr(fileString){
    super.createArr(fileString);

    this.show();
  }  

  async show(){
    const p = document.createElement('p');

    const sums = this.caculate();
    p.textContent = `Number of sums = ${sums.length}`;
    this._parent.appendChild(p);
  }

  caculate()
  {
    let size = 0;
    for (const arr of this.arr) {
      for (const a of arr) {
        if(size < a)
          size = a;
      }
    }
    const g = new Graph(size + 1);
    for (const pair of this.arr) {
      const [a, b] = pair;
      g.addEdge(a, b);
    }

    g.printSCCs();

    return 0;
  }
}

class Graph{
  constructor(v){
    this.V = v;
    this.adjacency = new Array(v);
    for (let i=0; i< v; i++){
      this.adjacency[i] = new Array();
    }
    this.f = new Array(v);
  }

  addEdge(v, w){
    this.adjacency[v].push(w);
  }

  transpose()
  {
    const g = new Graph(this.V);
    for (let v = 0; v<this.V; v++)
    {
      // Recur for all the vertices adjacent to this vertex 
      for(const current of this.adjacency[v])
      {
        g.adjacency[current].push(v);
      }
    }
    return g;
  }

  DFSR(v, visited, t)
  {
      // Mark the current node as visited and print it 
      visited[v] = true;

      // All vertices reachable from v are processed by now, 
      const arr = this.adjacency[v];
      for (const curent in arr)
      {
          if (!visited[curent])
          {
              this.DFSR(curent, visited, t);
          }
      }
      // push v to Stack 
      t.iter++;
      this.f[v] = t.iter;
  }

  printSCCs()
  {
    // Mark all the vertices as not visited (For first DFS) 
    const visited = new Array(this.V).fill(false);
    const t = Object.create(null);
    t.iter = 0;
    // Fill vertices in stack according to their finishing 
    // times 
    for (let i = 0; i < this.V; i++)
    {
      if (!visited[i])
      {
        this.DFSR(i, visited, t);
      }
    }

    // Create a reversed graph 
    const gr = this.transpose();
    const indexes = new Array(this.V);
    for (let i = 0; i < this.V; i++)
    {
      indexes[i] = i;
    }
    quickSort(indexes, this.f, 0, this.V-1);
    for (let i = 0; i < this.V; i++)
    {
      this.f[i] = -1;
    }

    let strongComponents = [];

    for (let i = 0; i < this.V; i++)
    {
      visited[i] = false;
    }
    t.iter = 0;

    // Fill vertices in stack according to their finishing 
    // times 
    for (const i in indexes)
    {
      if (!visited[i])
      {
        gr.DFSR(i, visited, t);
        strongComponents.push(t.iter);
        t.iter = 0;
      }
    }


    console.log("Numbers of Strong Connected Components : ");
    strongComponents.sort();
    strongComponents.reverse();
    for (const s of strongComponents)
    {
      console.log(s + " ");
    }
  }

}