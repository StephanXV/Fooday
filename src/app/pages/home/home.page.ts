import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  categories = ['Pizzeria', 'Osteria', 'Trattoria', 'Cinese', 'Vegano'];
  cities = ['Milano', 'Roma', 'Venezia', 'Torino', 'L\'Aquila'];
  restaurants = ['Da Maurizio', 'Shabu Shabu', 'Farina & Co', 'Peste & Corna', 'Sole e Luna', 'Lu Barrott'];

  constructor(private router: Router) {}

  onCategoryClick(category) {
    console.log(category);
    this.router.navigateByUrl('/tabs/home/lista-ristoranti');
  }

  onCityClick(city) {
    console.log(city);
    this.router.navigateByUrl('/tabs/home/lista-ristoranti');
  }

}
