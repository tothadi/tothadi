import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit, OnDestroy {

  subjects = ['Prices', 'Job opportunity', 'Other'];

  name: string;
  address: string;
  subject: string;
  message: string;
  copy = false;
  sent_1 = 'Sending message...';
  sent_2 = 'Message succesfuly sent!';
  sent_3 = 'Please try again!';
  status = 1;

  sent: string;

  subscription: Subscription;
  submitted = false;

  constructor(private messageService: MessageService) {

  }

  sendMessage() {
    var email = JSON.stringify({ jsonName: this.name, jsonAddress: this.address, jsonSubject: this.subject, jsonText: this.message, jsonCopy: this.copy });
    this.messageService.sendMessage(email);
    email = '';
    this.name = '';
    this.address = '';
    this.subject = '';
    this.message = '';
    this.copy = false;
    this.sent = this.sent_1;
    this.submitted = true;

  }

  ngOnInit() {
    this.subscription = this.messageService.getStatus().subscribe(status$ => {
      if (status$) {
        setTimeout(() => {
          this.sent = this.sent_2;
          this.status = 2;
        }, 2000);
        setTimeout(() => {
          this.submitted = false;
          this.status = 1;
        }, 5000);
      } else {
        setTimeout(() => {
          this.sent = this.sent_3;
          this.status = 3;
        }, 2000);
        setTimeout(() => {
          this.submitted = false;
          this.status = 1;
        }, 5000);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
