import Person from './modules/Person';

class Adult extends Person {
    payTaxes() {
        console.log(this.name + " is paying Taxes");
    }
}

var John = new Person("John Doe", "Blue");
John.greet();

var Jane = new Adult("Jane Doe", "Red");
Jane.greet();
Jane.payTaxes();