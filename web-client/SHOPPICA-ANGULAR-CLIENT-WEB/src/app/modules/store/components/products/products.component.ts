import { Product } from './../../../../core/model/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() fullScreen: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  product = {
    id: 1,
    productName: "Cream women pants",
    price: 35,
    image: "/assets/images/products/product-4.jpg",
    sizes: [
      {
        id: 1,
        sizeName: "M"
      },
      {
        id: 2,
        sizeName: "L"
      },
      {
        id: 3,
        sizeName: "XL"
      }
    ],
    colors: [
      {
        id: 1,
        colorName: "Red",
        colorCode: "#ff0000",
      },
      {
        id: 2,
        colorName: "Gray",
        colorCode: "#ccc"
      },
      {
        id: 3,
        colorName: "yellow",
        colorCode: "#e1eb78"
      }
    ],
    isNew: true,
    discount: 20
  };
  listProduct: Product[] = [
    this.product,
    this.product,
    this.product,
    this.product,
    this.product,
    this.product,
    this.product,
    this.product,
  ]

}
