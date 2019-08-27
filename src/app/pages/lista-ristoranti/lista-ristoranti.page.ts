import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-ristoranti',
  templateUrl: './lista-ristoranti.page.html',
  styleUrls: ['./lista-ristoranti.page.scss'],
})
export class ListaRistorantiPage implements OnInit {

  restaurants = ['Da Maurizio', 'Shabu Shabu', 'Farina & Co', 'Peste & Corna', 'Sole e Luna', 'Lu Barrott'];

  constructor() { }

  ngOnInit() {
  }

}
