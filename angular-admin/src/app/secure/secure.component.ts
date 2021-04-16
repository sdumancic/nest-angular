import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {User} from "../interfaces/user";
import {AuthService} from "../services/auth.service";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {Auth} from "../Auth";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this.subscription = this.authService.user$().pipe(
      catchError(err => {
        if (err?.status === 403) {
          this.router.navigate(['/login']);
        }
        return of([]);
      })).subscribe((user: User) => Auth.userEmitter.emit(user));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
