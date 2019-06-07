window.addEventListener('load', function(){
  const body = document.body;
  const eventName = 'loaded';
  const input = new Input(eventName, body);

  const inputContainer = document.querySelector('.input-container');
  input.html(inputContainer);

  body.addEventListener(eventName, event => {
    const res = event.detail;
    console.log(res);

    showTable(res);
  }, false);

  // const base = [
  //   'hzt',
  //   'sng',
  //   'ena',
  //   'sdt',
  //   'qds',
  //   'yif',
  //   'slt',
  //   'lpz',
  //   'cqc',
  //   'hpo'
  // ];
  // const arr = [2, 5 ,3 ,0, 2, 3, 0, 3];

  // const size = base.length;
  // const sorted = new Array(size);
});

function showTable(arr){
  const unsortedArr = document.querySelector("#array");
  unsortedArr.childNodes.forEach(child => {
    child.parentNode.removeChild(child);
  });
  for (const a of arr) {
    const node = document.createTextNode(a);
    const br = document.createElement('br');
    unsortedArr.appendChild(node);
    unsortedArr.appendChild(br);
  }

  const sorted = document.querySelector("#sorted");
  sorted.childNodes.forEach(child => {
    child.parentNode.removeChild(child);
  });
  arr = SortCharacters.radixSort(arr, 3);
  for (const a of arr) {
    const node = document.createTextNode(a);
    const br = document.createElement('br');
    sorted.appendChild(node);
    sorted.appendChild(br);
  }

  const numbersOfLetters = document.querySelector("#letters");
  numbersOfLetters.childNodes.forEach(child => {
    child.parentNode.removeChild(child);
  });
  const letters = SortCharacters.numbersOfCharacters(arr);
  
  const sortedLetters = Array.from(letters.entries()).sort((a, b) => b[1]-a[1]);

  for (const [key, value] of sortedLetters) {
    const node = document.createTextNode(`${key} (${value})`);
    const br = document.createElement('br');
    numbersOfLetters.appendChild(node);
    numbersOfLetters.appendChild(br);
  }


  let max = Array.from(letters.values()).reduce((a, b) => Math.max(a, b));
  // for (const value of letters.values()) {
  //   if(value > max){
  //     max = value;
  //   }
  // }

  let maxValues = Array.from(letters.entries()).filter(([key, value]) => value === max).map(([key]) => key);
  // for (const [key, value] of letters) {
  //   if(value == max){
  //     maxValues.push(key);
  //   }
  // }

  const first = arr[0];
  const last = arr[arr.length-1];

  let parols = maxValues.map(letter => `${first}${letter}${last}`);
  // for (const letter of maxValues) {
  //   parols.push(`${first}${letter}${last}`);
  // }

  const result = document.querySelector(".parol");
  result.textContent = parols.join(' ');
  // for (const parol of parols) {
  //   result.textContent += parol + " ";
  // }
}
