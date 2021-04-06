import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  formContacts: FormGroup;
  success = false;

  constructor(private formBuilder: FormBuilder, private messagesService: MessagesService) {
    this.formContacts = this.formBuilder.group({
      date: [new Date],
      firstName: ['', Validators.minLength(2)],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void { 
  }

  sendMessage() {
    let data = this.formContacts.value;
    if (this.formContacts.valid) {
      this.messagesService.insertMessage(data).subscribe(() => {
        this.messagesService.listAll();
      });
      this.messagesService.insertMessage(data);
      this.success = true;
      window.scroll(0, 0);
    } else {
      console.log('Something\'s not right');
    }
  }

  get firstName() {
    return this.formContacts.controls.firstName;
  }
  get lastName(){
    return this.formContacts.controls.lastName;
  }
  get email() {
    return this.formContacts.controls.email;
  }
  get phone() {
    return this.formContacts.controls.phone;
  }
  get subject() {
    return this.formContacts.controls.subject;
  }
  get message() {
    return this.formContacts.controls.message;
  }
}
