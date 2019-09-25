import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Citta} from '../../model/citta.model';
import {CittaService} from '../../services/citta.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.page.html',
  styleUrls: ['./ricerca.page.scss'],
})
export class RicercaPage implements OnInit {

  recentResearches = ['napoli', 'arrosticini', 'bistrot', 'carlo cracco', 'cannavacciuolo'];
  private requestType: number;
  nomeRisto: string;
  nomeCitta: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.nomeCitta = '';
    this.nomeRisto = '';
  }

  ngOn

  onNomeSubmit() {
    this.requestType = 3;
    console.log('Nome input: ' + this.nomeRisto);
    this.router.navigate(['/tabs/home/lista-ristoranti', this.requestType, this.nomeRisto]);
  }

  onCitySubmit() {
    this.requestType = 2;
    console.log('Citta input: ' + this.nomeCitta);
    this.router.navigate(['/tabs/home/lista-ristoranti', this.requestType, this.nomeCitta]);
  }
}
