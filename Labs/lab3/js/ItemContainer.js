function Container(){
    //#region Animating
    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let swapOrder = [];

    this.doSwapOrder = async function(){
        for(let i=0; i< swapOrder.length; i++){
            await swapOrder[i]();
            await timeout(300);
        }
    }


    this.swap = function(index1, index2){
        if(index1 == index2){
            return;
        }
        const tempValue = this.itemsValues[index1];
        this.itemsValues[index1] = this.itemsValues[index2];
        this.itemsValues[index2] = tempValue;

        // add animation to order
        const elem1 = this.items[index1];
        const elem2 = this.items[index2];
        swapOrder.push(
            async function(){
                elem1.toggleSwaped();

                elem2.toggleSwaped();

                await timeout(700);
                const temp = elem1.getValue();
                elem1.setValue(elem2.getValue());
                elem2.setValue(temp);

                await timeout(700);
                elem1.toggleSwaped();
                elem2.toggleSwaped();
            }
        );
    }
    //#endregion

    this.items = [];
    this.itemsValues = [];

    this.createItems = function(arr){
        for(let i=0; i< arr.length; i++)
        {
            this.items.push(new Item(arr[i]));
            this.itemsValues.push(arr[i]);
        }
    }

    this.html = function(container) {
        // create container
        const card = document.createElement('div');
        card.classList.add('card');
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.classList.add('itemContainer');

        // show Items
        for(let i=0; i< this.items.length; i++){
            this.items[i].html(cardBody);
        }

        card.appendChild(cardBody);
        container.appendChild(card);
      }
}

function Item(item){

    this.toggleSwaped = function(){
        button.classList.toggle('btn-outline-secondary');
        button.classList.toggle('btn-secondary');
    }

    this.getValue = function(){
        return item;
    }

    this.setValue = function(value){
        // there was an error :
        // item and it was not assigned a value so the getValue() function returned the same value
        item = value; 
        button.textContent = value;
    }

    const button = document.createElement('button');

    this.html = function(container) {
        button.classList.add('btn');
        button.classList.add('btn-outline-secondary');
        const node = document.createTextNode(item);

        button.appendChild(node);
    
        //button[this.constructor.object] = this;
        container.appendChild(button);
      }
}

function ItemSort(container){

    this.quickSort = function(left, right, partition){
            if (left < right){
                // робимо початкове присвоєння
                const q = partition(left, right);

                this.quickSort(left, q - 1, partition);
                this.quickSort(q + 1, right, partition);
            }
    }

    this.partitionLast = function(left, right){
            const x = container.itemsValues[right];
            
            let i = left - 1;
            for (let j = left; j < right; j++){
                const arrValue = container.itemsValues[j];
                if(arrValue <= x){
                    i++;
                    container.swap(i, j);
                }
            }
            container.swap(right, i+1);
            return i + 1;
    }
}