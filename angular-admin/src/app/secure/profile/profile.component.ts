import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {mergeMap, tap} from "rxjs/operators";
import {Auth} from "../../Auth";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  infoForm: FormGroup;
  passwordForm: FormGroup;
  private sub1: Subscription;
  private sub2: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService
              ) { }


  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: ''
    });

    this.passwordForm = this.formBuilder.group({
      password: '',
      password_confirm: ''
    });

    this.authService.user$().subscribe((user) => {
      this.infoForm.patchValue(user);
    });

  }

  infoSubmit(): void {
    this.sub1 = this.authService.updateInfo(this.infoForm.getRawValue()).subscribe();
  }

  passwordSubmit(): void {
    this.sub2 = this.authService.updatePassword(this.passwordForm.getRawValue()).subscribe();
  }

  ngOnDestroy(): void {
    if (this.sub1) {this.sub1.unsubscribe()};
    if (this.sub2) {this.sub2.unsubscribe()};
  }

}

