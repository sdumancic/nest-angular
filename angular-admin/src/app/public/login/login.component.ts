import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './../public.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

  submit():void {
    this.authService.login( this.form.getRawValue())
      .subscribe(res => this.router.navigate(['/']));
  }
}
