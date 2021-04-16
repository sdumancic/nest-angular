import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, of} from "rxjs";
import {shareReplay, tap} from "rxjs/operators";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser = new BehaviorSubject<User>(null);

  constructor(protected http: HttpClient) { }

  login(data): Observable<any> {
    this.loggedInUser.next(data);
    return this.http.post(`${environment.api}/login`, data )
  }

  register(data): Observable<User> {
    this.loggedInUser.next(data);
    return this.http.post<User>(`${environment.api}/register`, data);
  }

  user$(): Observable<User>{
    return this.http.get<User>(`${environment.api}/user`)
      .pipe(
        shareReplay(1),
        tap(user => this.loggedInUser.next(user))
    );
  }

  logout(): Observable<void> {
    this.loggedInUser.next(null);
    return this.http.post<void>(`${environment.api}/logout`,{});
  }

  updateInfo(data): Observable<User> {
    this.loggedInUser.next(data);
    return this.http.put<User>(`${environment.api}/users/info`, data);
  }

  updatePassword(data): Observable<User> {
    this.loggedInUser.next(data);
    return this.http.put<User>(`${environment.api}/users/password`, data);
  }

}
