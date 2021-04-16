import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Role} from "../../../interfaces/role";
import {RoleService} from "../../../services/role.service";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  id: number;
  form: FormGroup;
  roles: Role[] = [];

  constructor(private fb: FormBuilder,
              private roleService: RoleService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: '',
      last_name: '',
      email: '',
      role_id: ''
    })
    this.roleService.all().subscribe(roles => this.roles = roles);

    this.id = this.route.snapshot.params.id;
    this.userService.get(this.id).subscribe(
      user => {
        this.form.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role_id: user.role?.id
        });
      }
    );
  }

  submit(): void {
    this.userService.update(this.id, this.form.getRawValue()).subscribe(
      user => this.router.navigate(['/users'])
    );
  }
}