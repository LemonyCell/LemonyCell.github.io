window.addEventListener('load', function(){
  const arr = [];
  const size = 21;
  for(let i=0; i<size; i++){
    arr.push(i);
  }

  const container = new Container();
  container.createItems(arr);
  container.html(document.body);

  container.do();
/*
  const button = document.querySelector('button');
    button.addEventListener("click", function(){
      const container = document.createElement('div');
      document.body.appendChild(container);
      for(let i=0; i<size; i++){
        arr[i].html(container);
      }
    });
    */
});
