import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Prenotazione} from '../../model/prenotazione.model';
import {PrenotazioneService} from '../../services/prenotazione.service';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {AlertController, IonItemSliding, ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.page.html',
  styleUrls: ['./prenotazioni.page.scss'],
})
export class PrenotazioniPage implements OnInit{
  private utente: Utente;
  private prenotazioni$: Observable<Prenotazione[]>;
  private deleteTitle: string;
  private messageTitle: string;
  private deleteButton: string;
  private cancelButton: string;
  private currentDate: Date = new Date();

  constructor(private prenotazioneService: PrenotazioneService,
              private alertController: AlertController,
              private translateService: TranslateService,
              private utenteservice: UtenteService) { }

  ngOnInit() {
    this.initTranslate();
    this.utenteservice.getUtente().subscribe( (utente) => {
      this.utente = utente;
      this.listPrenotazioni();
    });
  }

  listPrenotazioni() {
    this.prenotazioni$ = this.prenotazioneService.getPrenotazioni(this.utente.id);
  }

  async deletePrenotazioni(sliding: IonItemSliding) {
    sliding.close();
  }

  async deleteAlert(idRistorante, timestamp) {

    const alert = await this.alertController.create({
      header: this.deleteTitle,
      message: this.messageTitle,
      buttons: [
        {
          text: this.cancelButton,
          handler: () => {
            console.log('Annulla clicked');
          }
        },
        {
          text: this.deleteButton,
          handler: () => {
            this.prenotazioneService.deletePrenotazioni(this.utente.id, idRistorante, timestamp).subscribe( () =>
                this.listPrenotazioni());
            console.log('Prenotazione rimossa');
          }
        }
      ]
    });

    await alert.present();
  }

  initTranslate() {
    this.translateService.get('WARNING_TITLE').subscribe((data: string) => {
      this.deleteTitle = data;
    });
    this.translateService.get('PRENOTAZIONI_DELETE_MESSAGE').subscribe((data: string) => {
      this.messageTitle = data;
    });
    this.translateService.get('DELETE_BUTTON').subscribe((data: string) => {
      this.deleteButton = data;
    });
    this.translateService.get('CANCEL_BUTTON').subscribe((data: string) => {
      this.cancelButton = data;
    });
  }

}
