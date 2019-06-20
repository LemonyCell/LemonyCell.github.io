class A {
    constructor(callback){
        this.callback = callback;
    }
    getData() {
        throw new Error('unable to abstract class');
    }

    calculate() {
        const result = this.getData().reduce((a, b) => a + b);
        if (this.callback) this.callback(result);
    }
}

class B extends A {
    constructor(filename, callback){
        super(callback);
        this.filename = filename;
    }

    getData() {
        return [1,2,3,4,5];
    }
}

new B('1.txt', (result) => {
    console.log(result);
});