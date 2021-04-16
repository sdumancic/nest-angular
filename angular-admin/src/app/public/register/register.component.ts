import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss','./../public.component.scss']
})
export class RegisterComponent implements OnInit {

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  passwordConfirm = '';


  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  submit() {

    this.authService.register({
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
      password_confirm: this.passwordConfirm
    }).subscribe( res => {
      this.router.navigate(['/login']);
    });
  }
}
