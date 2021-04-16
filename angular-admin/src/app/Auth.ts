import {User} from "./interfaces/user";
import {EventEmitter} from "@angular/core";

export class Auth {
  static userEmitter: EventEmitter<User> = new EventEmitter<User>();
}
