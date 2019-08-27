import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.page.html',
  styleUrls: ['./preferiti.page.scss'],
})
export class PreferitiPage implements OnInit {

  favourites = ['Da Maurizio', 'Farina & Co', 'Peste & Corna', 'Lu Barrott'];

  constructor() { }

  ngOnInit() {
  }

}
