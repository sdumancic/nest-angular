import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title:'',
      description: '',
      image: '',
      price: ''
    });
  }

  submit() {
    this.productService.create(this.form.getRawValue()).subscribe(
      ()=> this.router.navigate(['products'])
    );
  }
}
