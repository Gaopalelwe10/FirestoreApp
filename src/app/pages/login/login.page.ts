import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { GroceryService } from 'src/app/service/grocery.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

// export class PhoneNumber {
//   number: string;
//   // area: string;
//   // prefix: string;
//   // line: string;

//   // format phone numbers as E.164
//   get e164() {
//     const num = this.number;
//     return `+${num}`
//   }

// }
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

   public loginForm: FormGroup;

  //  windowRef: any;

  //  phoneNumber = new PhoneNumber()
 
  //  verificationCode: string;
 
  //  user: any;
 
  constructor(public modelController: ModalController , public authService: GroceryService, private alertCtrl : AlertController) { 
    this.loginForm = new FormGroup({
      email:new FormControl(),
      password: new FormControl()
    })
 
  }

  ngOnInit() {
    // this.windowRef = this.authService.windowRef
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    // this.windowRef.recaptchaVerifier.render()
  }
  async login(){
    await this.authService.login(this.loginForm.value["email"], this.loginForm.value["password"]).then((success)=>{
      console.log(success);
    }).catch((error)=>{
      this.alertCtrl.create({
        // message: 'You can not order more than six',
        subHeader: 'Please Enter Password or Email ',
        buttons: ['Ok']}).then(
        alert=> alert.present()
      );
    })
  
  }

  googleLogin() {
    this.authService.loginWithGoogle()
      // .then(res => {
      //   console.log(res);
      //   this.showMessage("success", "Successfully Logged In with Google");
      //   this.isUserLoggedIn();
      // }, err => {
      //   this.showMessage("danger", err.message);
      // });
  }
  // isUserLoggedIn() {
  //   throw new Error("Method not implemented.");
  // }
  // showMessage(arg0: string, arg1: string) {
  //   throw new Error("Method not implemented.");
  // }

  Facebook(){
    this.authService.loginWithFacebook();
  }
  
  Twitter(){
    this.authService.loginWithTwitter();
  }
  Github(){
    this.authService.loginWithGithub();
  }
  // sendLoginCode() {

  //   const appVerifier = this.windowRef.recaptchaVerifier;

  //   const num = this.phoneNumber.e164;

  //   firebase.auth().signInWithPhoneNumber(num, appVerifier)
  //           .then(result => {

  //               this.windowRef.confirmationResult = result;

  //           })
  //           .catch( error => console.log(error) );

  // }

  // verifyLoginCode() {
  //   this.windowRef.confirmationResult
  //                 .confirm(this.verificationCode)
  //                 .then( result => {

  //                   this.user = result.user;

  //   })
  //   .catch( error => console.log(error, "Incorrect code entered?"));
  // }

 
}
