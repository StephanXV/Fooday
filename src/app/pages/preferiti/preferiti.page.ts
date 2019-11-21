import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Ristorante} from '../../model/ristorante.model';
import {RistoranteService} from '../../services/ristorante.service';
import {AlertController, IonItemSliding, ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {Recensione} from '../../model/recensione.model';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.page.html',
  styleUrls: ['./preferiti.page.scss'],
})
export class PreferitiPage implements OnInit {

  private preferiti$: Observable<Ristorante[]>;
  private preferiti: Ristorante[];
  private utente: Utente;
  private deleteTitle: string;
  private messageTitle: string;
  private deleteButton: string;
  private cancelButton: string;
  private loaded = false;

  constructor(private ristoranteService: RistoranteService,
              private alertController: AlertController,
              private translate: TranslateService,
              private utenteService: UtenteService) {}

  ngOnInit() {
    this.initTranslate();
    this.utenteService.getUtente().subscribe( (utente) => {
      this.utente = utente;
      this.listPreferiti();
    });
  }

  ionViewWillEnter() {
    this.listPreferiti();
    this.initTranslate();
    this.loaded = false;
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
            this.ristoranteService.deletePreferito(idRistorante, idUtente).subscribe(() => {this.ionViewWillEnter(); });
          }
        }
      ]
    });

    await alert.present();
  }

  listPreferiti() {
    this.preferiti$ = this.ristoranteService.getRistorantiPreferiti(this.utente.id);
    this.ristoranteService.getRistorantiPreferiti(this.utente.id).subscribe( (preferiti) => {
      this.preferiti = preferiti;
      this.loaded = true;
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

  initTranslate() {
    this.translate.get('DELETE_BUTTON').subscribe((data: string) => {
      this.deleteButton = data;
    });
    this.translate.get('CANCEL_BUTTON').subscribe((data: string) => {
      this.cancelButton = data;
    });
    this.translate.get('WARNING_TITLE').subscribe((data: string) => {
      this.deleteTitle = data;
    });
    this.translate.get('PREFERITI_DELETE_MESSAGE').subscribe((data: string) => {
      this.messageTitle = data;
    });
  }

}
