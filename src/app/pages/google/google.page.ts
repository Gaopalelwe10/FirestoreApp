import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { GroceryService } from 'src/app/service/grocery.service';
import * as firebase from 'firebase';

export class PhoneNumber {
  number: string;
  // area: string;
  // prefix: string;
  // line: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.number;
    return `+${num}`
  }

}
@Component({
  selector: 'app-google',
  templateUrl: './google.page.html',
  styleUrls: ['./google.page.scss'],
})
export class GooglePage implements OnInit {

  public loginForm: FormGroup;

  windowRef: any;

  phoneNumber = new PhoneNumber()

  verificationCode: string;

  user: any;
  constructor(private afAuth: AngularFireAuth,public authService: GroceryService ) {

   
     }

  ngOnInit() {
    this.windowRef = this.authService.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
  }

  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {

                    this.user = result.user;

    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }

}
