class Person {

    constructor(name, favColor) {
        this.name = name;
        this.favouriteColor = favColor;
    }
    
    greet() {
        console.log("Hi there, my name is " + this.name + ". My favourite colour is " + this.favouriteColor);
    }
}

export default Person;