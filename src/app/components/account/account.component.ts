import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userId: number;
  user: User;
  updating: boolean;

  formAccount: FormGroup;
  success = false;

  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.formAccount = this.formBuilder.group({
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
      shoppingCart: [''],
      orders: [''],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.usersService.listOne(this.userId).subscribe(data => {
      this.user = data;
      this.formAccount = this.formBuilder.group({
        firstName: [this.user.firstName, Validators.minLength(2)],
        lastName: [this.user.lastName, Validators.required],
        email: [this.user.email, Validators.email],
        password: [this.user.password, Validators.minLength(8)],
        address: [this.user.address, Validators.required],
        addressOpt: [this.user.addressOpt],
        phone: [this.user.phone, Validators.required],
        birthdate: [this.user.birthdate, Validators.required],
        postalCode: [this.user.postalCode, Validators.required],
        city: [this.user.city, Validators.required],
        country: [this.user.country, Validators.required],
        shoppingCart: [this.user.shoppingCart],
        orders: [this.user.orders]
      });
    });
  }

  editAddress() {
    this.updating = true;
  }

  updateUser() {
    let formData = this.formAccount.value;
    this.user.firstName = formData.firstName;
    this.user.lastName = formData.lastName;
    this.user.email = formData.email;
    this.user.password = formData.password;
    this.user.address = formData.address;
    this.user.addressOpt = formData.addressOpt;
    this.user.phone = formData.phone;
    this.user.postalCode = formData.postalCode;
    this.user.city = formData.city;
    this.user.country = formData.country;
    this.usersService.editUser(this.user).subscribe();
    this.updating = !this.updating;
    this.success = true;
    setTimeout(() => this.success = false, 1500);
  }

  get firstName() {
    return this.formAccount.controls.firstName;
  }
  get lastName() {
    return this.formAccount.controls.lastName;
  }
  get email() {
    return this.formAccount.controls.email;
  }
  get password() {
    return this.formAccount.controls.password;
  }
  get address() {
    return this.formAccount.controls.address;
  }
  get addressOpt() {
    return this.formAccount.controls.addressOpt;
  }
  get phone() {
    return this.formAccount.controls.phone;
  }
  get birthdate() {
    return this.formAccount.controls.birthdate;
  }
  get postalCode() {
    return this.formAccount.controls.postalCode;
  }
  get city() {
    return this.formAccount.controls.city;
  }
  get country() {
    return this.formAccount.controls.country;
  }


}
