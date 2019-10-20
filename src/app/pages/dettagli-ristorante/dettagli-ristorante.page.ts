import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RistoranteService} from '../../services/ristorante.service';
import {Observable} from 'rxjs';
import {Ristorante} from '../../model/ristorante.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Recensione} from '../../model/recensione.model';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {MappaRistorantiPage} from '../mappa-ristoranti/mappa-ristoranti.page';

declare var f;
declare var myFunction;


@Component({
  selector: 'app-dettagli-ristorante',
  templateUrl: './dettagli-ristorante.page.html',
  styleUrls: ['./dettagli-ristorante.page.scss'],
})
export class DettagliRistorantePage implements OnInit {
  view: string;
  private utente: Utente = new Utente();
  private isFavourite: boolean;
  private isLoggedIn: boolean;
  private ristorante$: Observable<Ristorante>;
  private recensioni$: Observable<Recensione[]>;
  private idRistorante: number;
  private mediaCucina = 0;
  private mediaServizio = 0;
  private mediaPrezzo = 0;
  private punteggio = 0;
  private giorni = ['lunedi', 'martedi', 'mercoledi', 'giovedi',
    'venerdi', 'sabato', 'domenica'];
  private colorFab = null;

  constructor(private ristoranteService: RistoranteService,
              private route: ActivatedRoute,
              private utenteService: UtenteService) {
  }

  ngOnInit() {
    this.view = 'info';
  }

  ionViewWillEnter() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idRistorante = parseInt(params.get('id'), 0);
      this.dettagliRistorante();
    });
    this.utenteService.isLogged().subscribe( (isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.utenteService.getUtente().subscribe( (utente) => {
          this.utente = utente;
          this.controllaPreferito(this.idRistorante);
          this.isLoggedIn = isLoggedIn;
        });
      } else {
        this.isLoggedIn = isLoggedIn;
      }
    });
  }

  dettagliRistorante() {
    this.ristorante$ = this.ristoranteService.getRistoranteById(this.idRistorante);
    this.ristoranteService.getRistoranteById(this.idRistorante).subscribe( (ristorante) => {
      this.calcolaMedie(ristorante.recensioni);
    });

  }

  calcolaMedie(recensioni: Recensione[]) {
    this.mediaCucina = 0;
    this.mediaServizio = 0;
    this.mediaPrezzo = 0;
    for (const recensione of recensioni) {
      this.mediaCucina += recensione.votoCucina;
      this.mediaServizio += recensione.votoServizio;
      this.mediaPrezzo += recensione.votoPrezzo;
    }
    this.mediaCucina /= recensioni.length;
    this.mediaServizio /= recensioni.length;
    this.mediaPrezzo /= recensioni.length;
    this.mediaCucina = Math.floor(this.mediaCucina * 10) / 10;
    this.mediaServizio = Math.floor(this.mediaServizio * 10) / 10;
    this.mediaPrezzo = Math.floor(this.mediaPrezzo * 10) / 10;
    this.punteggio = Math.floor(((this.mediaCucina + this.mediaServizio + this.mediaPrezzo) / 3) * 10) / 10;
  }

  callF() {
    f();
  }

  rimAggPreferito(ristorante) {
    myFunction();
    if (this.isFavourite) {
      this.ristoranteService.deletePreferito(ristorante.id, this.utente.id).subscribe(() => {
        console.log('preferito rimosso');
      });
    } else {
      this.aggiungiPreferito(ristorante);
    }
  }

  aggiungiPreferito(ristorante) {
    this.ristoranteService.addPreferito(this.idRistorante, this.utente.id).subscribe( () => {
      console.log('preferito aggiunto');
    });
  }

  controllaPreferito(idRistorante) {
    this.utenteService.containsPreferito(this.utente.id, idRistorante).subscribe( (isFavourite) => {
      this.isFavourite = isFavourite;
      if (this.isFavourite) {
        this.colorFab = 'primary';
      } else {
        this.colorFab = 'light';
      }
      console.log('Il ristorante ' + idRistorante + ' è nella lista preferiti dell\'utente ' + this.utente.id + ': ' + isFavourite);
    });
  }
}
