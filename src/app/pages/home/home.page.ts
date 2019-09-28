import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Ristorante} from '../../model/ristorante.model';
import {RistoranteService} from '../../services/ristorante.service';
import {Citta} from '../../model/citta.model';
import {Categoria} from '../../model/categoria.model';
import {CategoriaService} from '../../services/categoria.service';
import {NavController} from '@ionic/angular';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private utente$: BehaviorSubject<Utente>;
  private cityId = 6;
  private requestType: number;
  private ristoranti$: Observable<Ristorante[]>;
  private categorie$: Observable<Categoria[]>;
  private cities = ['Roma', 'Milano', 'Torino', 'Napoli', 'L\'Aquila'];

  constructor(private router: Router, private ristoranteService: RistoranteService,
              private categoriaService: CategoriaService,
              private navController: NavController,
              private utenteService: UtenteService) {}


  ngOnInit() {
    this.ristoranti$ = this.ristoranteService.getRistorantiByCittaId(this.cityId);
    this.categorie$ = this.categoriaService.list();
    this.utente$ = this.utenteService.getUtente();
    this.navController.navigateRoot('tabs');
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
