window.addEventListener('load', function(){
  const divReadFile = document.createElement('div');
  divReadFile.classList.add('readFileContainer');

  const body = document.body;

  body.appendChild(divReadFile);

  const event = 'loaded';
  const input = new Input(event, body);
  input.html(divReadFile);

  body.addEventListener(event, function (e) {
    const res = e.detail;
    console.log(res);

    showContainer(res);

   }, false);
});

function showContainer(arr){
  /*
  const min = 0;
  const max = 20;

  const arr = [];
  const size = 21;
  for(let i=0; i<size; i++){
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    arr.push(rand);
  }

  */
  const oldContainer = document.querySelectorAll('.card');
    for(let i=0; i< oldContainer.length; i++){
      oldContainer[i].parentNode.removeChild(oldContainer[i]);
    }

  const container = new Container();
  container.createItems(arr);
  container.html(document.body);

  const sort = new ItemSort(container);
  container.clearSwapOrder();
  sort.quickSort(0, arr.length - 1, sort.partitionLast);
  container.doSwapOrder();
}
