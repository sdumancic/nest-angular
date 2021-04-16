import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  lastPage: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.load();
  }

  load(page: number = 1): void {
    this.userService.all(page).subscribe((response:any)  => {
      this.users = response.data
      this.lastPage = response.meta.last_page;
    });

  }


  delete(id: number): void {
    if (confirm('Are you sure?')) {
      this.userService.delete(id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== id)
      })
    }
  }
}
