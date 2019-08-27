import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroceryService } from 'src/app/service/grocery.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-updatep',
  templateUrl: './updatep.page.html',
  styleUrls: ['./updatep.page.scss'],
})
export class UpdatepPage implements OnInit {


  item={
    name: "",
    price:"",
    type:'',
  };

  key;
  name;
  price;
  type;

  constructor(private route: ActivatedRoute, private groceryS: GroceryService , private alertCtro: AlertController) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.key=params.key;
      console.log(this.key);

      this.item.name = params.name;
      console.log(this.item.name );

      this.item.price = params.price;
      console.log(this.item.price);

      this.item.type=params.type;
      console.log(this.item.type);
    });
   
  }
  
 
  update(){
    this.groceryS.upDate(this.key, this.item);
    this. alertCtro.create({
      // message: 'You can not order more than six',
      subHeader: 'Updated',
      buttons: ['Ok']}).then(
      alert=> alert.present()
    );
  }
  delete(){
    this.alertCtro.create({
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
            this.groceryS.delete(this.key);
            this.item.name="";
            this.item.price='';
            this.item.type="";
          }
        }
      ]
    }).then(
      alert=> alert.present()
    );
    
    
    
  }

  // update(){
  //   this.groceryS.upDate(this.item);
  // }
}
