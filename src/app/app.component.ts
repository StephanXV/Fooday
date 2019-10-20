import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.splashScreen.show()
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.initTranslate();
    });

  }

  initTranslate() {
    this.translate.setDefaultLang('it');
    this.translate.use('it');
  }
}
