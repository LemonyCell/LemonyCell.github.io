window.addEventListener('load', function(){
  const divReadFile = document.createElement('div');
  divReadFile.classList.add('readFileContainer');
  document.body.appendChild(divReadFile);
  const input = new Input();
  input.html(divReadFile);

  const min = 0;
  const max = 20;

  const arr = [];
  const size = 21;
  for(let i=0; i<size; i++){
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    arr.push(rand);
  }

  const container = new Container();
  container.createItems(arr);
  container.html(document.body);

  const sort = new ItemSort(container);
  sort.quickSort(0, arr.length - 1, sort.partitionLast);
  container.doSwapOrder();
});
