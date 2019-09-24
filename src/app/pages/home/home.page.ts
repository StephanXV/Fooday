import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Ristorante} from '../../model/ristorante.model';
import {RistoranteService} from '../../services/ristorante.service';
import {Citta} from '../../model/citta.model';
import {Categoria} from '../../model/categoria.model';
import {CategoriaService} from '../../services/categoria.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private cityId = 6;
  private requestType: number;
  private ristoranti$: Observable<Ristorante[]>;
  private categorie$: Observable<Categoria[]>;
  private cities = ['Roma', 'Milano', 'Torino', 'Napoli', 'L\'Aquila'];

  constructor(private router: Router, private ristoranteService: RistoranteService,
              private categoriaService: CategoriaService) {}


  ngOnInit() {
    this.ristoranti$ = this.ristoranteService.getRistorantiByCittaId(this.cityId);
    this.categorie$ = this.categoriaService.list();
  }

  onCategoryClick(idCategoria: number) {
    this.requestType = 1;
    this.router.navigate(['/tabs/home/lista-ristoranti', this.requestType, idCategoria]);
  }

  onCityClick(nomeCitta: string) {
    this.requestType = 2;
    console.log('Home:' + nomeCitta);
    this.router.navigate(['/tabs/home/lista-ristoranti', this.requestType, nomeCitta]);
  }
}
