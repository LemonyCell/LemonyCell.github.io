quickSort = function(indexes, values, left, right){
    if (left < right){
        // робимо початкове присвоєння
        const q = partition(indexes, values, left, right);

        this.quickSort(indexes, values, left, q - 1);
        this.quickSort(indexes, values, q + 1, right);
    }
}

partition = function(indexes, values, left, right){
    if(left == right){
        return right;
    }
    if(right - left == 1){
        return right;
    }
    const x = values[right];
    let i = left - 1;
    for (let j = left; j < right; j++){
        if(values[j] >= x){
            i++;
            swap(indexes, values, i, j);
        }
    }
    swap(indexes, values, right, i+1);

    return i + 1;
}

swap = function(indexes, values, index1, index2){
    if(index1 == index2){
        return;
    }
    let temp = values[index1];
    values[index1] = values[index2];
    values[index2] = temp;

    temp = indexes[index1];
    indexes[index1] = indexes[index2];
    indexes[index2] = temp;
}