import {Component, Injectable, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import {TranslateService} from '@ngx-translate/core';
import {Platform} from '@ionic/angular';
import { LinguaService } from '../../services/lingua.service';

const STORAGE_LOCATION_KEY = 'location';
const STORAGE_LANGUAGE_KEY = 'language';

@Component({
  selector: 'app-preferenze',
  templateUrl: './preferenze.page.html',
  styleUrls: ['./preferenze.page.scss'],
})

@Injectable({
  providedIn: 'root'
})
export class PreferenzePage implements OnInit {
  private locationValue: boolean;
  private languageValue: any;
  private selectValue: any;

  constructor(private storage: Storage,
              private translateService: TranslateService,
              private platform: Platform,
              private translate: LinguaService) {
  }

  ngOnInit() {
    this.storage.get(STORAGE_LANGUAGE_KEY).then( val => {
      console.log(val);
      this.languageValue = val;
      this.selectValue = val;
    });
    this.storage.get(STORAGE_LOCATION_KEY).then( val => {
      console.log(val);
      this.locationValue = val;
    });
  }

  setLanguage($event) {
    console.log($event.target.value);
    this.storage.remove(STORAGE_LANGUAGE_KEY).then(() => {
      this.storage.set(STORAGE_LANGUAGE_KEY, $event.target.value).then( () => this.translate.setLanguage($event.target.value));
      this.selectValue = $event.target.value;
    });
  }

  setLocation() {
    if (this.locationValue === false) {
      this.storage.remove(STORAGE_LOCATION_KEY).then(() => {
        this.storage.set(STORAGE_LOCATION_KEY, false);
      });
    } else if (this.locationValue === true) {
      this.storage.remove(STORAGE_LOCATION_KEY).then(() => {
        this.storage.set(STORAGE_LOCATION_KEY, true);
      });
    }
  }

}
