import { Product } from "./Product";
import { ProductService } from "./ProductService";

let _productService = new ProductService();
let result;

result = _productService.getProducts();

let p = new Product(2,'Iphone 6', 'Telefon', 4000);

_productService.saveProduct(p);

console.log(result);

// tsc app.ts
// node app.js