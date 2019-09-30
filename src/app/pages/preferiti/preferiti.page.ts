import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Ristorante} from '../../model/ristorante.model';
import {RistoranteService} from '../../services/ristorante.service';
import {AlertController, IonItemSliding, ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.page.html',
  styleUrls: ['./preferiti.page.scss'],
})
export class PreferitiPage implements OnInit {

  private preferiti$: Observable<Ristorante[]>;
  private utente: Utente;
  private deleteTitle: string;
  private messageTitle: string;
  private deleteButton: string;
  private cancelButton: string;

  constructor(private ristoranteService: RistoranteService,
              private alertController: AlertController,
              private translateService: TranslateService,
              private utenteService: UtenteService) {}

  ngOnInit() {
    this.initTranslate();
    this.utenteService.getUtente().subscribe( (utente) => {
      this.utente = utente;
      this.listPreferiti();
    });
  }

  async deleteRistoranteByPreferiti(idRistorante, idUtente) {

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
            console.log('Preferito Rimosso: ' + idRistorante);
            this.ristoranteService.deletePreferito(idRistorante, idUtente).subscribe(() => {this.listPreferiti(); });
          }
        }
      ]
    });

    await alert.present();
  }

  listPreferiti() {
    this.preferiti$ = this.ristoranteService.getRistorantiPreferiti(this.utente.id);
  }

  initTranslate() {
    this.translateService.get('PREFERITI_DELETE_TITLE').subscribe((data: string) => {
      this.deleteTitle = data;
    });
    this.translateService.get('PREFERITI_DELETE_MESSAGE').subscribe((data: string) => {
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
