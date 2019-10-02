import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Ristorante} from '../../model/ristorante.model';
import {RistoranteService} from '../../services/ristorante.service';
import {Orario} from '../../model/orario.model';
import {DISABLED} from '@angular/forms/src/model';

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
  private bookFormModule: FormGroup;
  private giorni = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica']
  private numbers: number[] = [1, 2, 3, 4, 5];
  private orari: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private navController: NavController,
              private utenteService: UtenteService,
              private route: ActivatedRoute,
              private ristoranteService: RistoranteService) { }

  ngOnInit() {
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
      nome: ['', Validators.compose([Validators.required])],
      punti: ['', Validators.compose([Validators.required])]
    });
  }

  dettagliRistorante() {
    this.ristoranteService.getRistoranteById(this.idRistorante).subscribe( (ristorante) => {
      this.ristorante = ristorante;
    });
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
    console.log('Prenotazione confermata');
    this.navController.navigateBack('');
  }
}
