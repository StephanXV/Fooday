import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Ristorante} from '../../model/ristorante.model';
import {RistoranteService} from '../../services/ristorante.service';
import {Citta} from '../../model/citta.model';
import {Categoria} from '../../model/categoria.model';
import {CategoriaService} from '../../services/categoria.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private cityId = 6;
  private ristoranti$: Observable<Ristorante[]>;
  private categorie$: Observable<Categoria[]>;
  cities = ['Milano', 'Roma', 'Venezia', 'Torino', 'L\'Aquila'];

  constructor(private router: Router, private ristoranteService: RistoranteService,
              private categoriaService: CategoriaService) {}


  ngOnInit() {
    this.ristoranti$ = this.ristoranteService.listDintorni(this.cityId);
    this.categorie$ = this.categoriaService.list();
  }

  onCategoryClick(category) {
    console.log(category);
  }

  onCityClick(city) {
    console.log(city);
  }

  onRestaurantClick(restaurant) {
    console.log(restaurant);
  }

}
