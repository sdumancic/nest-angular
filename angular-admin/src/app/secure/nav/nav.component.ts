import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../interfaces/user";
import {Auth} from "../../Auth";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  random$: Observable<{value: string}>;
  user: User;
  private subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.loggedInUser.subscribe(loggedInUser => this.user = loggedInUser)
  }

  logout():void {
    this.authService.logout().subscribe( () => this.user = null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
