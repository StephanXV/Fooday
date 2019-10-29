import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {TranslateService} from '@ngx-translate/core';
import {PrenotazioneService} from '../../services/prenotazione.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

  private utente: Utente;
  private logoutTitle: string;
  private logoutMessage: string;
  private yesButton: string;
  private noButton: string;
  private numberPrenotazione: number;

  constructor(private navController: NavController,
              private utenteService: UtenteService,
              private translateService: TranslateService,
              private alertController: AlertController,
              private prenotazioneService: PrenotazioneService) {
  }

  ngOnInit() {
    this.initTranslate();
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });
  }

  ionViewWillEnter() {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
      this.prenotazioneService.getPrenotazioni(utente.id).subscribe( (prenotazioni) => {
        this.numberPrenotazione = prenotazioni.length;
      });
    });
  }

  async onLogoutButtonClick() {
    const alert = await this.alertController.create({
      header: this.logoutTitle,
      message: this.logoutMessage,
      buttons: [
        {
          text: this.noButton,
          handler: () => {
            console.log('Annulla clicked');
          }
        },
        {
          text: this.yesButton,
          handler: () => {
            this.utenteService.logout();
            this.navController.navigateBack('');
          }
        }
      ]
    });

    await alert.present();
  }

  initTranslate() {
    this.translateService.get('LOGOUT_TITLE').subscribe((data: string) => {
      this.logoutTitle = data;
    });
    this.translateService.get('LOGOUT_MESSAGE').subscribe((data: string) => {
      this.logoutMessage = data;
    });
    this.translateService.get('YES_BUTTON').subscribe((data: string) => {
      this.yesButton = data;
    });
    this.translateService.get('NO_BUTTON').subscribe((data: string) => {
      this.noButton = data;
    });
  }

}
