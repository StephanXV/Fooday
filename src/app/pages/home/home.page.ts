import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Ristorante} from '../../model/ristorante.model';
import {RistoranteService} from '../../services/ristorante.service';
import {Categoria} from '../../model/categoria.model';
import {CategoriaService} from '../../services/categoria.service';
import {NavController} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Platform} from '@ionic/angular';
import {Recensione} from '../../model/recensione.model';
import {Storage} from '@ionic/storage';
import {ImmagineService} from '../../services/immagine.service';
import {Immagine} from '../../model/immagine.model';

declare var google: any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private requestType: number;
  private ristoranti$: Observable<Ristorante[]>;
  private ristoranti: Ristorante[];
  private categorie$: Observable<Categoria[]>;
  private immagine$: Observable<Immagine>;
  private cities = ['Roma', 'Milano', 'Torino', 'Napoli', 'L\'Aquila'];
  private latitude: any = '';
  private longitude: any = '';

  constructor(private router: Router,
              private ristoranteService: RistoranteService,
              private categoriaService: CategoriaService,
              private navController: NavController,
              private geolocation: Geolocation,
              private platform: Platform,
              private storage: Storage,
              private immagineService: ImmagineService) {
      this.platform.ready().then(() => {
      this.getCurrentLocation();
      this.categorie$ = this.categoriaService.list();
      this.navController.navigateRoot('tabs');
      });
  }

  ngOnInit() {
      this.storage.clear().then(() => this.categorie$ = this.categoriaService.list());
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
  getCurrentLocation()  {
    this.geolocation.getCurrentPosition().then((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log(this.longitude + ' long');
      this.ristoranteService.getRistorantiAroundUser(this.latitude, this.longitude).subscribe( (ristoranti) => {
        this.ristoranti = ristoranti;
      });
    });
  }

  calcolaMedie(recensioni: Recensione[]): number {
    let mediaCucina = 0;
    let mediaServizio = 0;
    let mediaPrezzo = 0;
    for (const recensione of recensioni) {
      mediaCucina += recensione.votoCucina;
      mediaServizio += recensione.votoServizio;
      mediaPrezzo += recensione.votoPrezzo;
    }
    mediaCucina /= recensioni.length;
    mediaServizio /= recensioni.length;
    mediaPrezzo /= recensioni.length;
    mediaCucina = Math.floor(mediaCucina * 10) / 10;
    mediaServizio = Math.floor(mediaServizio * 10) / 10;
    mediaPrezzo = Math.floor(mediaPrezzo * 10) / 10;
    return Math.floor(((mediaCucina + mediaServizio + mediaPrezzo) / 3) * 10) / 10;
  }

  showMore() {
    this.requestType = 4;
    this.router.navigate(['/tabs/home/lista-ristoranti', this.requestType, this.latitude + ',' + this.longitude]);
  }
}
