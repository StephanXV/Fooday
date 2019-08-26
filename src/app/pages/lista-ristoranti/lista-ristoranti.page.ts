import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-lista-ristoranti',
  templateUrl: './lista-ristoranti.page.html',
  styleUrls: ['./lista-ristoranti.page.scss'],
})
export class ListaRistorantiPage implements OnInit {

  restaurants = ['Da Maurizio', 'Shabu Shabu', 'Farina & Co', 'Peste & Corna', 'Sole e Luna', 'Lu Barrott'];

  constructor(private navController:NavController) { }

  ngOnInit() {
  }

  onRestaurantClick(restaurant) {
    console.log(restaurant);
  }
}
