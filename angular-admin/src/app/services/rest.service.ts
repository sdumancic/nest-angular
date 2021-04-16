import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  abstract get endpoint(): string;

  constructor(protected http: HttpClient) { }

  all(page?: number): Observable<any> {
    let url = this.endpoint;
    if (page) {
      url = `${this.endpoint}?page=${page}`;
    }
    return this.http.get(url);
  }

  get(id: number): Observable<any> {
    return this.http.get<User>(`${this.endpoint}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(this.endpoint, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }

  update(id: number, data): Observable<any> {
    return this.http.put(`${this.endpoint}/${id}`, data);
  }
}
