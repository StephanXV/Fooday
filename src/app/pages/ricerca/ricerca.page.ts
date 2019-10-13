import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Citta} from '../../model/citta.model';
import {CittaService} from '../../services/citta.service';
import {Ricerca} from '../../model/ricerca.model';
import {RicercaService} from '../../services/ricerca.service';
import {UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.page.html',
  styleUrls: ['./ricerca.page.scss'],
})
export class RicercaPage implements OnInit {

  private ricerche$: Observable<Ricerca[]>;
  private requestType: number;
  private utente: Utente;
  private nomeRisto: string;
  private nomeCitta: string;

  constructor(private router: Router,
              private ricercaService: RicercaService,
              private utenteService: UtenteService) { }

  ngOnInit() {
    this.utenteService.getUtente().subscribe( (utente) => {
      this.utente = utente;
      this.listRicerche();
    });
  }

  ionViewWillEnter() {
    this.nomeCitta = '';
    this.nomeRisto = '';
    this.listRicerche();
  }

  listRicerche() {
    if (this.utente != null) {
      this.ricerche$ = this.ricercaService.getRicercheByUtente(this.utente.id);
    }
  }

  onNomeSubmit() {
    if (this.nomeRisto !== '') {
      this.requestType = 3;
      console.log('Nome input: ' + this.nomeRisto);
      if (this.utente != null) {
        this.createRicerca(this.nomeRisto, this.requestType);
      }
      this.router.navigate(['/tabs/ricerca/lista-ristoranti', this.requestType, this.nomeRisto]);
    }
  }

  onCitySubmit() {
    if (this.nomeCitta !== '') {
      this.requestType = 2;
      console.log('Citta input: ' + this.nomeCitta);
      if (this.utente != null) {
        this.createRicerca(this.nomeCitta, this.requestType);
      }
      this.router.navigate(['/tabs/ricerca/lista-ristoranti', this.requestType, this.nomeCitta]);
    }
  }

  onRicercaClick(tipoRichiesta: number, input: string) {
    this.router.navigate(['/tabs/ricerca/lista-ristoranti', tipoRichiesta, input]);
  }

  createRicerca(nomeRicerca, requestType) {
    const ricerca: Ricerca = new Ricerca();
    ricerca.input = nomeRicerca;
    ricerca.tipoRichiesta = requestType;
    ricerca.utente = new Utente();
    ricerca.utente.id = this.utente.id;
    this.ricercaService.createRicerca(ricerca).subscribe();
  }

  deleteRicerca(ricerca) {
    this.ricercaService.deleteRicerca(ricerca).subscribe( () => {
      this.listRicerche();
    });
  }
}

