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
import {HttpClient} from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private requestType: number;
  private cittaLocalizzata = 6;
  private ristoranti$: Observable<Ristorante[]>;
  private categorie$: Observable<Categoria[]>;
  private cities = ['Roma', 'Milano', 'Torino', 'Napoli', 'L\'Aquila'];
  private latitude: any = '';
  private longitude: any = '';
  private keyOpen = '73f45256d96f6980fc804cca915873ea';

  constructor(private router: Router,
              private ristoranteService: RistoranteService,
              private categoriaService: CategoriaService,
              private navController: NavController,
              private geolocation: Geolocation,
              private platform: Platform,
              private httpClient: HttpClient) {
                this.platform.ready().then(() => {
                  this.getCurrentLocation();
                  // this.ristoranteService.getRistorantiAroundUser(this.latitude, this.longitude);
                  this.categorie$ = this.categoriaService.list();
                  this.navController.navigateRoot('tabs');
                });
              }

  ngOnInit() {
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
      console.log(this.latitude + ' lat');
      this.ristoranti$ = this.ristoranteService.getRistorantiAroundUser(this.latitude, this.longitude);
    });
  }

  /*getCityAroundUser(lat, lon) {
    let url = 'https://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lon + '&cnt=10&appid=' +
             this.keyOpen + '&units=metric&lang=it';
    this.httpClient.get(url).subscribe((cityData) => {
      const obj = cityData as any;
      console.log(obj);
    });
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }*/
}
