import { Component, OnInit } from '@angular/core';
import {Product} from "../../interfaces/product";
import {ProductService} from "../../services/product.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  lastPage: number;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.load();
  }

  load(page: number = 1) {
    this.productService.all(page).pipe().subscribe(res => {
      this.products = res.data;
      this.lastPage = res.meta.last_page;
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure?')) {
      this.productService.delete(id).subscribe(() => {
        this.products = this.products.filter(u => u.id !== id)
      })
    }
  }

}
