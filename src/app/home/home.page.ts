import { Component } from '@angular/core';
import { GroceryService } from '../service/grocery.service';
import { Router } from '@angular/router';
import { timeout } from 'q';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  item = {
    name :"",
    price :0,
    type :"",
  }

  groceryList;
  ItemsList;
  user;
  sub;
  constructor(private groceryS: GroceryService, private route: Router, private alertCtrl: AlertController ,public authService: GroceryService,private afAuth: AngularFireAuth) {

    // this.groceryList=this.groceryS.getItems();

    this.groceryS.getItems1().subscribe(data =>{

      this.ItemsList=data.map(e =>{
        return{
          key: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Item;
      });
      console.log(this.ItemsList);
    })

    this.sub=this.afAuth.authState.subscribe(data=>{
      this.user=data.email;
    })
  }

  update(item){
    this.route.navigate(['/updatep'], { queryParams: { key: item.key , name: item.name , price:item.price , type:item.type }});
  }
  
  // update(){
  //   this.route.navigateByUrl("updatep");
  // }
  delete(item){
     this.alertCtrl.create({
      // message: ""
      subHeader: 'Are you sure you want to delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
           
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.groceryS.delete(item.key)
          }
        }
      ]
    }).then(
      alert=> alert.present()
    );
    
    
  
  }
  getItems(){

  }
  add(){
    this.route.navigateByUrl("add-item");
  }

  logOut(){
    console.log("press")
    this.sub.unsubscribe();
    this.groceryS.logout();
  }
}
