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
  const letters = RadixSort(arr, 3);
}

function RadixSort(A, d){
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  
  const B = new Array(A.length);

  for(let i=d-1; i>=0; i--){
    CountingSort(A, B, alphabet, i);

    for (let j=0; j<B.length; j++) {
      A[j] = B[j];
    }
  }

  // find number of letters in array A
  var letters = new Map();
  for (const string of A) {
    for (const char of string) {
      if(letters.has(char)){
        letters.set(char, letters.get(char) + 1);
      } else {
        letters.set(char, 1);
      }
    }
  }
  return letters;
}

function CountingSort(A, B, K, digit){
    const C = [];
    for(let k of K){
      C[k] = 0;
    }

    for(let a of A){
      C[a[digit]]++;
    }

    for(let i=1; i<=K.length; i++){
      C[K[i]] = C[K[i]] + C[K[i-1]];
    }

    for(let i=A.length-1; i>=0; i--){
      const a = A[i];
      B[C[a[digit]]-1] = a;
      C[a[digit]]--;
    }
}