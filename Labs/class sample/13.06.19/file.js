class A {
    constructor(callback){
        this.callback = callback;
    }
    getData() {
        throw new Error('unable to abstract class');
    }

    calculate() {
        const result = this.getData().reduce((a, b) => a + b);
        console.log(result);
        if (this.callback) this.callback(result);
    }
}

class B extends A {
    getData() {
        return [1,2,3,4,5];
    }
}