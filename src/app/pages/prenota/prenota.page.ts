import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Ristorante} from '../../model/ristorante.model';
import {RistoranteService} from '../../services/ristorante.service';
import {Recensione} from '../../model/recensione.model';
import {Prenotazione} from '../../model/prenotazione.model';
import {PrenotazioneService} from '../../services/prenotazione.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-prenota',
  templateUrl: './prenota.page.html',
  styleUrls: ['./prenota.page.scss'],
})
export class PrenotaPage implements OnInit {

  private ristorante: Ristorante;
  private idRistorante: number;
  private utente: Utente;
  private selectedDate: Date;
  private currentDate: Date;
  private prenotazione: Prenotazione = new Prenotazione();
  private bookFormModule: FormGroup;
  private prenotazioneTitle: string;
  private prenotazioneMessage: string;
  private confirmButton: string;
  private giorni = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
  private numbers: number[] = [];
  private orari: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private navController: NavController,
              private utenteService: UtenteService,
              private route: ActivatedRoute,
              private ristoranteService: RistoranteService,
              private prenotazioneService: PrenotazioneService,
              private alertController: AlertController,
              private translateService: TranslateService) { }

  ngOnInit() {
    this.initTranslate();
    this.currentDate = new Date();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idRistorante = parseInt(params.get('id'), 0);
      this.dettagliRistorante();
    });
    this.utenteService.getUtente().subscribe( (utente) => {
      this.utente = utente;
    });
    this.bookFormModule = this.formBuilder.group({
      posti: ['', Validators.compose([Validators.required])],
      data: ['', Validators.compose([Validators.required])],
      orario: ['', Validators.compose([Validators.required])],
      nome: [this.utente.nome + ' ' + this.utente.cognome, Validators.compose([Validators.required])],
      punti: ['No', Validators.compose([Validators.required])]
    });
  }

  dettagliRistorante() {
    this.ristoranteService.getRistoranteById(this.idRistorante).subscribe( (ristorante) => {
      this.ristorante = ristorante;
      this.generatePosti();
    });
  }

  generatePosti() {
    for (let i = 1; i < this.ristorante.postiTot; i++) {
      this.numbers[i] = i;
    }
  }

  aggiornaGiorno() {
    let giorno: string;
    this.selectedDate = new Date(this.bookFormModule.value.data);
    const selectedGiorno = this.selectedDate.getDay();
    for (let i = 0; i < 7; i++) {
      if (i + 1 === selectedGiorno) {
        giorno = this.giorni[i];
      }
    }
    this.generateOrari(giorno);
  }

  generateOrari(giorno: string) {
    let i = 0;
    for (const orario of this.ristorante.orari) {
      if (orario.giorno === giorno) {
        const dateApertura = new Date();
        dateApertura.setHours(+orario.apertura.substring(0, 2));
        dateApertura.setMinutes(+orario.apertura.substring(3, 5));
        const dateChiusura = new Date();
        dateChiusura.setHours(+orario.chiusura.substring(0, 2));
        dateChiusura.setMinutes(+orario.chiusura.substring(3, 5));
        while (dateApertura < dateChiusura) {
          let ora: string;
          if (dateApertura.getMinutes() === 0) {
            ora = dateApertura.getHours() + ':' + dateApertura.getMinutes() + '0';
          } else {
            ora = dateApertura.getHours() + ':' + dateApertura.getMinutes();
          }
          dateApertura.setMinutes(dateApertura.getMinutes() + 30);
          this.orari[i] = ora;
          i++;
        }
      }
    }
    this.orari.sort();
  }

  onBookSubmit() {
    this.prenotazione.posti = this.bookFormModule.value.posti;
    const temp = new Date(this.bookFormModule.value.data);
    this.prenotazione.giorno = temp.getTime();
    this.prenotazione.orario = this.bookFormModule.value.orario;
    this.prenotazione.scontoApplicato = this.ristorante.sconto;
    this.prenotazione.nome = this.bookFormModule.value.nome;
    if (this.bookFormModule.value.punti === 'Si') {
      this.prenotazione.usaPunti = true;
    } else {
      this.prenotazione.usaPunti = false;
    }
    this.prenotazione.ristorante = new Ristorante();
    this.prenotazione.ristorante.id = this.idRistorante;
    this.prenotazione.utente = new Utente();
    this.prenotazione.utente.nome = this.utente.nome;
    this.prenotazione.utente.id = this.utente.id;
    this.prenotazioneService.createPrenotazione(this.prenotazione).subscribe((recensione: Prenotazione) =>
        this.prenotazioneCompletata,
        error => (console.log('Username già presa')));
    // set user param to update punti
    this.prenotazioneService.updatePunti(this.utente, this.prenotazione.usaPunti).subscribe((utente: Utente) =>
        error => (console.log('Username già presa')));
  }


  async prenotazioneCompletata() {

    const alert = await this.alertController.create({
      header: this.prenotazioneTitle,
      message: this.prenotazioneMessage,
      buttons: [
        {
          text: this.confirmButton,
          handler: () => {
            console.log('Prenotazione salvata: ' + this.prenotazione.nome);
            this.navController.back();
          }
        }
      ]
    });
    await alert.present();
  }

  initTranslate() {
    this.translateService.get('PRENOTAZIONE_SUCCESSO_TITLE').subscribe((data: string) => {
      this.prenotazioneTitle = data;
    });
    this.translateService.get('PRENOTAZIONE_SUCCESSO_MESSAGE').subscribe((data: string) => {
      this.prenotazioneMessage = data;
    });
    this.translateService.get('CONFIRM_BUTTON').subscribe((data: string) => {
      this.confirmButton = data;
    });
  }

  async infoUsaPunti() {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'Accettando di usare i propri punti per la prenotazione verranno sottratti 1000 punti al saldo ' +
                'e verrà applicato uno sconto di 10 € direttamente in cassa.',
      buttons: [
        {
          text: this.confirmButton,
        }
      ]
    });
    await alert.present();
  }
}
