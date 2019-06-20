class HeapLow
{
    constructor(){
        this._items = [];
        this.size = 0;
    }

    // constructor(arr){
    //     this._items = [];
    //     this.size = 0;
    //     this.build();
    // }

    heapify(index){
        const l = this.left(index);
        const r = this.right(index);

        let largest = r;

        if (l < this.size && this._items[l] > this._items[index])
        {
            largest = l;
        }
        else
        {
            largest = index;
        }

        if (r < this.size && this._items[r] > this._items[largest])
        {
            largest = r;
        }

        if (largest != index)
        {
            [ this._items[index], this._items[largest] ] = [ this._items[largest], this._items[index] ];
            this.heapify(largest);
        }
    }

    increaseKey(index, key){
        this._items[index] = key;
        while (index > 0 && this._items[this.parent(index)] < this._items[index])
        {
            [ this._items[index], this._items[this.parent(index)] ] = [ this._items[this.parent(index)], this._items[index] ];
            index = this.parent(index);
        }
    }

    build(){
        for (let i = this.size / 2 - 1; i >= 0; i--)
        {
            this.heapify(i);
        }
    }

    get arr(){
        let arr = [];
        for(let i=0; i<this.size; i++){
            arr.push(this._items[i]);
        }
        return arr;
    }

    get max(){
        if (this.size === 0) return 0;
        const max = Math.max(...this._items);
        return max;
    }

    get min(){
        if (this.size === 0) return 0;
        const min = Math.min(...this._items);
        return min;
    }

    add(element){
        this.increaseKey(this.size, element);
        this.size++;
    }

    delete(index){
        if (index < this.size)
        {
            const element = this._items[index];
            this._items[index] = 0;

            if (index == this.size - 1)
            {
                this.size--;
                return this._items.pop();
            }

            this.size--;
            [ this._items[index], this._items[this.size] ] = [ this._items[this.size], this._items[index] ];
            this._items.pop();
            this.heapify(index);

            return element;
        }

        return -1;
    }

    parent(index){
        if (index == 1 || index == 2)
        {
            return 0;
        }

        if (index % 2 == 0)
        {
            return Math.floor(index / 2 - 1);
        }
        return Math.floor(index / 2);
    }

    left(index){
        if (index == 0)
        {
            return 1;
        }
        return Math.floor(index * 2 + 1);
    }

    right(index){
        if (index == 0)
        {
            return 2;
        }
        return Math.floor(index * 2 + 2);
    }
}

class HeapHigh extends HeapLow{
    heapify(index){
        const l = this.left(index);
        const r = this.right(index);

        let smallest = r;

        if (l < this.size && this._items[l] < this._items[index])
        {
            smallest = l;
        }
        else
        {
            smallest = index;
        }

        if (r < this.size && this._items[r] < this._items[smallest])
        {
            smallest = r;
        }

        if (smallest != index)
        {
            [ this._items[index], this._items[smallest] ] = [ this._items[smallest], this._items[index] ];
            this.heapify(smallest);
        }
    }

    increaseKey(index, key){
        this._items[index] = key;
        while (index > 0 && this._items[this.parent(index)] > this._items[index])
        {
            [ this._items[index], this._items[this.parent(index)] ] = [ this._items[this.parent(index)], this._items[index] ];
            index = this.parent(index);
        }
    }

}