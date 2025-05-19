import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
})
export class HomePage {
  latitude: number | null = null;
  longitude: number | null = null;

  constructor() {
    this.getCurrentLocation(); // Obtener ubicación automáticamente
  }

getCurrentLocation() {
  if (!navigator.geolocation) {
    console.error('Geolocalización no está soportada en este navegador.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log('Ubicación obtenida: ', this.latitude, this.longitude); // Verifica la salida en la consola
    },
    (error) => {
      console.error('Error obteniendo ubicación:', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}
}