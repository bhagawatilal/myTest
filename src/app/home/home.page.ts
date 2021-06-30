import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public toastCtrl: ToastController) {}
  async clicked(){
    const toast = await this.toastCtrl.create({  
      message: 'Open Video clicked',  
      duration: 1000  ,
      position: 'middle',
      color: 'primary'

    });  
    toast.present();  

  }

}
