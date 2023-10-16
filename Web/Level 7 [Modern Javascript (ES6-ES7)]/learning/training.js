// FILTER AND MAP FUNCTIONS -------------------------------------------------------------------------------------------------------------------------------------------------

const sayilar = [12,123,34235,23543,3543,643,536];
let tek_sayilar = [];

for (sayi of sayilar) {
    if (sayi % 2 == 1) {
        tek_sayilar.push(sayi);
    }
}

tek_sayilar = sayilar.map((sayi) => sayi % 2 == 1); //true, false
console.log (tek_sayilar);
tek_sayilar = sayilar.filter((sayi) => sayi % 2 == 1); //values
console.log (tek_sayilar);

const urunler = [
    {urun_adi: "megane rs", fiyat: 1000000},
    {urun_adi: "911 gt2", fiyat: 15000000},
    {urun_adi: "camaro zl1", fiyat: 8000000},
    {urun_adi: "458 italia", fiyat: 10500000}
]

const filtre = urunler.find(urun => urun.urun_adi == '911 gt2').urun_adi;
console.log(filtre);

// SPREAD OPERATOR (...) ----------------------------------------------------------------------------------------------------------------------------------------------------

function toplam (...args) {
    let sonuc = 0;

    for (number of args) {
        sonuc += number;
    }

    return sonuc;
}

console.log(toplam(18,27,36,45,54,63,72,81,90));
console.log(toplam(18,27,36,45,54,63,72));
console.log(toplam(18,27,36,45,54));
console.log(toplam(18,27,36,45,54,63,72,81,90,99,108));

let dizi1 = [123,13243,135,24525];
let dizi2 = ["asd","asda","asdfa","adfag"];
let dizi3 = [...dizi1, ...dizi2];
console.log (dizi3);

let array1 = [13,15,17];
let array2 = array1; // referance

let list1 = [123,235346,356];
let list2 = [...list1]; // value
let list3 = [...list1, ...array2]; // value

// DESTRUCTURING ------------------------------------------------------------------------------------------------------------------------------------------------------------

let names = ["mete", "metin"];
// let firstname = names[0];
// let lastname = names[1];
let [firstname, lastname] = names; // THAT'S AMAZING
[firstname, lastname] = "Cenk Han".split(" ");
console.log (firstname, lastname);

let product = {
    p_id: 101,
    p_name: "X",
    p_price: 1879
};

let {p_id, p_name, p_price} = product; // THAT'S 2X AMAZING (a little complicated)
console.log(p_id, p_name, p_price);

let product2 = {
    p2_id: 101,
    p2_name: "X",
    p2_price: 123123
};

let {p2_id, p2_name, p2_price = 0, p2_isInStock = false} = product2;

function showProduct(obj) {
    let {p2_id, p2_name, p2_price = 0, p2_isInStock = false} = obj;
    console.log(p2_id,p2_name,p2_price,p2_isInStock);
}

showProduct(product2);

// MAPS ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

let cars = [
    new Map(),
    new Map(),
    new Map(),
    new Map()
]

let i = 0;

// cars[0].set("marka", "BMW");
// cars[0].set("model", "m3 csl");

// cars[1].set("marka", "Koenigsegg");
// cars[1].set("model", "Agera RS");

// cars[2].set("marka", "Lamborghini");
// cars[2].set("model", "Murcielago SV");

// cars[3].set("marka", "Lexus");
// cars[3].set("model", "LFA Nurburgring");

addToCarsList("BMW", "M3 Csl");
addToCarsList("Koenigsegg", "Agera RS");
addToCarsList("Lamborghini", "Murcielago SV");
addToCarsList("Lexus", "LFA Nurburgring");
addToCarsList("Lexus", "LFA Nurburgring");

function getCars() {
    for (car of cars) {
        console.log(car.get("marka"), car.get("model"));
    }
}

let a = new Map();

function addToCarsList(marka, model) {
    if(i < cars.length) {
        cars[i].set("marka", marka);
        cars[i].set("model", model);
        i++;
    }
    else {
        console.log("error!");
    }
}

getCars();

// SETS -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let rakamlar = new Set([1,2,3,4,5,6,7,8,9,0,3,4,5]);
let harfler = new Set(['a','a','b','c','d','d','d','e','f']);
let rakamlarVeHarfler = new Set(['a','a','b','c','d','d','d','e','f',0,0,0,1,2,3,4,5,6,7,8,9,9,9,7,5,6,7,5,2]);
console.log(rakamlar);
console.log(harfler);
console.log(rakamlarVeHarfler);

rakamlar.delete(0);
rakamlar.delete(11);
console.log(rakamlar);

rakamlarVeHarfler.clear();

console.log(harfler.has('f'));
console.log(harfler.has('g'));

console.log(harfler.entries());

// CLASSES ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// class Car {
//     constructor(brand, model, year, type, color) {
//         this.brand = brand;
//         this.model = model;
//         this.year = year;
//         this.type = type;
//         this.color = color;
//     }

//     AgeCalculate() {
//         let now = new Date().getFullYear();
//         return (now - this.year);
//     }
// }

// let myFirstCar = new Car("Ford", "Mustang Super Snake", 2014, "American Muscle Car", "White-Blue");
// let mySecondCar = new Car("Nissan", "Skyline GTR R34 V-Spec 2", 1997, "JDM Car", "Bayside Blue");

// console.log(myFirstCar);
// console.log(myFirstCar.AgeCalculate());
// console.log(mySecondCar);
// console.log(mySecondCar.AgeCalculate());

// GETTER - SETTER ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// class Bike {
//     constructor(brand, model, year, type, color) {
//         this.brand = brand;
//         this.model = model;
//         this.year = year;
//         this.type = type;
//         this.color = color;
//     }

//     AgeCalculate() {
//         let now = new Date().getFullYear();
//         return (now - this.year);
//     }

//     get year() {
//         return this._year;
//     }

//     set year(value) {
//         if (value < 1900 || value > new Date().getFullYear()) {
//             console.log("Hatalı yıl girdiniz.");
//             return;
//         }
//         this._year = value;
//     }
// }

// let myFirstBike = new Bike("Ducati", "Panigale V4", 2024, "Racing Motorbike", "Red");

// Inheritance ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//parent
class Vehicle {
    constructor (brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    AgeCalculate() {
        return (new Date().getFullYear() - this.year);
    }

    DefineItself() {
        return `my name is ${this.model} and i have 2 wheels.`;
    }
}

//child
class Car extends Vehicle {
    constructor(brand,model,year,exhaustCount) {
        super(brand,model,year);
        this.exhaustCount = exhaustCount;
    }

    DefineItself() {
        return `my name is ${this.model} and i have 4 wheels.`;
    }
}

mustang = new Car("Ford", "Mustang", 2014, 4);

console.log(mustang.AgeCalculate());
console.log(mustang.DefineItself());

