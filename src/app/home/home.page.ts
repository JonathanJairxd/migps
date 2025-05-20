import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';

import { Firestore, collection, addDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonInput,
  ],
})
export class HomePage {
  latitude: number | null = null;
  longitude: number | null = null;
  nombre: string = '';

  constructor(private firestore: Firestore) {
    this.getCurrentLocation();
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
        console.log('Ubicación obtenida: ', this.latitude, this.longitude);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  async guardarUbicacion() {
    if (this.latitude && this.longitude && this.nombre.trim() !== '') {
      const link = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
      try {
        const ubicacionesRef = collection(this.firestore, 'ubicaciones');
        await addDoc(ubicacionesRef, {
          nombre: this.nombre,
          latitud: this.latitude,
          longitud: this.longitude,
          link: link
        });
        alert('Ubicación guardada en Firebase');
      } catch (error) {
        console.error('Error al guardar en Firebase:', error);
        alert('Ocurrió un error al guardar');
      }
    } else {
      alert('Faltan datos: asegúrate de poner tu nombre y esperar la ubicación');
    }
  }
}
