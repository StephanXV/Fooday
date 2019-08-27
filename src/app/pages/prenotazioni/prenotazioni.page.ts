import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.page.html',
  styleUrls: ['./prenotazioni.page.scss'],
})
export class PrenotazioniPage implements OnInit {

  reservations = ['Shabu Shabu', 'Lu Barrott', 'Lu Barrott', 'Da Maurizio'];

  constructor() { }

  ngOnInit() {
  }

}
