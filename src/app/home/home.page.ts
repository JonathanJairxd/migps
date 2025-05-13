import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Geolocation} from '@capacitor/geolocation'
import {
  IonContent,
  IonButton,
  IonToolbar,
  IonTitle,
  IonHeader
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonToolbar,
    IonTitle,
    IonHeader
  ]
})
export class HomePage {

  latitude: number | null = null
  longitude: number | null = null

  constructor() {}

  async getCurrentLocation(){
    try{
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude=coordinates.coords.latitude;
      this.longitude=coordinates.coords.longitude;
    }catch(error){
      console.error('No se puede obtener la ubicación', error)
    }
  }
}
