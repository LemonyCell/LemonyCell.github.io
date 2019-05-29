function Container(){

    this.swap = function(item1, item2){
        // animated swap
        const heigth = item1.getItemHtml().offsetHeight + 'px';
        console.log(heigth);
        item1.getItemHtml().style.setProperty('--heigth', heigth);

        const endX = item2.getItemHtml().getBoundingClientRect().left + pageXOffset  + 'px';
        console.log(endX);
        item1.getItemHtml().style.setProperty('--endX', endX);

        item1.getItemHtml().classList.add('swapUp');
        item1.getItemHtml().addEventListener("webkitAnimationEnd", function(){
            item1.getItemHtml().classList.remove('swapUp');
        });
    }

    this.do = function(){
        console.log("item 0 : ", items[0]);
        this.swap(items[0], items[5]);
    }

    let items = [];

    this.createItems = function(arr){
        for(let i=0; i< arr.length; i++)
        {
            items.push(new Item(arr[i]));
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
        for(let i=0; i< items.length; i++){
            items[i].html(cardBody);
        }

        card.appendChild(cardBody);
        //elem[this.constructor.object] = this;
        container.appendChild(card);
      }
}

function Item(item){

    this.getValue = function(){
        return item;
    }

    this.getItemHtml = function(){
        return button;
    }

    const button = document.createElement('button');

    this.html = function(container) {
        button.classList.add('btn');
        button.classList.add('btn-outline-secondary');
        let node = document.createTextNode(item);
        button.appendChild(node);
    
        button[this.constructor.object] = this;
        container.appendChild(button);
      }
}