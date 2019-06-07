class SortCharacters {

    constructor(){
    }

    static numbersOfCharacters(A){
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

    static radixSort(A, d){
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let B = new Array(A.length);
      
        for(let i=d-1; i>=0; i--){
            SortCharacters.countingSort(A, B, alphabet, i);
            
            [A, B] = [B, A];
        }

        return A;
    }


    // A - array to sort
    // B - array for result
    // K - range ( alphabet )
    // digit - digit ? ;)
    static countingSort(A, B, K, digit){
        const C = Object.assign( Object.create(null), ...K.split('').map(k => ({[k]:0})) );

        // for(let k of K){
        //     C[k] = 0;
        // }
    
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
}