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
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { TranslateService } from '@ngx-translate/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private splash = true;
  private requestType: number;
  private ristoranti: Ristorante[];
  private categorie$: Observable<Categoria[]>;
  private cities = ['Roma', 'Milano', 'Torino', 'Napoli', 'L\'Aquila'];
  private latitude: any = '';
  private longitude: any = '';
  private locationValue: boolean;
  private noLocation: boolean;
  private title: string;
  private warningPosition: string;
  private preferences: string;

  constructor(private router: Router,
              private ristoranteService: RistoranteService,
              private categoriaService: CategoriaService,
              private navController: NavController,
              private geolocation: Geolocation,
              private platform: Platform,
              private storage: Storage,
              private translate: TranslateService,
              private diagnostic: Diagnostic,
              private alertController: AlertController) {

  }


  ngOnInit() {
      this.initTranslate();
  }

  ionViewWillEnter() {
    this.initTranslate();
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.checkNetworkConnection();
      } else {
        this.checkLocationAvailable();
        this.categorie$ = this.categoriaService.list();
        this.navController.navigateRoot('tabs/home');
      }
    });
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

  checkLocationAvailable()  {
    this.storage.get('location').then( val => {
      console.log(val);
      this.locationValue = val;
      if (this.locationValue === true) {
        this.checkDiagnosticStateLocation();
      } else {
        this.getRestaurantWithoutLocation();
      }
    });
  }

  private checkDiagnosticStateLocation() {
    if (this.platform.is('cordova')) {
      this.diagnostic.isLocationEnabled().then((isEnabled) => {
        if (!isEnabled) {
          // handle confirmation window code here and then call switchToLocationSettings
          this.diagnostic.switchToLocationSettings();
          console.log('Location is not enabled');
        } else { // get current position
          this.getCurrentLocation();
        }
      });
    } else {
      this.getCurrentLocation();
    }
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log(this.longitude + ' long');
      this.ristoranteService.getRistorantiAroundUser(this.latitude, this.longitude).subscribe((ristoranti) => {
        this.ristoranti = ristoranti;
      });
    });
  }

  async getRestaurantWithoutLocation() {
    console.log('Loading without location...');
    this.noLocation = true;
    const alert = await this.alertController.create({
      header: this.title,
      message: this.warningPosition,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('ok clicked');
          }
        },
        {
          text: this.preferences,
          handler: () => {
            console.log('Preferenze clicked');
            this.router.navigate(['/tabs/home/preferenze']);
          }
        }
      ]
    });

    await alert.present();
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

  private checkNetworkConnection() { // verify if network is available
    this.diagnostic.isWifiEnabled().then((isEnabled) => {
      if (!isEnabled) {
        // handle confirmation window code here and then call switchToLocationSettings
        this.diagnostic.switchToWifiSettings();
        console.log('Network is not enabled');
      } else { // get current position
        this.checkLocationAvailable();
        this.categorie$ = this.categoriaService.list();
        this.navController.navigateRoot('tabs/home');
      }
    });
  }

  initTranslate() {
    this.translate.get('WARNING_TITLE').subscribe((data: string) => {
      this.title = data;
    });
    this.translate.get('POSIZIONE_WARNING').subscribe((data: string) => {
      this.warningPosition = data;
    });
    this.translate.get('PREFERENZE_TITLE').subscribe((data: string) => {
      this.preferences = data;
    });
  }

}
