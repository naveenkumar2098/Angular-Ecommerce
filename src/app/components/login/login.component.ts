import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  formLogin: FormGroup;
  exits: boolean = true;
  success: boolean = false;
  hasError: boolean = false;

  constructor(private usersService: UsersService, private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get email() {
    return this.formLogin.controls.email;
  }

  loginUser() {
    let formData = this.formLogin.value;
    if (this.formLogin.valid) {
      this.usersService.listOneByEmail(formData.email).subscribe(data => {
        this.user = data[0];
        this.user != undefined ? this.exits = true : this.exits = false;
        if (this.exits && this.user.password === formData.password) {
          this.loginService.hasLoggedIn = true;
          this.loginService.userId = this.user.id;
          this.hasError = false;
          this.success = true;
          window.scroll(0, 0);
          setTimeout(() => this.router.navigate(['/account', this.user.id]), 1000);
        } else {
          this.hasError = true;
        }
      });
    } else {
      this.hasError = true;
    }
  }

}
