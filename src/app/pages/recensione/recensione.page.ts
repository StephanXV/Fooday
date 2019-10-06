import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {RecensioneService} from '../../services/recensione.service';
import {TranslateService} from '@ngx-translate/core';
import {Recensione} from '../../model/recensione.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Ristorante} from '../../model/ristorante.model';
import {PrenotazioneService} from '../../services/prenotazione.service';

@Component({
  selector: 'app-recensione',
  templateUrl: './recensione.page.html',
  styleUrls: ['./recensione.page.scss'],
})
export class RecensionePage implements OnInit {

  private idRistorante: number;
  private prenotazioneTimestamp: number;
  private utente: Utente = new Utente();
  private registrationTitle: string;
  private registrationMessage: string;
  private confirmButton: string;
  private recensione: Recensione = new Recensione();

  private reviewFormModule: FormGroup;
  numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  constructor(private formBuilder: FormBuilder,
              private navController: NavController,
              private utenteService: UtenteService,
              private recensioneService: RecensioneService,
              private translateService: TranslateService,
              private alertController: AlertController,
              private route: ActivatedRoute,
              private prenotazioneService: PrenotazioneService) { }

  ngOnInit() {
    this.initTranslate();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idRistorante = parseInt(params.get('id'), 0);
      this.prenotazioneTimestamp = parseInt(params.get('timestamp'), 0);
    });
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });
    this.reviewFormModule = this.formBuilder.group({
      votoCucina: ['', Validators.compose([Validators.required])],
      votoServizio: ['', Validators.compose([Validators.required])],
      votoPrezzo: ['', Validators.compose([Validators.required])],
      descrizione: ['', Validators.compose([Validators.required])]
    });
  }

  onReviewSubmit() {
    this.recensione.votoCucina = this.reviewFormModule.value.votoCucina;
    this.recensione.votoServizio = this.reviewFormModule.value.votoServizio;
    this.recensione.votoPrezzo = this.reviewFormModule.value.votoPrezzo;
    this.recensione.descrizione = this.reviewFormModule.value.descrizione;
    this.recensione.ristorante = new Ristorante();
    this.recensione.ristorante.id = this.idRistorante;
    this.recensione.utente = new Utente();
    this.recensione.utente.nome = this.utente.nome;
    this.recensione.utente.id = this.utente.id;
    this.recensioneService.createRecensione(this.recensione).subscribe((recensione: Recensione) => this.recensioneCompletata(),
        error => (console.log('Username già presa')));
  }


  async recensioneCompletata() {

    const alert = await this.alertController.create({
      header: this.registrationTitle,
      message: this.registrationMessage,
      buttons: [
        {
          text: this.confirmButton,
          handler: () => {
            console.log('Recensione salvata: ' + this.recensione.descrizione);
            this.prenotazioneService.prenotazioneValutata(this.utente.id, this.idRistorante, this.prenotazioneTimestamp).subscribe();
            this.navController.back();
          }
        }
      ]
    });
    await alert.present();
  }

  initTranslate() {
    this.translateService.get('RECENSIONE_SUCCESSO_TITLE').subscribe((data: string) => {
      this.registrationTitle = data;
    });
    this.translateService.get('RECENSIONE_SUCCESSO_MESSAGE').subscribe((data: string) => {
      this.registrationMessage = data;
    });
    this.translateService.get('CONFIRM_BUTTON').subscribe((data: string) => {
      this.confirmButton = data;
    });
  }
}
