import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Citta} from '../../model/citta.model';
import {CittaService} from '../../services/citta.service';
import {Ricerca} from '../../model/ricerca.model';
import {RicercaService} from '../../services/ricerca.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.page.html',
  styleUrls: ['./ricerca.page.scss'],
})
export class RicercaPage implements OnInit {

  private ricerche$: Observable<Ricerca[]>;
  private requestType: number;
  private idUtente = 1;
  nomeRisto: string;
  nomeCitta: string;

  constructor(private router: Router, private ricercaService: RicercaService) { }

  ngOnInit() {
    this.ricerche$ = this.ricercaService.getRicercheByUtente(1);
    this.nomeCitta = '';
    this.nomeRisto = '';
  }

  onNomeSubmit() {
    this.requestType = 3;
    console.log('Nome input: ' + this.nomeRisto);
    this.router.navigate(['/tabs/ricerca/lista-ristoranti', this.requestType, this.nomeRisto]);
  }

  onCitySubmit() {
    this.requestType = 2;
    console.log('Citta input: ' + this.nomeCitta);
    this.router.navigate(['/tabs/ricerca/lista-ristoranti', this.requestType, this.nomeCitta]);
  }

  onRicercaClick(tipoRichiesta: number, input: string) {
    this.router.navigate(['/tabs/ricerca/lista-ristoranti', tipoRichiesta, input]);
  }
}

