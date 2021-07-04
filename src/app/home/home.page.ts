import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation,  } from '@ionic-native/geolocation/ngx';
import { Component } from '@angular/core';
import {  AlertController, LoadingController, ToastController,Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lati: any = '';  
  longi: any = '';  
  geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 60000,
    maximumAge: 0
  };
  constructor(public toastCtrl: ToastController , 
    public platform: Platform,
    private androidPermissions: AndroidPermissions,
         public geolocation: Geolocation ,   public loadingController: LoadingController, public alertController: AlertController ) {}
  requestLocationPermission() {
    console.log(`this.requestLocationPermission flow started`)
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION]).then((result)=> {
        console.log(`requestLocationPermission result:::${JSON.stringify(result)}`)
      })
      .catch(()=> {
        this.showLoader('Error in permission')
      })
  }
  async clicked(msg: string){
    const toast = await this.toastCtrl.create({  
      message: msg,                       
      duration: 1000  ,
      position: 'middle',
      color: 'primary'

    });  
    toast.present();  

  }
  async myLocation(){
    if (this.platform.is('android')) {
      this.checkPermission();
    } else {
      this.getCurrentLocation();
    }
  }
  async checkPermission(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
     result => this.getCurrentLocation(),
     err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
      );
  }
   async getCurrentLocation() {  
    const loading = await this.loadingController.create({  
      message: 'Please wait...',  
      });  
    await loading.present();  
  
    this.geolocation.getCurrentPosition(this.geolocationOptions).then((resp) => {  
     
      loading.dismiss();  
      this.lati = resp.coords.latitude;  
      this.longi = resp.coords.longitude; 
      this.showLoader(this.lati+','+this.longi) 
      }, er => {  
        // alert("error getting location")  
        loading.dismiss();  
        this.showLoader('Can not retrieve Location');  
      }).catch((error) => {  
      // alert('Error getting location'+JSON.stringify(error));  
      loading.dismiss();  
      this.showLoader('Error getting location - ' + JSON.stringify(error));  
      });  
  }  
  
 async showLoader(msg) {  
    const alert = await this.alertController.create({  
      message: msg,  
      buttons: ['OK']  
    });  
  
    await alert.present();  
  }  
 
}  
