import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceryService } from 'src/app/service/grocery.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  item = {
    name :"",
    price :"",
    type :"",
  }
  constructor(private alert: AlertController, private grocery: GroceryService) { }

  ngOnInit() {
  }

  submit(){
    this.grocery.post(this.item, this.alert);
  }
  
}
