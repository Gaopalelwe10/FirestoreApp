import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth'
import {NavController, AlertController} from '@ionic/angular'
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  list;
  write;

  // class Item  private itemDoc: AngularFirestoreDocument<Item>; 
  private itemDoc: AngularFirestoreDocument<Item>; 
  angularFireAuth: any;
  // item={
  //   name: "",
  //   price: "0",
  //   type: "",
  // };

  constructor(private angularfirestore: AngularFirestore, private nacCtrl: NavController, public afAuth: AngularFireAuth , private alertCtrl :AlertController) { 
    afAuth.auth.onAuthStateChanged((user)=>{
      if(user){
        this.nacCtrl.navigateRoot("home");
      }else{
        this.nacCtrl.navigateRoot("");
      }
    })
  }
  
  getItems(){
    // return this.angularfirestore.collection('grocery').valueChanges();
  }

  post(item, alert){
    this.write=this.angularfirestore.collection<any>('grocery');

    this.write.add(item).then(()=>{
      // alert(alert);
      console.log("added")
    });
  }
  


  getItems1(){
    return this.angularfirestore.collection('grocery').snapshotChanges();
  }

  upDate(key, item){
    // item.name="dove";
    // item.price=15;
    // item.type="soap";
    this.itemDoc = this.angularfirestore.doc<Item>('grocery/' + key);
    this.itemDoc.update(item);
    console.log('updated');

    //  this.angularfirestore.doc('grocery/' + key).update(item);

  }

  delete(key){
    this.angularfirestore.doc('grocery/' + key).delete();
    console.log("deleted")
  }
   // upDate(id ,item){
  //   return this.angularfirestore.doc(id).update(item);
  // //   this.itemDoc = this.angularfirestore.doc<Item>('grocery/1rw3R4HfbcmezHypvx8e');
  // //   // this.
  // //   this.itemDoc.update(item);
  // //  console.log('updated');
  // }

  async login(email: string , password: string){
    await this.afAuth.auth.signInWithEmailAndPassword(email,password).then((success)=>{
       console.log(success);
     }).catch((error)=>{
       this.alertCtrl.create({
        // message: 'You can not order more than six',
        subHeader: 'Wrong Password Or Email',
        buttons: ['Ok']}).then(
        alert=> alert.present()
      );
     })
   }
 
   async signup(email: string , password : string){
     await this.afAuth.auth.createUserWithEmailAndPassword(email,password).then((success)=>{
       console.log(success);
     }).catch((error)=>{
      console.log(error)
     })
   }
 
   async logout(){
     await this.afAuth.auth.signOut().then((success)=>{
       console.log(success);
       console.log("success");
       this.nacCtrl.navigateRoot("login");
     }).catch((error)=>{
       console.log(error)
     })
   }
   async  loginWithGoogle() {
    return await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }
  async  loginWithFacebook() {
    return await this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((success)=>{
      console.log(success);
      console.log("success");
      this.nacCtrl.navigateRoot("login");
    }).catch((error)=>{
      this.alertCtrl.create({
        // message: 'You can not order more than six',
        subHeader: 'Please use your gmail account to login',
        buttons: ['Ok']}).then(
        alert=> alert.present()
      );
    })
  }
  async  loginWithTwitter() {
    return await this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider())
  }

  async  loginWithGithub() {
    return await this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider())
  }
  get windowRef() {
    return window
  }
}
