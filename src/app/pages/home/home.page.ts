import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Ristorante} from '../../model/ristorante.model';
import {RistoranteService} from '../../services/ristorante.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private ristoranti$: Observable<Ristorante[]>;
  categories = ['Pizzeria', 'Osteria', 'Trattoria', 'Cinese', 'Vegano'];
  cities = ['Milano', 'Roma', 'Venezia', 'Torino', 'L\'Aquila'];
  restaurants = ['Da Maurizio', 'Shabu Shabu', 'Farina & Co', 'Peste & Corna', 'Sole e Luna', 'Lu Barrott'];

  constructor(private router: Router, private ristoranteService: RistoranteService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.ristoranti$ = this.ristoranteService.list();
  }

  onCategoryClick(category) {
    console.log(category);
  }

  onCityClick(city) {
    console.log(city);
  }

  onRestaurantClick(restaurant){
    console.log(restaurant);
  }

}
