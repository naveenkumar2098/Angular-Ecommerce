import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  users: User[] = [];
  exits: boolean = true;

  formRegister: FormGroup;
  success: boolean = false;
  hasError: boolean = false;

  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private router: Router) {
    this.formRegister = this.formBuilder.group({
      firstName: ['', Validators.minLength(2)],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.minLength(8)],
      address: ['', Validators.required],
      addressOpt: [''],
      phone: ['', Validators.required],
      birthdate: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      shoppingCart: [[]],
      orders: [[]]
    });
  }

  ngOnInit(): void {
  }

  registerUser() {
    let formData = this.formRegister.value;
    if (this.formRegister.valid) {
      this.usersService.listOneByEmail(formData.email).subscribe(data => {
        this.user = data[0];
        this.user != undefined ? this.exits = true : this.exits = false;
        if (this.exits) {
          this.hasError = true;
          window.scroll(0, 0);
        } else {
          this.usersService.insertUser(formData).subscribe(() => {
            this.usersService.listAll();
          });
          this.usersService.insertUser(formData);
          this.success = true;
          this.hasError = false;
          window.scroll(0, 0);
          setTimeout(() => this.router.navigate(['/login']), 3000);
        }
      });
    } else {
      console.log('There seems to be something wrong!');
    }
  }

  get firstName() {
    return this.formRegister.controls.firstName;
  }
  get lastName() {
    return this.formRegister.controls.lastName;
  }
  get email() {
    return this.formRegister.controls.email;
  }
  get password() {
    return this.formRegister.controls.password;
  }
  get address() {
    return this.formRegister.controls.address;
  }
  get phone() {
    return this.formRegister.controls.phone;
  }
  get birthdate() {
    return this.formRegister.controls.birthdate;
  }
  get postalCode() {
    return this.formRegister.controls.postalCode;
  }
  get city() {
    return this.formRegister.controls.city;
  }
  get country() {
    return this.formRegister.controls.country;
  }

}
