import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';
import { LinguaService } from './services/lingua.service';
import {AUTH_TOKEN, UTENTE_STORAGE, X_AUTH} from './constants';
import {registerLocaleData} from '@angular/common';
import localeIT from '@angular/common/locales/it';
import localeEN from '@angular/common/locales/en';

const STORAGE_LOCATION_KEY = 'location';
const STORAGE_LANGUAGE_KEY = 'language';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private lingua: LinguaService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.splashScreen.show()
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // to fix the server restart problems, remove only the user from storage
      this.storage.remove(AUTH_TOKEN).then( () => {
        this.storage.remove(X_AUTH).then(() => {
          this.storage.remove(UTENTE_STORAGE).then(() => {
            this.initStorage();
          });
        });
      });

    });
  }

  initTranslate(val) {
    this.translate.use(val);
    if (val == 'it') {
      registerLocaleData(localeIT, val);
    } else {
      registerLocaleData(localeEN, val);
    }
  }

  private initStorage() {
    this.storage.keys().then(ris => {
      if (ris.includes('location')) {
        this.storage.get(STORAGE_LOCATION_KEY).then((val) => {
          console.log('Location is: ', val);
        });
      } else {
        console.log('non contiene location');
        this.storage.set(STORAGE_LOCATION_KEY, true);
      }

      if (ris.includes('language')) {
        this.storage.get(STORAGE_LANGUAGE_KEY).then((val) => {
          console.log('Language is: ', val);
          this.initTranslate(val);
        });
      } else {
        console.log('non contiene language', 'default:', this.lingua.getDefaultLanguage());
        this.storage.set(STORAGE_LANGUAGE_KEY, this.lingua.getDefaultLanguage());
        this.initTranslate(this.lingua.getDefaultLanguage());
      }
    });
  }
}
