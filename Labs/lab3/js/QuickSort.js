function ItemSort(){
    this.quickSort = function(arr, left, right, Partition)
        {
            if (left < right)
            {
                // робимо початкове присвоєння
                const q = Partition(arr, left, fight);

                QuickSort(arr, left, q - 1, typeOfSort);
                QuickSort(arr, q + 1, right, typeOfSort);
            }
        }
}