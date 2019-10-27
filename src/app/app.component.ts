import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';

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
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.splashScreen.show()
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.initTranslate();
      this.initStorage();
    });

  }

  initTranslate() {
    this.translate.setDefaultLang('it');
    this.translate.use('it');
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
        });
      } else {
        console.log('non contiene language');
        this.storage.set(STORAGE_LANGUAGE_KEY, 'it');
      }
    });
  }
}
