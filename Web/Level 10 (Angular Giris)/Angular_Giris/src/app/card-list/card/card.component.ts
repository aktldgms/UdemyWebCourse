import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  constructor() {

  }

  ngOnInit():void {

  }

  private product:any[] = [{
    id: 1,
    name: "Iphone 15",
    price: 90000,
    inStock: true,
    description: "Iphone 15 lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus qui dolores explicabo tempora possimus, ipsam officia magnam atque nisi quasi ipsa quaerat quisquam debitis voluptas!",
    imgUrl: "../../../assets/iphone.png"
  },
  {
    id: 2,
    name: "Iphone 16",
    price: 120000,
    inStock: false,
    description: "Iphone 16 lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus qui dolores explicabo tempora possimus, ipsam officia magnam atque nisi quasi ipsa quaerat quisquam debitis voluptas!",
    imgUrl: "../../../assets/iphone.png"
  },
  {
    id: 3,
    name: "Iphone 17",
    price: 170000,
    inStock: true,
    description: "Iphone 17 lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus qui dolores explicabo tempora possimus, ipsam officia magnam atque nisi quasi ipsa quaerat quisquam debitis voluptas!",
    imgUrl: "../../../assets/iphone.png"
  }];

  getProducts() {
    return this.product.filter(p=>p.inStock);
  }

}
